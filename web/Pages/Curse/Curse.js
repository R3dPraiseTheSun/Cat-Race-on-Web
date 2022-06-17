import {Navbar} from "../Components/Navbar.js";
import {Header} from "../Components/Header.js";
import {Footer} from "../Components/Footer.js";

import * as finish from "../Components/FinishState.js";
import { Racing } from "../Components/RaceComponent.js";

import * as Utils from "../Utils/SwitchPageUtils.js";
import * as Statistics from "../Components/Statistics.js";

var statsModal = false;
window.showModalS = (event) => {
    if(!statsModal)
        {Statistics.showModal(event.clientX, event.clientY, catsArray[event.target.id].catName, event.target.id); statsModal=!statsModal}
    else
        {Statistics.closeModal(); statsModal=!statsModal}
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
            //console.log("DEBUG:cats success!");
        },
        error: function(){
            //console.log("DEBUG:failed cats!");
        },
    }).done(() => {
        //console.log("DEBUG:CATS");
    });
    var CATS = ``;
    for(let cat of catsArray){
        CATS +=`
        <div id="${cat.catID}" class="pisica" onclick="window.showModalS(event);">
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
        return Racing();
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