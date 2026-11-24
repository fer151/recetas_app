import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Ingredientes from "./pages/Ingredientes";

// Pantallas que se construyen en los siguientes pasos
function Pendiente({ titulo }) {
  return (
    <section>
      <h1 className="titulo-vista">{titulo}</h1>
      <p className="subtitulo">Esta pantalla se construye en el siguiente paso.</p>
    </section>
  );
}

// Opciones del menú lateral. Cada una tiene una ruta, un texto y un ícono.
const menu = [
  { ruta: "/", texto: "INICIO", imagen: "/imagenes/inicio.jpg" },
  { ruta: "/ingredientes", texto: "MIS INGREDIENTES", imagen: "/imagenes/ingredientes.jpg" },
  { ruta: "/top", texto: "MIS TOP RECETAS", emoji: "⭐" },
  { ruta: "/compras", texto: "LISTA DE COMPRAS", emoji: "🛒" },
];

export default function App() {
  // Controla si la barra lateral está contraída o expandida
  const [cerrada, setCerrada] = useState(false);

  return (
    <BrowserRouter>
      <div className="aplicacion">
        <aside className={cerrada ? "barra-lateral cerrada" : "barra-lateral"}>
          <button
            className="boton-hamburguesa"
            onClick={() => setCerrada(!cerrada)}
            aria-label="Abrir o cerrar menú"
          >
            ☰
          </button>

          <nav className="menu-vertical">
            {menu.map((opcion) => (
              <NavLink
                key={opcion.ruta}
                to={opcion.ruta}
                end={opcion.ruta === "/"}
                className={({ isActive }) =>
                  isActive ? "opcion-menu activo" : "opcion-menu"
                }
              >
                <span className="icono-menu">
                  {opcion.imagen ? (
                    <img
                      src={opcion.imagen}
                      alt={opcion.texto}
                      style={{ width: "24px", height: "24px", objectFit: "contain" }}
                    />
                  ) : (
                    opcion.emoji
                  )}
                </span>
                <span className="texto-menu">{opcion.texto}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="contenido">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/ingredientes" element={<Ingredientes />} />
            <Route path="/top" element={<Pendiente titulo="Mis top recetas" />} />
            <Route path="/compras" element={<Pendiente titulo="Lista de compras" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}