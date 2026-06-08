
import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { criarLivro, LivroInput } from "../services/api";
import FormLivro from "../components/FormLivro";

export default function TelaNovo() {
  const router = useRouter();

  // Função chamada pelo FormLivro quando o usuário aperta salvar
  async function handleSalvar(dados: LivroInput) {
    try {
      await criarLivro(dados);  // chama POST /livros com os dados do form
      Alert.alert("✅ Sucesso", "Livro cadastrado com sucesso!", [
        {
          text: "OK",
          // Ao confirmar, volta para a tela anterior (a lista)
          onPress: () => router.back(),
        },
      ]);
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível cadastrar o livro. Tente novamente.");
    }
  }

  return (
    <FormLivro
      textoBotao="Cadastrar livro"
      onSalvar={handleSalvar}
      // Sem "valoresIniciais" = campos começam vazios (modo criação)
    />
  );
}
