"use client"

import { log } from "console";
import { FormEvent, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha"

export default function Home() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [captcha, setCaptcha] = useState<string | null>()

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      let form = {
        nome,
        email,
        telefone,
        mensagem
      };

      try {
        if(captcha) {
          const rawReponse = await fetch("http://localhost:3000/api", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });
        } else {
          alert("Invalid ReCAPTCHA!")
        }

        setNome("");
        setEmail("");
        setTelefone("");
        setMensagem("");

      } catch(error) {
        console.error("Error submiting form: ", error);
        alert("There was an error submitting the form. Please try again.");
      }
    };


  return (
    <main className="bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto py-16">
            <form className="py-4 space-y-4" onSubmit={handleSubmit}>
                <div className="flex items-center justify-center">
                    <label htmlFor="nome" className="sr-only">Nome</label>
                    <input 
                    value={nome} 
                    onChange={e => setNome(e.target.value)} 
                    type="text" 
                    name="nome" 
                    id="nome" 
                    className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md text-black" placeholder="Seu Nome" />
                </div>
                <div className="flex items-center justify-center">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md text-black" placeholder="Seu Email" />
                </div>
                <div className="flex items-center justify-center">
                    <label htmlFor="telefone" className="sr-only">Telefone</label>
                    <input 
                    value={telefone} 
                    onChange={e => setTelefone(e.target.value)} 
                    type="tel" 
                    name="telefone" 
                    id="telefone" 
                    className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md text-black" placeholder="Set Telefone" />
                </div>
                <div className="flex items-center justify-center">
                    <label htmlFor="mensagem" className="sr-only">Mensagem</label>
                    <textarea 
                    value={mensagem} 
                    onChange={e => setMensagem(e.target.value)} 
                    id="mensagem" 
                    className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-md border-gray-300 rounded-md text-black" placeholder="Sua Mensagem" />
                </div>
                <ReCAPTCHA
                  className="flex items-center justify-center"
                  sitekey = {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={setCaptcha}        
                ></ReCAPTCHA>
                <div className="flex items-center justify-center">
                    <button type="submit" className="flex items-center justify-center text-sm w-64 rounded-md shadow py-3 px-2 text-white bg-indigo-600 text-black">Enviar</button>
                </div>
            </form>
            
        </div>
      
    </main>
  )
}
