import * as Utils from "../Utils/SwitchPageUtils.js"
window.changePage=Utils.changePage;

//define the modal
let navigation=`
    <nav>
        <button onclick="window.changePage(0)"><img id="logoCat" src="resources/logoCat.png"/></button>
        <ul>
            <li><button onclick="window.changePage(1)">Curse</button></li>
            <li><button onclick="window.changePage(2)">Financiar</button></li>
            <li><button onclick="window.changePage(3)">About</button></li>
        </ul>
    </nav>
`;

export {navigation as Navbar};