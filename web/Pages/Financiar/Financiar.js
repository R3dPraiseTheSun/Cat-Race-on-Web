import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"

const Article = `
<article>
    <div id=financiar>
    <h1>Balanta</h1>
    </div>
    <div id=financiar>
    <h1>Adauga Bani</h1>
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