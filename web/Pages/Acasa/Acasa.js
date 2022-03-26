import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"

const Article = `
<article>
<div>
    <img src="https://pbs.twimg.com/profile_images/1291871024728997888/n38ACTc4_400x400.jpg" alt="Minecraft cat"/>
    <audio src="resources/wideputinsong.mp3" type="audio/mpeg" controls></audio>
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