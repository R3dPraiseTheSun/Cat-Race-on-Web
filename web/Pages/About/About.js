import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"

const Article =`
<article>
    <div style="position: absolute;">
        <h1>It's about drive</h1>
    </div>
    <div>
        <img src="https://i.guim.co.uk/img/media/c5e73ed8e8325d7e79babf8f1ebbd9adc0d95409/2_5_1754_1053/master/1754.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=065f279099ded1062688e357b155dc29" alt="About cat"/>
        <audio src="resources/wideputinsong.mp3" type="audio/mpeg" controls></audio>
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
