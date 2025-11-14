// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";


// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBDNBGGbSJU_OwBG2Hsoo8nUdO8oEV1MNY",
  authDomain: "huerta-acb96.firebaseapp.com",
  projectId: "huerta-acb96",
  storageBucket: "huerta-acb96.firebasestorage.app",
  messagingSenderId: "122591321361",
  appId: "1:122591321361:web:e3da43e5db30b45a0980b0",
  databaseURL: "https://huerta-acb96-default-rtdb.firebaseio.com/"
};


// Inicializar Firebase
let app = initializeApp(firebaseConfig);
let db = getDatabase(app);


// Referencias a cada sensor (ajusta según tu estructura en Firebase)
let tempRef = ref(db, 'sensores/temperatura');
let humedadRef = ref(db, 'sensores/humedad');
let sueloRef = ref(db, 'sensores/humedad_suelo');


// Elementos HTML
let tempValue = document.getElementById("temp-value");
let humedadValue = document.getElementById("humedad-value");
let sueloValue = document.getElementById("suelo-value");


let tempStatus = document.getElementById("temp-status");
let humedadStatus = document.getElementById("humedad-status");
let sueloStatus = document.getElementById("suelo-status");


onValue(tempRef, (snapshot) => {
  let temperatura = snapshot.val();
  tempValue.textContent = `${temperatura} °C`;
 
  if (temperatura > 30) tempStatus.style.background = "red";
  else if (temperatura < 15) tempStatus.style.background = "lightblue";
  else tempStatus.style.background = "green";
});


onValue(humedadRef, (snapshot) => {
  let humedad = snapshot.val();
  humedadValue.textContent = `${humedad} %`;


  if (humedad < 30) humedadStatus.style.background = "orange";
  else if (humedad > 70) humedadStatus.style.background = "blue";
  else humedadStatus.style.background = "green";
});


onValue(sueloRef, (snapshot) => {
  let humedadSuelo = snapshot.val();
  sueloValue.textContent = `${humedadSuelo} %`;


  if (humedadSuelo < 40) sueloStatus.style.background = "brown";
  else sueloStatus.style.background = "green";
});
