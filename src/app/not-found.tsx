import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Image
        {...{
          src: "/website-maintenance.gif",
          width: 500,
          height: 500,
          alt: "404-Error",
          priority: true,
        }}
      />

      <div className="w-3/4 flex flex-col gap-4">
        <p className="text-4xl text-white underline"> Página Não Encontrada </p>
        <p className="text-zinc-500">
          Desculpe por isso! A página que vocé procura não existe.
        </p>
        <Link
          className="bg-purple-800 py-2 rounded hover:opacity-80 duration-300"
          href="/"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
