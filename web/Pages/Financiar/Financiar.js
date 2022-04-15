import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"

var balance = 15.4;
const resourcePath = "./resources/";

const Article = `
<article>
    <div id=financiar>
    <h1>Balanta</h1>
    <div><p>Disponibil: `+balance+`<img id = "chips" src="`+resourcePath+`chips.png "/></p></div>
    </div>
    <div id=financiar>
    <h1>Adauga Bani</h1>
    <div><label>Introdu suma <input type="number" min="0"/></label><img id = "cash" src="`+resourcePath+`cash.png "/></div>
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