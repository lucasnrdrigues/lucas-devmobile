import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import StackRoutes from "./src/routes/StackRoutes";

// IP para entrar no expo go - 10.30.102.64
// Alt + Shift + F - atalho para identar o código
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </PaperProvider>
  );
}
