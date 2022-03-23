import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"

const Article = `
<article>
<div>
    <img src="https://i.ytimg.com/vi/E7Aze8ELD7I/maxresdefault.jpg" alt="Racing cat"/>
    <audio src="resources/wideputinsong.mp3" type="audio/mpeg" controls></audio>
</div>
</article>
`;

const curseHTML = 
Header +
Navbar +
Article +
Footer;

export default curseHTML;