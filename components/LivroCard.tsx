
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Livro, deletarLivro } from "../services/api";


type Props = {
  livro: Livro;
  onDeletado: () => void; 
};

export default function LivroCard({ livro, onDeletado }: Props) {
  const router = useRouter(); 

  
  function confirmarDelecao() {
    Alert.alert(
      "Deletar livro",
      `Tem certeza que quer remover "${livro.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            await deletarLivro(livro.id);
            onDeletado(); 
          },
        },
      ]
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={1}>{livro.titulo}</Text>
        <Text style={styles.autor}>{livro.autor}</Text>
        <View style={styles.badges}>
          {livro.genero ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{livro.genero}</Text>
            </View>
          ) : null}
          {livro.ano ? (
            <View style={[styles.badge, styles.badgeAno]}>
              <Text style={styles.badgeText}>{livro.ano}</Text>
            </View>
          ) : null}
        </View>
      </View>

      
      <View style={styles.acoes}>
        <TouchableOpacity
          style={[styles.btn, styles.btnEditar]}
          
          onPress={() => router.push(`/editar/${livro.id}`)}
        >
          <Text style={styles.btnText}>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnDeletar]}
          onPress={confirmarDelecao}
        >
          <Text style={styles.btnText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1C1C2E",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#E8B86D",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  titulo: {
    color: "#F0EAD6",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  autor: {
    color: "#A89880",
    fontSize: 13,
    marginBottom: 8,
  },
  badges: {
    flexDirection: "row",
    gap: 6,
  },
  badge: {
    backgroundColor: "#2E2E45",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E8B86D40",
  },
  badgeAno: {
    borderColor: "#7FB5A040",
  },
  badgeText: {
    color: "#E8B86D",
    fontSize: 11,
    fontWeight: "600",
  },
  acoes: {
    gap: 8,
  },
  btn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnEditar: {
    backgroundColor: "#2E2E45",
  },
  btnDeletar: {
    backgroundColor: "#3D1F1F",
  },
  btnText: {
    fontSize: 16,
  },
});
