// ============================================================
// app/editar/[id].tsx  →  Rota: "/editar/:id"
//
// Tela de edição de um livro existente.
// O "[id]" no nome do arquivo é o parâmetro dinâmico da rota —
// funciona igual ao ":id" nas rotas do Express no backend.
//
// Fluxo:
//  1. Pega o "id" da URL
//  2. Busca os dados desse livro no backend (GET /livros/:id)
//  3. Preenche o formulário com os dados encontrados
//  4. Ao salvar, envia PUT /livros/:id com os novos dados
// ============================================================

import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getLivros, atualizarLivro, Livro, LivroInput } from "../../services/api";
import FormLivro from "../../components/FormLivro";

export default function TelaEditar() {
  const router = useRouter();

  // useLocalSearchParams() lê os parâmetros da URL atual
  // Como o arquivo se chama [id].tsx, o parâmetro será "id"
  const { id } = useLocalSearchParams<{ id: string }>();

  const [livro, setLivro] = useState<Livro | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Busca os dados do livro ao abrir a tela
  useEffect(() => {
    async function carregarLivro() {
      try {
        // Buscamos todos e filtramos pelo id
        // (uma alternativa seria ter GET /livros/:id no nosso service)
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
  }, [id]); // roda quando "id" mudar (na prática, só ao abrir a tela)

  async function handleSalvar(dados: LivroInput) {
    try {
      await atualizarLivro(id!, dados); // chama PUT /livros/:id
      Alert.alert("✅ Sucesso", "Livro atualizado com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar o livro.");
    }
  }

  // ── Loading enquanto busca os dados ─────────────────────
  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#E8B86D" />
        <Text style={styles.texto}>Carregando dados...</Text>
      </View>
    );
  }

  // ── Erro ao carregar ─────────────────────────────────────
  if (erro || !livro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>{erro ?? "Livro não encontrado."}</Text>
      </View>
    );
  }

  // ── Formulário preenchido com os dados do livro ──────────
  return (
    <FormLivro
      // "valoresIniciais" preenche o formulário com os dados atuais do livro
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
