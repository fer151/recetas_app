document.addEventListener("DOMContentLoaded", () => {
  // Menú: al hacer clic en una opción, se muestra su sección
  const botones = document.querySelectorAll(".opcion-menu");
  const vistas = document.querySelectorAll(".vista");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const destino = boton.dataset.seccion;

      botones.forEach((b) => b.classList.remove("activo"));
      boton.classList.add("activo");

      vistas.forEach((vista) => {
        vista.classList.toggle("visible", vista.id === destino);
      });
    });
  });

  // Botón hamburguesa: contrae o expande la barra lateral
  const barra = document.getElementById("barraLateral");
  const botonHamburguesa = document.getElementById("botonHamburguesa");

  botonHamburguesa.addEventListener("click", () => {
    barra.classList.toggle("cerrada");
  });
});