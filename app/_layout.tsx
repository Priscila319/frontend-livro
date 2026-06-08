
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      {/* StatusBar dark = barra de status com ícones claros (bom para fundo escuro) */}
      <StatusBar style="light" />

      {/* Stack = navegação em pilha: ao ir para uma nova tela ela "empilha" por cima */}
      <Stack
        screenOptions={{
          // Estilo padrão para TODAS as telas da pilha
          headerStyle: { backgroundColor: "#0F0F1A" },
          headerTintColor: "#E8B86D",       // cor dos ícones e texto do header
          headerTitleStyle: { fontWeight: "700", fontSize: 18 },
          contentStyle: { backgroundColor: "#0F0F1A" }, // fundo de todas as telas
        }}
      >
        {/* Tela inicial — o título que aparece no header */}
        <Stack.Screen name="index" options={{ title: "📚 Minha Livraria" }} />

        {/* Tela de cadastro */}
        <Stack.Screen name="novo" options={{ title: "Novo Livro" }} />

        {/* Tela de edição — o [id] é dinâmico (igual /:id nas rotas web) */}
        <Stack.Screen name="editar/[id]" options={{ title: "Editar Livro" }} />
      </Stack>
    </>
  );
}
