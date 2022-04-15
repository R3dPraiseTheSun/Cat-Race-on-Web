import {Navbar} from "../Components/Navbar.js";
import {Header} from "../Components/Header.js";
import {Footer} from "../Components/Footer.js";

import * as finish from "../Components/FinishState.js";

import * as Utils from "../Utils/SwitchPageUtils.js";
import * as Statistics from "../Components/Statistics.js";
window.showModalS = (event) => {
    Statistics.showModal(event.clientX, event.clientY);
}
window.closeModalS = () =>{
    Statistics.closeModal();
}
var curseState = 0;
window.curseStateChanger = (state) => {
    curseState =  state;
    Utils.changePage(1);
}
window.finishRaceWin = () => {
    Utils.changePage(1);
    finish.showModal(finish.finishState('WIN!!!!!!!!'));
    
}
window.finishRaceLost = () => {
    Utils.changePage(1);
    finish.showModal(finish.finishState('LOST :<<<<<<'));
}

const resourcePath = "./resources/";
const Article = function curseBasedOnState(){ 
    if(curseState == 0){
        return(    
        `<article>
            <div id="meniuPisici">
                <div id="statistici">
                    <div id="scrollableArea">
                        <div class="pisica" onmouseover="window.showModalS(event);" onmouseout="window.closeModalS()">
                            <h1>KittyKat</h1>
                            <img src="`+resourcePath+`Ocelot.png" alt="Racing cat"/>
                            <button>Selecteaza</button>
                        </div>
                        <div class="pisica" onmouseover="window.showModalS(event);" onmouseout="window.closeModalS()">
                            <h1>KittyKat</h1>
                            <img src="`+resourcePath+`Ragdoll_Cat.png" alt="Racing cat"/>
                            <button>Selecteaza</button>
                        </div>
                        <div class="pisica" onmouseover="window.showModalS(event);" onmouseout="window.closeModalS()">
                            <h1>KittyKat</h1>
                            <img src="`+resourcePath+`Siamese_Cat_JE3.png" alt="Racing cat"/>
                            <button>Selecteaza</button>
                        </div>
                        <div class="pisica" onmouseover="window.showModalS(event);" onmouseout="window.closeModalS()">
                            <h1>KittyKat</h1>
                            <img src="`+resourcePath+`Persian_Cat.png" alt="Racing cat"/>
                            <button>Selecteaza</button>
                        </div>
                        <div class="pisica" onmouseover="window.showModalS(event);" onmouseout="window.closeModalS()">
                            <h1>KittyKat</h1>
                            <img src="`+resourcePath+`Jellie_Cat.png" alt="Racing cat"/>
                            <button>Selecteaza</button>
                        </div>
                    </div>
                </div>
                <div id="bet">
                    <div id="suma">
                        <form>
                            <label>Introdu suma <input type="number" min="0"/><img id = "chips" src="`+resourcePath+`chips.png "/></label>
                            <input type="submit" value="Confirma"/>
                        </form>
                    </div>
                    <div id="debugBtn">
                        <button onclick="window.curseStateChanger(1);">Change State</button>
                    </div>
                </div>
            </div>
        </article>`
        );
    }else{
        return( 
        `<article>
            <div id="meniuPisici">
                <div id="racingPanel">
                    <h1>Racing now!</h1>
                    <div>
                        <img src="https://c.tenor.com/VoZ3ASneP2AAAAAd/minecraft-cat.gif"/>
                    </div>
                </div>
                <div id="debugBtn">
                    <button onclick="window.curseStateChanger(0);">Change State</button>
                    <button onclick="window.finishRaceWin()">Finish Race Win</button>
                    <button onclick="window.finishRaceLost()">Finish Race Lost</button>
                </div>
            </div>
        </article>`
        );
    }
};
var curseHTML='';
export default function buildRace(){
    curseHTML = 
    Header +
    Navbar +
    Article(curseState) +
    Footer;
    return curseHTML;
}
buildRace();