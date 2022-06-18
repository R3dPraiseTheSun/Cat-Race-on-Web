//Header.js
import * as LoginFunc from "../Components/Login.js";
import * as RegisterFunc from "../Components/Signup.js";

window.showModalL = LoginFunc.showModal;
window.showModalR = RegisterFunc.showModal;

var Header
const accountName = function (){
    if(LoginFunc.isLogged)
    return(`
        <div class="account-name">
            <p>Welcome Back ` + LoginFunc.loggedInUser + `</p>
        </div>
    `);
    else return `<div/>`;
}
function updateHeader(){
    Header =`
    <header>
        <div class="title">
            <h1>Welcome to Catbet Casino!</h1>
        </div>
        ${accountName()}
    </header>`;
}
updateHeader()

export {Header, updateHeader};

