import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListaLeyendas from "./pages/ListaLeyendas";
import EditarLeyenda from "./pages/EditarLeyenda";
import CrearLeyenda from "./pages/CrearLeyenda";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaLeyendas />} />
        <Route path="/crear" element={<CrearLeyenda />} />
        <Route path="/editar/:id" element={<EditarLeyenda />} />
      </Routes>
    </Router>
  );
}

export default App;
