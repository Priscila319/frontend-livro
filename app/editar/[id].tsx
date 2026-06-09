
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getLivros, atualizarLivro, Livro, LivroInput } from "../../services/api";
import FormLivro from "../../components/FormLivro";

export default function TelaEditar() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const [livro, setLivro] = useState<Livro | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarLivro() {
      try {
        const todos = await getLivros();
        const encontrado = todos.find((l) => l.id === id);

        if (!encontrado) {
          setErro("Livro não encontrado.");
        } else {
          setLivro(encontrado);
        }
      } catch {
        setErro("Erro ao carregar os dados do livro.");
      } finally {
        setCarregando(false);
      }
    }

    carregarLivro();
  }, [id]); 

  async function handleSalvar(dados: LivroInput) {
    try {
      await atualizarLivro(id!, dados); 
      Alert.alert("✅ Sucesso", "Livro atualizado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar o livro.");
    }
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#E8B86D" />
        <Text style={styles.texto}>Carregando dados...</Text>
      </View>
    );
  }

  if (erro || !livro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>{erro ?? "Livro não encontrado."}</Text>
      </View>
    );
  }

  return (
    <FormLivro
      valoresIniciais={{
        titulo: livro.titulo,
        autor: livro.autor,
        ano: livro.ano,
        genero: livro.genero,
      }}
      textoBotao="Salvar alterações"
      onSalvar={handleSalvar}
    />
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    backgroundColor: "#0F0F1A",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
  },
  texto: {
    color: "#A89880",
    fontSize: 15,
  },
  erro: {
    color: "#FF6B6B",
    fontSize: 15,
    textAlign: "center",
  },
});
