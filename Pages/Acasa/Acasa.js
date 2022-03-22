import * as LoginFunc from "../Components/Login.js";
window.showModal = LoginFunc.showModal;

const acasaHTML = `
<header>
    <div class="title">
        <h1>Welcome to Catbet Casino!</h1>
    </div>
    <div class="account-buttons">
        <p class="login"><button onclick="window.showModal()" id="loginBtn">Log in</button></p>
        <p class="signup"><button>Sign up</button></p>
    </div>
    
</header>
<nav>
    <ul>
        <li><button>Acasa</button></li>
        <li><button>Curse</button></li>
        <li><button>Adauga Bani</button></li>
        <li><button>About</button></li>
    </ul>
</nav>

<article>
    <div>
        <img src="https://pbs.twimg.com/profile_images/1291871024728997888/n38ACTc4_400x400.jpg" alt="Minecraft cat"/>
        <audio src="resources/wideputinsong.mp3" type="audio/mpeg" controls></audio>
    </div>
</article>
<footer>
    <div>
        <p>UAIC 2022 TW Paul Ionescu & Cosmin Avramescu</p>
    </div>
</footer>
`;

export {acasaHTML as Acasa};