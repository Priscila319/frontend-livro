
const BASE_URL = "https://backend-postgres-98ve.onrender.com"; 

export type Livro = {
  id: string;
  titulo: string;
  autor: string;
  ano: number;
  genero: string;
  criadoEm?: string;
  atualizadoEm?: string;
};

export type LivroInput = Omit<Livro, "id" | "criadoEm" | "atualizadoEm">;


export async function getLivros(): Promise<Livro[]> {
  const resposta = await fetch(`${BASE_URL}/livros`);
  if (!resposta.ok) throw new Error("Erro ao buscar livros");
  return resposta.json();
}

export async function criarLivro(dados: LivroInput): Promise<Livro> {
  const resposta = await fetch(`${BASE_URL}/livros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify(dados),                       
  });
  if (!resposta.ok) throw new Error("Erro ao criar livro");
  return resposta.json();
}

export async function atualizarLivro(id: string, dados: LivroInput): Promise<Livro> {
  const resposta = await fetch(`${BASE_URL}/livros/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) throw new Error("Erro ao atualizar livro");
  return resposta.json();
}

export async function deletarLivro(id: string): Promise<void> {
  const resposta = await fetch(`${BASE_URL}/livros/${id}`, {
    method: "DELETE",
  });
  if (!resposta.ok) throw new Error("Erro ao deletar livro");
}
