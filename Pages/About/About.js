import {Navbar} from "../Components/Navbar.js"

const aboutHTML = `
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
        <img src="https://i.guim.co.uk/img/media/c5e73ed8e8325d7e79babf8f1ebbd9adc0d95409/2_5_1754_1053/master/1754.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=065f279099ded1062688e357b155dc29" alt="About cat"/>
        <audio src="resources/wideputinsong.mp3" type="audio/mpeg" controls></audio>
    </div>
</article>
<footer>
    <div>
        <p>UAIC 2022 TW Paul Ionescu & Cosmin Avramescu</p>
    </div>
</footer>
`;

export {aboutHTML as About};