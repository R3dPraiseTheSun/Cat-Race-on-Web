import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"

const Article =`
<article>
    <div style="position: absolute;">
    </div>
    <div id="about">
    <p>Sa se implementeze o aplicatie Web oferind utilizatorilor autentificati posibilitatea realizarii de pariuri referitoare la cursele de feline.</p>
    <p>&nbsp;</p>
    <p>Sistemul va permite vizualizarea unui istoric al pariurilor si al rezultatelor aferente pentru fiecare concurent (pisica, motan).</p>
    <p>&nbsp;</p>
    <p>Se va genera, de asemenea, atat un raport -- minimal, in formatele CSV, HTML, Markdown si XML -- oferind starea actuala a pariurilor, cat si calendarul (disponibil in formatul iCalendar) despre desfasurarea curselor din viitorul apropiat.</p>
    <p>&nbsp;</p>
    <p>Pentru fiecare cursa, va exista un termen-limita de realizare a pariurilor.</p> 
    <p>&nbsp;</p>
    <p>Bonus: simularea serviciului de plata electronica vizand pariurile efectuate.</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p><strong>Authors:</strong></p>
    <p>Paul Ionescu</p>
    <p>Cosmin Avramescu</p>
    <p>&nbsp;</p>
    <p><strong>Teacher:</strong></p>
    <p>Amariei Ciprian</p>
    </div>
</article>
`

var aboutHTML = '';
export default function buildAbout(){
    aboutHTML=
    Header +
    Navbar +
    Article +
    Footer;
    return aboutHTML;
}
buildAbout();
