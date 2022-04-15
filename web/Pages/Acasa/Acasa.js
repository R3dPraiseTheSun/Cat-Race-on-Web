import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"

const Article = `
<article>
<div id="column">
</div>
</article>`;

var acasaHTML = '';
export default function buildHome(){
    acasaHTML = 
    Header +
    Navbar +
    Article +
    Footer;
    return acasaHTML;
}
buildHome();