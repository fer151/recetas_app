import { useState } from "react";

// Datos de las categorías. Cada una tiene nombre, imagen y, si aplica, si ocupa dos columnas.
const categorias = [
  { nombre: "Postres", imagen: "/imagenes/postres.webp" },
  { nombre: "Bebidas", imagen: "/imagenes/bebidas.webp" },
  { nombre: "Comida", imagen: "/imagenes/comida.webp" },
  { nombre: "Cena", imagen: "/imagenes/cenas.jpg" },
  { nombre: "Almuerzo", imagen: "/imagenes/almuerzo.jpg" },
  { nombre: "Snack", imagen: "/imagenes/snack.jpg" },
  { nombre: "Sorpréndeme", imagen: "/imagenes/sorprendeme.jpg", ancha: true },
];

// Quita acentos y mayúsculas para que "sorprendeme" encuentre "Sorpréndeme"
const normalizar = (texto) =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Inicio() {
  // Texto que la persona escribe en el buscador
  const [busqueda, setBusqueda] = useState("");

  // Mostramos solo las categorías que coinciden con lo escrito
  const visibles = categorias.filter((cat) =>
    normalizar(cat.nombre).includes(normalizar(busqueda.trim()))
  );

  return (
    <section>
      <h1 className="titulo-principal">COCINA FÁCIL</h1>

      <div className="barra-busqueda">
        <input
          type="text"
          placeholder="Busca tus recetas favoritas"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="boton-dorado" onClick={() => setBusqueda("")}>
          {busqueda ? "✕ Limpiar" : "🔍 Buscar"}
        </button>
      </div>

      <div className="cuadricula-categorias">
        {visibles.map((cat, i) => (
          <article
            key={cat.nombre}
            className={cat.ancha ? "tarjeta-categoria tarjeta-ancha" : "tarjeta-categoria"}
            style={{ "--i": i }}
          >
            <img src={cat.imagen} alt={cat.nombre} className="imagen-categoria" />
            <h2>{cat.nombre.toUpperCase()}</h2>
          </article>
        ))}

        {visibles.length === 0 && (
          <p className="sin-resultados">
            No encontramos "{busqueda}". Prueba con otra categoría 🍽️
          </p>
        )}
      </div>
    </section>
  );
}