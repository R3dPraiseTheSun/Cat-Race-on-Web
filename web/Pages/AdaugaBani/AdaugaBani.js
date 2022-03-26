import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"

const Article = `
<article>
    <div>
        <img src="https://i.pinimg.com/736x/99/45/c8/9945c8754fcd23c0d502ee43e9d37f29.jpg" alt="Sold cat"/>
        <audio src="resources/wideputinsong.mp3" type="audio/mpeg" controls></audio>
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