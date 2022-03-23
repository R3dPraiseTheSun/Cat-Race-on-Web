import * as LoginFunc from "../Components/Login.js";
import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"
window.showModal = LoginFunc.showModal;


const Article = `
<article>
<div>
    <img src="https://pbs.twimg.com/profile_images/1291871024728997888/n38ACTc4_400x400.jpg" alt="Minecraft cat"/>
    <audio src="resources/wideputinsong.mp3" type="audio/mpeg" controls></audio>
</div>
</article>`;

const acasaHTML = 
Header +
Navbar +
Article +
Footer;

export default acasaHTML;