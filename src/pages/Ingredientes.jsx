import { useState, useEffect } from "react";

// Dibujo (emoji) de cada ingrediente. Si no está en la lista, se usa una lata 🥫
const EMOJIS = {
  huevo: "🥚", tomate: "🍅", queso: "🧀", leche: "🥛", pan: "🍞", arroz: "🍚",
  frijol: "🫘", pollo: "🍗", carne: "🥩", res: "🥩", cerdo: "🥓", tocino: "🥓",
  jamon: "🥓", salchicha: "🌭", pescado: "🐟", atun: "🐟", camaron: "🍤",
  papa: "🥔", cebolla: "🧅", ajo: "🧄", zanahoria: "🥕", lechuga: "🥬",
  espinaca: "🥬", brocoli: "🥦", pepino: "🥒", elote: "🌽", maiz: "🌽",
  chile: "🌶️", pimiento: "🫑", aguacate: "🥑", champinon: "🍄", hongo: "🍄",
  berenjena: "🍆", limon: "🍋", naranja: "🍊", manzana: "🍎", platano: "🍌",
  banana: "🍌", fresa: "🍓", uva: "🍇", pina: "🍍", sandia: "🍉", mango: "🥭",
  pera: "🍐", durazno: "🍑", cereza: "🍒", coco: "🥥", kiwi: "🥝",
  pasta: "🍝", espagueti: "🍝", fideo: "🍜", tortilla: "🫓", harina: "🌾",
  avena: "🌾", azucar: "🍬", sal: "🧂", pimienta: "🧂", aceite: "🫒",
  aceituna: "🫒", mantequilla: "🧈", chocolate: "🍫", galleta: "🍪",
  miel: "🍯", mermelada: "🍯", cafe: "☕", te: "🍵", jugo: "🧃", agua: "💧",
  vino: "🍷", cerveza: "🍺", nuez: "🥜", cacahuate: "🥜", almendra: "🌰",
  pizza: "🍕", hamburguesa: "🍔", taco: "🌮", helado: "🍨", pastel: "🍰",
  crema: "🥛", yogur: "🥛", yogurt: "🥛",
};

// Ingredientes que se sugieren para agregar con un solo clic
const SUGERENCIAS = ["Pan", "Arroz", "Pollo", "Cebolla", "Ajo", "Papa", "Limón", "Aguacate", "Pasta", "Mantequilla"];

const POR_ESTANTE = 5;   // cuántos ingredientes caben en cada repisa
const MIN_ESTANTES = 3;  // repisas mínimas que siempre se dibujan

const INICIALES = ["Huevo", "Tomate", "Queso", "Leche"];

// Quita acentos y mayúsculas para comparar ("Limón" = "limon")
const normalizar = (texto) =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

// Busca el emoji de un ingrediente, probando también singular ("tomates" → "tomate")
function emojiDe(nombre) {
  for (const palabra of normalizar(nombre).split(/\s+/)) {
    const candidatos = [palabra];
    if (palabra.endsWith("es")) candidatos.push(palabra.slice(0, -2));
    if (palabra.endsWith("s")) candidatos.push(palabra.slice(0, -1));
    for (const c of candidatos) {
      if (EMOJIS[c]) return EMOJIS[c];
    }
  }
  return "🥫";
}

const crear = (nombre) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  nombre,
  emoji: emojiDe(nombre),
});

// Lee la alacena guardada en el navegador (si existe)
function cargarGuardados() {
  try {
    const guardado = localStorage.getItem("alacena");
    if (guardado) return JSON.parse(guardado);
  } catch {
    // si falla, empezamos con los ingredientes de ejemplo
  }
  return INICIALES.map(crear);
}

export default function Ingredientes() {
  const [ingredientes, setIngredientes] = useState(cargarGuardados);
  const [texto, setTexto] = useState("");
  const [saliendo, setSaliendo] = useState([]);   // ids que se están quitando (animación)
  const [repetido, setRepetido] = useState(null); // id del que se intentó agregar dos veces

  // Guarda la alacena cada vez que cambia
  useEffect(() => {
    try {
      localStorage.setItem("alacena", JSON.stringify(ingredientes));
    } catch {
      // sin almacenamiento disponible: la alacena funciona igual, solo no se guarda
    }
  }, [ingredientes]);

  function agregar(nombreCrudo) {
    const limpio = nombreCrudo.trim();
    if (!limpio) return;
    const nombre = limpio.charAt(0).toUpperCase() + limpio.slice(1);

    // Si ya está en la alacena, lo "sacudimos" en lugar de duplicarlo
    const existente = ingredientes.find((i) => normalizar(i.nombre) === normalizar(nombre));
    if (existente) {
      setRepetido(existente.id);
      setTimeout(() => setRepetido(null), 600);
      return;
    }

    setIngredientes((prev) => [...prev, crear(nombre)]);
  }

  function enviar(e) {
    e.preventDefault();
    agregar(texto);
    setTexto("");
  }

  function quitar(id) {
    setSaliendo((prev) => [...prev, id]);
    // Esperamos a que termine la animación de salida antes de borrarlo
    setTimeout(() => {
      setIngredientes((prev) => prev.filter((i) => i.id !== id));
      setSaliendo((prev) => prev.filter((x) => x !== id));
    }, 350);
  }

  // Repartimos los ingredientes en repisas
  const totalEstantes = Math.max(MIN_ESTANTES, Math.ceil(ingredientes.length / POR_ESTANTE));
  const estantes = Array.from({ length: totalEstantes }, (_, n) =>
    ingredientes.slice(n * POR_ESTANTE, (n + 1) * POR_ESTANTE)
  );

  const nombresActuales = ingredientes.map((i) => normalizar(i.nombre));
  const sugeridas = SUGERENCIAS.filter((s) => !nombresActuales.includes(normalizar(s))).slice(0, 6);

  return (
    <section className="seccion-con-fondo">
      <h1 className="titulo-vista">Mis ingredientes</h1>
      <p className="subtitulo">Guarda en tu alacena lo que tienes. Toca un ingrediente para sacarlo.</p>

      <div className="caja">
        <form className="fila-formulario" onSubmit={enviar}>
          <input
            type="text"
            className="campo-texto"
            placeholder="Escribe un ingrediente (ej. huevo)"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
          <button type="submit" className="boton-dorado">Agregar</button>
        </form>

        {sugeridas.length > 0 && (
          <div className="sugerencias">
            <span className="sugerencias-titulo">Sugerencias:</span>
            {sugeridas.map((s) => (
              <button key={s} type="button" className="chip chip-boton" onClick={() => agregar(s)}>
                {emojiDe(s)} {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* LA ALACENA */}
      <div className="alacena">
        <div className="alacena-letrero">
          ALACENA · {ingredientes.length} {ingredientes.length === 1 ? "producto" : "productos"}
        </div>

        <div className="alacena-interior">
          {ingredientes.length === 0 && (
            <p className="alacena-vacia">Tu alacena está vacía. ¡Agrega tu primer ingrediente! 🍽️</p>
          )}

          {estantes.map((fila, n) => (
            <div className="estante" key={n}>
              <div className="estante-objetos">
                {fila.map((ing) => {
                  const clases = ["ingrediente-estante"];
                  if (saliendo.includes(ing.id)) clases.push("saliendo");
                  if (repetido === ing.id) clases.push("repetido");
                  return (
                    <button
                      key={ing.id}
                      type="button"
                      className={clases.join(" ")}
                      onClick={() => quitar(ing.id)}
                      title={`Quitar ${ing.nombre}`}
                    >
                      <span className="ingrediente-dibujo">{ing.emoji}</span>
                      <span className="ingrediente-nombre">{ing.nombre}</span>
                      <span className="ingrediente-quitar">✕</span>
                    </button>
                  );
                })}
              </div>
              <div className="estante-tabla" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}