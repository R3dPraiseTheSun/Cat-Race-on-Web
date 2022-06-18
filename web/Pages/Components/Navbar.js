//Navbar.js
import * as Utils from "../Utils/SwitchPageUtils.js"
import * as LoginFunc from "../Components/Login.js";

window.changePage=Utils.changePage;

window.logout = function(){
    document.cookie = 'sessionID=; Max-Age=-9999999;';
    LoginFunc.logStatus(false);
    window.changePage(0);
}

const accountButtons = function (){
    if(!LoginFunc.isLogged) return(`
        <p id="login"><button onclick="window.showModalL()" id="loginBtn">Log in</button></p>
        <p id="signup"><button onclick="window.showModalR()" id="signupBtn">Sign up</button></p>
    `);
    else return(`<p id="logout"><button id="logoutBtn" onclick="window.logout()">Log out</button></p>`);
}

const navButtons = function (){
    if(!LoginFunc.isLogged) return(`
        <li><button onclick="window.changePage(1)">Curse</button></li>
        <li><button onclick="window.changePage(3)">About</button></li>
    `);
    else return(`
        <li><button onclick="window.changePage(1)">Curse</button></li>
        <li><button onclick="window.changePage(2)">Financiar</button></li>
        <li><button onclick="window.changePage(3)">About</button></li>
    `);
}

var navigation
function updateNav(){
    navigation =`
    <nav>
        <button onclick="window.changePage(0)"><img id="logoCat" src="resources/logoCat.png"/></button>
        <div class="account-buttons">
            ${accountButtons()}
        </div>
        <ul>
            ${navButtons()}
        </ul>
    </nav>
`;
}
updateNav()

export {navigation as Navbar, updateNav};