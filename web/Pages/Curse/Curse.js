import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"

const resourcePath = "./resources/";
const Article = `
<article>
<div id="meniuPisici">
    <div id="statistici">
        <div id="scrollableArea">
            <div class="pisica">
                <h1>KittyKat</h1>
                <img src="`+resourcePath+`Ocelot.png" alt="Racing cat"/>
                <button>Selecteaza</button>
            </div>
            <div class="pisica">
                <h1>KittyKat</h1>
                <img src="`+resourcePath+`Ragdoll_Cat.png" alt="Racing cat"/>
                <button>Selecteaza</button>
            </div>
            <div class="pisica">
                <h1>KittyKat</h1>
                <img src="`+resourcePath+`Siamese_Cat_JE3.png" alt="Racing cat"/>
                <button>Selecteaza</button>
            </div>
            <div class="pisica">
                <h1>KittyKat</h1>
                <img src="`+resourcePath+`Persian_Cat.png" alt="Racing cat"/>
                <button>Selecteaza</button>
            </div>
            <div class="pisica">
                <h1>KittyKat</h1>
                <img src="`+resourcePath+`Jellie_Cat.png" alt="Racing cat"/>
                <button>Selecteaza</button>
            </div>
        </div>
    </div>
    <div id="bet">
        <div id="suma">
            <form>
                <label>Introdu suma <input type="number" min="0"/><img id = "chips" src="`+resourcePath+`chips.png "/></label>
                <input type="submit" value="Confirma"/>
            </form>
        </div>
    </div>
</div>
</article>
`;

var curseHTML='';
export default function buildRace(){
    curseHTML = 
    Header +
    Navbar +
    Article +
    Footer;
    return curseHTML;
}
buildRace();