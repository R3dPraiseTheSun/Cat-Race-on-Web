import {Navbar} from "../Components/Navbar.js"

const curseHTML = `
<header>
    <div class="title">
        <h1>Welcome to Catbet Casino!</h1>
    </div>
    <div class="account-buttons">
        <p class="login"><button onclick="window.showModal()" id="loginBtn">Log in</button></p>
        <p class="signup"><button>Sign up</button></p>
    </div>
    
</header>`
+ Navbar +
`<article>
    <div>
        <img src="https://i.ytimg.com/vi/E7Aze8ELD7I/maxresdefault.jpg" alt="Racing cat"/>
        <audio src="resources/wideputinsong.mp3" type="audio/mpeg" controls></audio>
    </div>
</article>
<footer>
    <div>
        <p>UAIC 2022 TW Paul Ionescu & Cosmin Avramescu</p>
    </div>
</footer>
`;

export {curseHTML as Curse};