const prevNextBtns = document.querySelectorAll(".btn-prev, .btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const edificios = document.getElementById("edificios");
const e390 = document.getElementById("E390");
const bcc = document.getElementById("BCC");
const build390 = document.getElementById("build-e390");
const buildbcc = document.getElementById("build-bcc");
const mesa1 = document.getElementById("mesa1");
const mesa2 = document.getElementById("mesa2");
const mesas = document.getElementById("mesas");
const sala1 = document.getElementById("sala1");
const sala2 = document.getElementById("sala2");
const salaRE = document.getElementById("salare");
const salaM = document.getElementById("salam");

let edificioElegido;
let salaElegida = "";
let diaElegido = "";
let horaElegida = "";
let currentStep = 0;

prevNextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentStep += btn.classList.contains("btn-next") ? 1 : -1;
    console.log(currentStep);
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });
  if (currentStep == 1) {
    edificios.classList.add("form-step-active");
  }
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < currentStep + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

/* ELECCION EDIFICIO */

e390.addEventListener("click", () => {
  edificioElegido = "Espacio 390";
  build390.classList.add("form-step-active");
});

bcc.addEventListener("click", () => {
  edificioElegido = "Biblioteca Campus Central";
  buildbcc.classList.add("form-step-active");
});

/* ELECCION SALA */

mesa1.addEventListener("click", () => {
  salaElegida = "Mesa 1";
  calendarM1.classList.add("form-step-active");
});

mesa2.addEventListener("click", () => {
  salaElegida = "Mesa 2";
  calendarM2.classList.add("form-step-active");
});

mesas.addEventListener("click", () => {
  salaElegida = "Mesa 1 y 2";
  calendarMM.classList.add("form-step-active");
});

sala1.addEventListener("click", () => {
  salaElegida = "Sala 1";
  calendarS1.classList.add("form-step-active");
});

sala2.addEventListener("click", () => {
  salaElegida = "Sala 2";
  calendarS2.classList.add("form-step-active");
});

salaRE.addEventListener("click", () => {
  salaElegida = "Sala Reuniones/Estudio";
  calendarSRE.classList.add("form-step-active");
});

salaM.addEventListener("click", () => {
  salaElegida = "Sala Multiuso";
  calendarM.classList.add("form-step-active");
});

/* DIAS HABILES */

function obtenerDiasHabiles() {
  const diasHabiles = [];
  let contador = 0;
  let fechaActual = new Date();

  while (contador < 5) {
    if (fechaActual.getDay() !== 0 && fechaActual.getDay() !== 6) {
      diasHabiles.push(new Date(fechaActual));
      contador++;
    }
    fechaActual.setDate(fechaActual.getDate() + 1);
  }

  return diasHabiles;
}

function mostrarDiasHabiles() {
  const diasHabiles = obtenerDiasHabiles();
  const botonContainer = document.getElementById("botones-container");

  const opciones = { weekday: "long", day: "numeric" };

  diasHabiles.forEach((dia) => {
    const boton = document.createElement("button");
    boton.textContent = dia.toLocaleDateString("es-ES", opciones);
    boton.addEventListener("click", () => {
      mostrarHorasDisponibles();
    });
    botonContainer.appendChild(boton);
  });
}

function mostrarHorasDisponibles() {
  const horasContainer = document.getElementById("horas-container");
  horasContainer.innerHTML = ""; // Limpiar el contenido existente

  for (let hora = 9; hora <= 17; hora++) {
    const botonHora = document.createElement("button");
    botonHora.textContent = hora + ":00";
    horasContainer.appendChild(botonHora);
  }

  horasContainer.style.display = "block"; // Mostrar el contenedor de horas
}

// Llamar a la función para mostrar los días hábiles
mostrarDiasHabiles();
