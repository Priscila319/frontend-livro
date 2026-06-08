
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { getLivros, Livro } from "../services/api";
import LivroCard from "../components/LivroCard";

export default function TelaInicial() {
  const router = useRouter();

  
  const [livros, setLivros] = useState<Livro[]>([]);

  
  const [carregando, setCarregando] = useState(true);

  
  const [erro, setErro] = useState<string | null>(null);

  
  async function carregarLivros() {
    try {
      setErro(null);
      setCarregando(true);
      const dados = await getLivros(); 
      setLivros(dados);
    } catch (e) {
      setErro("Não foi possível conectar ao servidor.\nVerifique se o backend está rodando.");
    } finally {
      setCarregando(false); 
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarLivros();
    }, [])
  );

  
  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#E8B86D" />
        <Text style={styles.textoSecundario}>Carregando livros...</Text>
      </View>
    );
  }

  
  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.emoji}>⚠️</Text>
        <Text style={styles.textoErro}>{erro}</Text>
        <TouchableOpacity style={styles.btnTentar} onPress={carregarLivros}>
          <Text style={styles.btnTentarText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      {/* FlatList é o componente ideal para listas longas no React Native.
          Ele renderiza apenas os itens visíveis na tela (lazy rendering),
          o que é muito mais eficiente que um ScrollView com map(). */}
      <FlatList
        data={livros}
        keyExtractor={(item) => item.id} // chave única de cada item
        renderItem={({ item }) => (
          <LivroCard
            livro={item}
            onDeletado={carregarLivros} // recarrega a lista após deletar
          />
        )}
        contentContainerStyle={styles.lista}
        // Pull to refresh: puxar a lista para baixo recarrega
        refreshControl={
          <RefreshControl
            refreshing={carregando}
            onRefresh={carregarLivros}
            tintColor="#E8B86D"
          />
        }
        // Mensagem quando não há livros cadastrados
        ListEmptyComponent={
          <View style={styles.centro}>
            <Text style={styles.emoji}>📭</Text>
            <Text style={styles.textoVazio}>Nenhum livro cadastrado ainda.</Text>
            <Text style={styles.textoSecundario}>Toque em "+" para adicionar!</Text>
          </View>
        }
        // Cabeçalho da lista com contador
        ListHeaderComponent={
          livros.length > 0 ? (
            <Text style={styles.contador}>
              {livros.length} livro{livros.length !== 1 ? "s" : ""} na estante
            </Text>
          ) : null
        }
      />

      {/* Botão flutuante para adicionar novo livro */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/novo")} // navega para a tela de cadastro
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F1A",
  },
  lista: {
    padding: 16,
    paddingBottom: 100, // espaço para o botão flutuante não cobrir o último item
  },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 12,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  textoVazio: {
    color: "#F0EAD6",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  textoSecundario: {
    color: "#6B6B8A",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
  textoErro: {
    color: "#FF6B6B",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  btnTentar: {
    marginTop: 8,
    backgroundColor: "#E8B86D",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnTentarText: {
    color: "#0F0F1A",
    fontWeight: "700",
    fontSize: 15,
  },
  contador: {
    color: "#6B6B8A",
    fontSize: 13,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  // FAB = Floating Action Button (botão "+" flutuante)
  fab: {
    position: "absolute",
    bottom: 32,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E8B86D",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E8B86D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  fabText: {
    color: "#0F0F1A",
    fontSize: 32,
    fontWeight: "300",
    lineHeight: 36,
  },
});
