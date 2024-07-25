import "./App.css";
import 'leaflet/dist/leaflet.css';
import { Provider } from "react-redux";
import { store } from "./store/store";
import Menu from "./componentes/Menu";
import Contenido from "./componentes/Contenido";
import Analisis from "./componentes/Analisis";
import Alimentos from "./componentes/Alimentos";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    //NOTA: TODO lo expuesto en la GUI (este Return) debe ir DENTRO del comp. PROVIDER
    <Provider store={store}>
    <BrowserRouter>
      <Menu /> {/* Prueba Router como opcion para navegar entre sitios */}
      <Routes>
        <Route path="/" element={<Alimentos />}>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
  );
}

export default App;
