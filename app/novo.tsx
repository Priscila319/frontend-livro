
import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { criarLivro, LivroInput } from "../services/api";
import FormLivro from "../components/FormLivro";

export default function TelaNovo() {
  const router = useRouter();

  async function handleSalvar(dados: LivroInput) {
    try {
      await criarLivro(dados);  
      Alert.alert("✅ Sucesso", "Livro cadastrado com sucesso!", [
        {
          text: "OK",
          
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

    />
  );
}
