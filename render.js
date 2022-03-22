import{Acasa} from "./Pages/Acasa/Acasa.js";

const acasaPath = "./Pages/About/Acasa/Acasa.js";
const cursePath = "./Pages/About/Acasa/Acasa.js";
const adaugaBaniPath = "./Pages/About/Acasa/Acasa.js";
const aboutPath = "./Pages/About/About/About.js";

let selectedPage = "Acasa";

var root = document.getElementById("root");
switch(selectedPage){
    case "Acasa":
        root.innerHTML = Acasa;
}