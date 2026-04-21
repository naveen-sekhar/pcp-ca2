import { AppProvider } from "./context/AppContext";
import AppRouter from "./router/AppRouter";
import "./App.css";

const App = () => (
  <AppProvider>
    <AppRouter />
  </AppProvider>
);

export default App;
