import {google} from "googleapis";
import { NextApiResponse } from "next";

export async function POST(request: Request, res: NextApiResponse) {
    if (request.method !== "POST") {
        return Response.json({message:"Apenas POST"})
    }

    const body = await request.json();

    try {
        const auth = new google.auth.GoogleAuth({
            credentials:{
                client_email: process.env.GOOGLE_SHEETS_EMAIL,
                private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
            },
            scopes: [
                "https://www.googleapis.com/auth/drive",
                "https://www.googleapis.com/auth/drive.file",
                "https://www.googleapis.com/auth/spreadsheets",
            ],
        });

        const sheets = google.sheets({
            auth,
            version: "v4",
        });

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEETS_ID,
            range: "A1:D1",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                range: "A1:D1",
                values: [[body.nome, body.email, body.telefone, body.mensagem]],
            },
        });

        return Response.json({message: "Enviado"})

    } catch(e) {
        console.error(e);
        return Response.error();
    }
}