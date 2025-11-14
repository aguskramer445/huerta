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


let tempValue = document.getElementById("tempValue");
let humedadValue = document.getElementById("humedadValue");
let sueloValue = document.getElementById("sueloValue");


let tempStatus = document.getElementById("tempStatus");
let humedadStatus = document.getElementById("humedadStatus");
let sueloStatus = document.getElementById("sueloStatus");



onValue(tempRef, (snapshot) => {
    let temperatura = snapshot.val();
tempValue.textContent = `${temperatura} °C`;
});


onValue(humedadRef, (snapshot) => {
    let humedad = snapshot.val();
humedadValue.textContent = `${humedad} %`;

});


onValue(sueloRef, (snapshot) => {
let humedadSuelo = snapshot.val();
sueloValue.textContent = `${humedadSuelo} %`;

});