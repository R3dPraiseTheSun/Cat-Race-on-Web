import {Navbar} from "../Components/Navbar.js";
import {Header} from "../Components/Header.js";
import {Footer} from "../Components/Footer.js";

import * as finish from "../Components/FinishState.js";

import * as Utils from "../Utils/SwitchPageUtils.js";
import * as Statistics from "../Components/Statistics.js";

window.showModalS = (event) => {
    Statistics.showModal(event.clientX, event.clientY, catsArray[event.target.id].catName, Math.floor(Math.random() * 101));
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
    finish.showModal(finish.finishState('WIN!!'));
    
}
window.finishRaceLost = () => {
    Utils.changePage(1);
    finish.showModal(finish.finishState('LOST :('));
}

let catsArray = [];
const getCats=function catDB(){
    $.ajax({
        type: "POST",
        url: "/web/serverGetCats.py",
        success: function(data){
            catsArray = [];
            for(let cat of data){let catData={catID:cat[0],catName:cat[1]}; catsArray.push(catData);}
            console.log("DEBUG:cats success!");
        },
        error: function(){
            console.log("DEBUG:failed cats!");
        },
    }).done(() => {
        console.log("DEBUG:CATS");
    });
    var CATS = ``;
    for(let cat of catsArray){
        console.log(cat);
        CATS +=`
        <div id="${cat.catID}" class="pisica" onmouseover="window.showModalS(event);" onmouseout="window.closeModalS()">
            <h1>${cat.catName}</h1>
            <img src="${resourcePath}${cat.catName}.png" alt="Racing cat" />
            <button>Selecteaza</button>
        </div>
        `;
    }
    return CATS;
};

const resourcePath = "./resources/";
const Article = function curseBasedOnState(){ 
    if(curseState == 0){
        return(    
        `<article>
            <div id="meniuPisici">
                <div id="statistici">
                    <div id="scrollableArea">
                        ${getCats()}
                    </div>
                </div>
                <div id="bet">
                    <div id="suma">
                        <form>
                            <label>Introdu suma <input type="number" min="0"/><img id = "chips" src="${resourcePath}chips.png "/></label>
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