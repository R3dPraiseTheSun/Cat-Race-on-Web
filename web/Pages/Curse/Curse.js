import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"

const Article = `
<article>
<div id="meniuPisici">
    <div id="statistici">
        <div id="scrollableArea">
            <div class="pisica">
                <h1>KittyKat</h1>
                <img src="https://i.ytimg.com/vi/E7Aze8ELD7I/maxresdefault.jpg" alt="Racing cat"/>
                <button>Selecteaza</button>
            </div>
            <div class="pisica">
                <h1>KittyKat</h1>
                <img src="https://i.ytimg.com/vi/E7Aze8ELD7I/maxresdefault.jpg" alt="Racing cat"/>
                <button>Selecteaza</button>
            </div>
            <div class="pisica">
                <h1>KittyKat</h1>
                <img src="https://i.ytimg.com/vi/E7Aze8ELD7I/maxresdefault.jpg" alt="Racing cat"/>
                <button>Selecteaza</button>
            </div>
            <div class="pisica">
                <h1>KittyKat</h1>
                <img src="https://i.ytimg.com/vi/E7Aze8ELD7I/maxresdefault.jpg" alt="Racing cat"/>
                <button>Selecteaza</button>
            </div>
            <div class="pisica">
                <h1>KittyKat</h1>
                <img src="https://i.ytimg.com/vi/E7Aze8ELD7I/maxresdefault.jpg" alt="Racing cat"/>
                <button>Selecteaza</button>
            </div>
        </div>
    </div>
    <div id="bet">
        <div id="suma">
            <form>
                <label>Introdu suma <input type="text"/></label>
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