import * as Utils from "../Utils/SwitchPageUtils.js"
window.changePage=Utils.changePage;

//define the modal
let navigation=`
    <nav>
    <div id="funnyCat">
        <img src="https://external-preview.redd.it/H36GE4zP5H-ySwKN6opCb2OOWJFSMK2p2w1oLj1D4rc.jpg?auto=webp&s=215aa001c50138206c8d10b7d7712f30f951474c" alt="gambling cat owo">
    </div>
    <ul>
        <li><button onclick="window.changePage(0)">Acasa</button></li>
        <li><button onclick="window.changePage(1)">Curse</button></li>
        <li><button onclick="window.changePage(2)">Adauga Bani</button></li>
        <li><button onclick="window.changePage(3)">About</button></li>
    </ul>
    </nav>
`;

export {navigation as Navbar};