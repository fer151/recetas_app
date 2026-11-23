export default function Inicio() {
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

  return (
    <section>
      <h1 className="titulo-principal">COCINA FÁCIL</h1>

      <div className="barra-busqueda">
        <input type="text" placeholder="Busca tus recetas favoritas" />
        <button className="boton-dorado">🔍 Buscar</button>
      </div>

      <div className="cuadricula-categorias">
        {categorias.map((cat) => (
          <article
            key={cat.nombre}
            className={cat.ancha ? "tarjeta-categoria tarjeta-ancha" : "tarjeta-categoria"}
          >
            <img src={cat.imagen} alt={cat.nombre} className="imagen-categoria" />
            <h2>{cat.nombre.toUpperCase()}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}