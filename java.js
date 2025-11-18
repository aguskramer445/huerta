import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

let firebaseConfig = {
    apiKey: "AIzaSyBDNBGGbSJU_OwBG2Hsoo8nUdO8oEV1MNY",
    authDomain: "huerta-acb96.firebaseapp.com",
    projectId: "huerta-acb96",
    storageBucket: "huerta-acb96.firebasestorage.app",
    messagingSenderId: "122591321361",
    appId: "1:122591321361:web:e3da43e5db30b45a0980b0",
    databaseURL: "https://huerta-acb96-default-rtdb.firebaseio.com/"
};

let app = initializeApp(firebaseConfig);
let db = getDatabase(app);

let tempRef = ref(db, 'datos/temperatura');
let humedadRef = ref(db, 'datos/humedadAire');
let sueloRef = ref(db, 'datos/humedadSuelo');

// DOM
let tempValue = document.getElementById("tempValue");
let humedadValue = document.getElementById("humedadValue");
let sueloValue = document.getElementById("sueloValue");

let tempBar = document.getElementById("tempBar");
let humedadBar = document.getElementById("humedadBar");
let sueloBar = document.getElementById("sueloBar");

let tempEstado = document.getElementById("tempEstado");
let humedadEstado = document.getElementById("humedadEstado");
let sueloEstado = document.getElementById("sueloEstado");


function estadoTexto(valor, min, max, amarilloMin, amarilloMax) {
    if (valor >= min && valor <= max) return "Bien";
    if (valor >= amarilloMin && valor <= amarilloMax) return "Intermedio";
    return "Mal";
}

function color(estado) {
    if (estado === "Bien") return "green";
    if (estado === "Intermedio") return "yellow";
    return "red";
}

onValue(tempRef, (snapshot) => {
    let temperatura = snapshot.val();
    tempValue.textContent = `${temperatura} °C`;

    let estado = estadoTexto(temperatura, 20, 35, 36, 40);
    
    tempEstado.textContent = estado;
    tempEstado.style.color = color(estado);

    tempBar.style.width = `${temperatura}%`;
    tempBar.style.background = color(estado);
});

onValue(humedadRef, (snapshot) => {
    let humedad = snapshot.val();
    humedadValue.textContent = `${humedad} %`;

    let estado = estadoTexto(humedad, 40, 60, 61, 70);

    humedadEstado.textContent = estado;
    humedadEstado.style.color = color(estado);

    humedadBar.style.width = `${humedad}%`;
    humedadBar.style.background = color(estado);
});

onValue(sueloRef, (snapshot) => {
    let humedadSuelo = snapshot.val();
    sueloValue.textContent = `${humedadSuelo} %`;

    let estado = estadoTexto(humedadSuelo, 50, 80, 40, 90);

    sueloEstado.textContent = estado;
    sueloEstado.style.color = color(estado);

    sueloBar.style.width = `${humedadSuelo}%`;
    sueloBar.style.background = color(estado);
});
