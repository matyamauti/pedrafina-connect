"use client";

import type { FormEvent } from "react";
import { useState } from "react";

const whatsappNumber = "551334736477";

const professionLabels: Record<string, string> = {
  arquitetura: "Arquitetura",
  "design-interiores": "Design de interiores",
  engenharia: "Engenharia",
  corretagem: "Corretagem de imóveis",
  outra: "Outra área",
};

const inputClass =
  "mt-2 block min-h-12 w-full rounded-none border border-pf-graphite/20 bg-transparent px-4 py-3 font-sans text-base text-pf-graphite outline-none transition-colors placeholder:text-pf-graphite/40 focus:border-pf-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pf-gold-ink";
const labelClass = "block font-sans text-sm font-medium text-pf-graphite";

export function ProfessionalRegistrationForm() {
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const openWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const value = (name: string) => String(formData.get(name) ?? "").trim();
    const profession = value("profissao");
    const optionalValue = (name: string) => value(name) || "Não informado";

    const message = [
      "*Cadastro pelo site da Pedra Fina Connect*",
      "",
      "Olá! Fiz meu cadastro profissional pelo site da Pedra Fina Connect. Seguem meus dados:",
      "",
      `*Nome completo:* ${value("nome")}`,
      `*Área de atuação:* ${professionLabels[profession] ?? profession}`,
      `*E-mail profissional:* ${value("email")}`,
      `*WhatsApp:* ${value("telefone")}`,
      `*Escritório ou empresa:* ${optionalValue("escritorio")}`,
      `*Cidade e estado:* ${optionalValue("cidade")}`,
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={openWhatsApp} className="mt-12 border-t border-pf-gold-ink/35 pt-9" aria-describedby="cadastro-instrucoes">
      <p id="cadastro-instrucoes" className="mb-7 font-sans text-sm text-pf-graphite/65">
        Campos marcados com * são obrigatórios.
      </p>
      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <label className={labelClass} htmlFor="cadastro-nome">
          Nome completo <span className="text-pf-gold-ink">*</span>
          <input id="cadastro-nome" name="nome" type="text" autoComplete="name" placeholder="Seu nome" required minLength={2} maxLength={120} className={inputClass} />
        </label>
        <label className={labelClass} htmlFor="cadastro-profissao">
          Área de atuação <span className="text-pf-gold-ink">*</span>
          <select id="cadastro-profissao" name="profissao" defaultValue="" required className={inputClass}>
            <option value="" disabled>Selecione sua área</option>
            <option value="arquitetura">Arquitetura</option>
            <option value="design-interiores">Design de interiores</option>
            <option value="engenharia">Engenharia</option>
            <option value="corretagem">Corretagem de imóveis</option>
            <option value="outra">Outra área</option>
          </select>
        </label>
        <label className={labelClass} htmlFor="cadastro-email">
          E-mail profissional <span className="text-pf-gold-ink">*</span>
          <input id="cadastro-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="nome@escritorio.com.br" required maxLength={254} className={inputClass} />
        </label>
        <label className={labelClass} htmlFor="cadastro-telefone">
          WhatsApp <span className="text-pf-gold-ink">*</span>
          <input id="cadastro-telefone" name="telefone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" required minLength={10} maxLength={20} className={inputClass} />
        </label>
        <label className={labelClass} htmlFor="cadastro-escritorio">
          Escritório ou empresa <span className="font-normal text-pf-graphite/55">(opcional)</span>
          <input id="cadastro-escritorio" name="escritorio" type="text" autoComplete="organization" placeholder="Nome do escritório" maxLength={120} className={inputClass} />
        </label>
        <label className={labelClass} htmlFor="cadastro-cidade">
          Cidade e estado <span className="font-normal text-pf-graphite/55">(opcional)</span>
          <input id="cadastro-cidade" name="cidade" type="text" autoComplete="address-level2" placeholder="São Paulo, SP" maxLength={120} className={inputClass} />
        </label>
      </div>

      <div className="mt-10 border-t border-pf-gold-ink/35 pt-7">
        <p className="max-w-[55ch] font-sans text-sm leading-relaxed text-pf-graphite/65">
          Ao continuar, o WhatsApp abrirá com seus dados preenchidos. Revise a mensagem e confirme o envio por lá.
        </p>
        <button type="submit" className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 border border-pf-graphite bg-pf-graphite px-8 py-3 font-sans text-xs font-bold uppercase tracking-[0.12em] text-pf-cream transition-colors duration-200 ease-pf hover:border-pf-gold-ink hover:bg-pf-gold-ink">
          Continuar no WhatsApp <span aria-hidden="true">↗</span>
        </button>
        {whatsappUrl && (
          <p role="status" className="mt-5 max-w-[55ch] font-sans text-sm leading-relaxed text-pf-graphite/70">
            Mensagem preparada. Se o WhatsApp não abriu, {" "}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-pf-gold-ink underline underline-offset-4">
              abra a conversa por aqui
            </a>
            . O cadastro é concluído quando você enviar a mensagem.
          </p>
        )}
      </div>
    </form>
  );
}
