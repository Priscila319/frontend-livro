
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LivroInput } from "../services/api";

type Props = {
  
  valoresIniciais?: Partial<LivroInput>;

  onSalvar: (dados: LivroInput) => Promise<void>;

  textoBotao: string;
};

export default function FormLivro({ valoresIniciais, onSalvar, textoBotao }: Props) {
  
  const [titulo, setTitulo] = useState(valoresIniciais?.titulo ?? "");
  const [autor, setAutor] = useState(valoresIniciais?.autor ?? "");
  const [ano, setAno] = useState(valoresIniciais?.ano?.toString() ?? "");
  const [genero, setGenero] = useState(valoresIniciais?.genero ?? "");

  const [salvando, setSalvando] = useState(false);

  const [erroValidacao, setErroValidacao] = useState<string | null>(null);

  async function handleSalvar() {
    
    if (!titulo.trim() || !autor.trim()) {
      setErroValidacao("Título e autor são obrigatórios.");
      return;
    }

    setErroValidacao(null);
    setSalvando(true);

    try {
      await onSalvar({
        titulo: titulo.trim(),
        autor: autor.trim(),
        ano: ano ? parseInt(ano, 10) : 0,
        genero: genero.trim(),
      });
    } finally {
      setSalvando(false);
    }
  }

  return (
    
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Campo: Título */}
        <View style={styles.campo}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ex: Dom Casmurro"
            placeholderTextColor="#4A4A6A"
            autoCapitalize="words"
          />
        </View>

        {/* Campo: Autor */}
        <View style={styles.campo}>
          <Text style={styles.label}>Autor *</Text>
          <TextInput
            style={styles.input}
            value={autor}
            onChangeText={setAutor}
            placeholder="Ex: Machado de Assis"
            placeholderTextColor="#4A4A6A"
            autoCapitalize="words"
          />
        </View>

        {/* Campo: Ano */}
        <View style={styles.campo}>
          <Text style={styles.label}>Ano de publicação</Text>
          <TextInput
            style={styles.input}
            value={ano}
            onChangeText={setAno}
            placeholder="Ex: 1899"
            placeholderTextColor="#4A4A6A"
            keyboardType="numeric" // mostra teclado numérico no celular
            maxLength={4}
          />
        </View>

        {/* Campo: Gênero */}
        <View style={styles.campo}>
          <Text style={styles.label}>Gênero</Text>
          <TextInput
            style={styles.input}
            value={genero}
            onChangeText={setGenero}
            placeholder="Ex: Romance, Fantasia, Técnico..."
            placeholderTextColor="#4A4A6A"
            autoCapitalize="words"
          />
        </View>

        {/* Mensagem de erro de validação */}
        {erroValidacao && (
          <View style={styles.erroBox}>
            <Text style={styles.erroTexto}>⚠️ {erroValidacao}</Text>
          </View>
        )}

        {/* Botão de salvar — mostra spinner enquanto salva */}
        <TouchableOpacity
          style={[styles.botaoSalvar, salvando && styles.botaoDesabilitado]}
          onPress={handleSalvar}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#0F0F1A" />
          ) : (
            <Text style={styles.botaoTexto}>{textoBotao}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F1A",
  },
  content: {
    padding: 20,
    gap: 8,
  },
  campo: {
    marginBottom: 16,
  },
  label: {
    color: "#A89880",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#1C1C2E",
    color: "#F0EAD6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#2E2E45",
  },
  erroBox: {
    backgroundColor: "#3D1F1F",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#FF6B6B40",
    marginBottom: 8,
  },
  erroTexto: {
    color: "#FF6B6B",
    fontSize: 14,
  },
  botaoSalvar: {
    backgroundColor: "#E8B86D",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#E8B86D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: "#0F0F1A",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
