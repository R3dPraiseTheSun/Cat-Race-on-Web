import * as LoginFunc from "../Components/Login.js";
import * as RegisterFunc from "../Components/Signup.js";

window.showModalL = LoginFunc.showModal;
window.showModalR = RegisterFunc.showModal;

var Header
function updateHeader(){
    if(LoginFunc.isLogged == false)
    Header =`
    <header>
        <div class="title">
            <h1>Welcome to Catbet Casino!</h1>
        </div>
        <div class="account-buttons">
            <p id="login"><button onclick="window.showModalL()" id="loginBtn">Log in</button></p>
            <p id="signup"><button onclick="window.showModalR()" id="signupBtn">Sign up</button></p>
        </div>
    </header>`;
    else
    Header =`
    <header>
        <div class="title">
            <h1>Welcome to Catbet Casino!</h1>
        </div>
        <div class="account-name">
            <p>Welcome Back ` + LoginFunc.loggedInUser + `</p>
        </div>
    </header>`;
}
updateHeader()

export {Header, updateHeader};
