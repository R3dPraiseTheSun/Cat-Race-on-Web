import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"

var balance = 15.4;
const resourcePath = "./resources/";

const Article = `
<article>
    <div id=financiar>
    <h1>Balanta</h1>
    <p> Disponibil: `+balance+`<img id = "chips" src="`+resourcePath+`chips.png "/></p>
    </div>
    <div id=financiar>
    <h1>Adauga Bani</h1>
    <label>Introdu suma <input type="number" min="0"/><img id = "cash" src="`+resourcePath+`cash.png "/></label>
    </div>
    <div id=financiar>
    <h1>Istoric curse</h1>
    </div>
</article>
`;

var adaugabaniHTML = '';
export default function buildMoney(){
    adaugabaniHTML=
    Header +
    Navbar +
    Article +
    Footer;
    return adaugabaniHTML;
}
buildMoney();