
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      
      <StatusBar style="light" />

      
      <Stack
        screenOptions={{
          
          headerStyle: { backgroundColor: "#0F0F1A" },
          headerTintColor: "#E8B86D",       
          headerTitleStyle: { fontWeight: "700", fontSize: 18 },
          contentStyle: { backgroundColor: "#0F0F1A" }, 
        }}
      >
        
        <Stack.Screen name="index" options={{ title: "📚 Minha Livraria" }} />

        <Stack.Screen name="novo" options={{ title: "Novo Livro" }} />

        <Stack.Screen name="editar/[id]" options={{ title: "Editar Livro" }} />
      </Stack>
    </>
  );
}
