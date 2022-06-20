import {Navbar} from "../Components/Navbar.js";
import {Header} from "../Components/Header.js";
import {Footer} from "../Components/Footer.js";

import * as finish from "../Components/FinishState.js";
import { Racing } from "../Components/RaceComponent.js";
import { GetUserId } from "../Components/Login.js";

import * as Utils from "../Utils/SwitchPageUtils.js";
import * as Statistics from "../Components/Statistics.js";
import { betList, getStickyBets } from "../Components/BetListSticky.js";
import { PastEvent } from "../Utils/EventManager.js";

var selectEvent = null;

var statsModal = false;
window.showModalS = (event) => {
    if(!statsModal)
        {if(catsArray[event.target.id] !== undefined) {Statistics.showModal(event.clientX, event.clientY, catsArray[event.target.id].catName, event.target.id); statsModal=!statsModal}}
    else
        {Statistics.closeModal(); statsModal=!statsModal}
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
window.selectEvent = (eventId) => {
    selectEvent = eventId;
    Utils.changePage(1);
}
window.placeBet = (catID) => {
    let betValue = $(`${"#bet"+catID}`).val();
    //console.log(GetUserId() + ' placed ' + betValue + ' on ' + catID + ' on event no. ' + selectEvent);
    let formData = {
        "userID": GetUserId(),
        "catID": catID,
        "betValue": betValue,
        "eventID": selectEvent
    }
    $.ajax({
        type: "POST",
        url: "/web/serverPlaceBet.py",
        data: formData,
        success: function(data){
            if(data.response)
                getStickyBets();
            else{
                $(`#placeBet${catID}`).text('Invalid Sum');
                setTimeout(()=>{
                    $(`#placeBet${catID}`).text('Place Bet')
                },1000);
            }
            //console.log(data);
            //console.log("DEBUG:cats success!");
        },
        error: function(){
            //console.log("DEBUG:failed cats!");
        },
    }).done(() => {
        //console.log("DEBUG:CATS");
    });
}

let catsArray = [];
const getCats=function catDB(){
    if(selectEvent == null)
        return (`<div id="no-cats-selected"><h1>No event selected. Select one from the event list</h1></div>`)
    $.ajax({
        type: "POST",
        url: "/web/serverGetCats.py",
        async:false,
        data:{
            'EventID':selectEvent
        },
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
    const buttonName = function(bet){
        if(bet > 0)
            return `Change Bet`;
        return `Place Bet`;
    }
    let bets = betList.betList;
    var CATS = ``;
    for(let cat of catsArray){
        let currentBet = 0;
        for(let bet of bets) if(bet[1] == selectEvent && cat.catID == bet[3]) currentBet=bet[5];
        CATS +=`
        <div id="${cat.catID}" class="pisica" onclick="window.showModalS(event);">
            <h1>${cat.catName}</h1>
            <img src="${resourcePath}${cat.catName}.png" alt="Racing cat" />
            <div class="addBet">
                <label>Introdu suma: <input id="bet${cat.catID}" type="number" placeholder="${currentBet}" min="0"/><img id = "chips" src="${resourcePath}chips.png "/></label>
                <button id="placeBet${cat.catID}" onclick="window.placeBet(${cat.catID})">${buttonName(currentBet)}</button>
            </div>
        </div>
        `;
    }
    return CATS;
};

window.testEventSystem = () =>{
    $.ajax({
        type: "POST",
        url: "/web/serverTestEvents.py",
        success: function(data){
            console.log(data);
            //console.log("DEBUG:cats success!");
        },
        error: function(){
            //console.log("DEBUG:failed cats!");
        },
    }).done(() => {
        //console.log("DEBUG:CATS");
    });
    
}

let eventList = [];

const eventsDropdown = function(){
    var isOpen=false;

    const ScheduledEvents = function(){
        eventList = [];
        $.ajax({
            type: "POST",
            url: "/web/serverGetEvents.py",
            async:false,
            success: function(data){
                for(let row of data.eventList) {if(PastEvent(row)) eventList.push(row)};
                //console.log("DEBUG:cats success!");
            },
            error: function(){
                //console.log("DEBUG:failed cats!");
            },
        }).done(() => {
            //console.log("DEBUG:CATS");
        });
        
        if(eventList.length == 0)
            return (`<div id="dropdown-no-content">No Events Found</div>`);
        var eventsHTML = ``;
        var buttonNr = 0;
        for(let event of eventList){
            eventsHTML += `<button onclick="window.selectEvent(${event[0]})" id="dropdown-button-${event[0]}">Event ${event[0]} from: ${event[1]}-${event[2]}</button>`;
            buttonNr += 1;
        }
        return eventsHTML;
    }

    window.switchDropdown = function(){
        $("#eventListDropdown").removeClass("dropdown-content " + isOpen);
        isOpen = !isOpen;
        $("#eventListDropdown").addClass("dropdown-content " + isOpen);
    }
    return(`
        <div class="eventDropdown">
            <button onclick="switchDropdown()" class="dropbtn">Events</button>
            <div id="eventListDropdown" class="dropdown-content ${isOpen}">
                ${ScheduledEvents()}
            </div>
        </div>
    `);
}

const selectEventHTML = function(){
    if(selectEvent!=null)
        return `<div id="selected-event"><h2>Selected Event: ${selectEvent}</h2></div>`
    return ``
}

export const getEventList = function(){
    return eventList;
}

const resourcePath = "./resources/";
const Article = function curseBasedOnState(){ 
    if(curseState == 0){
        return(    
        `<article>
            <div id="meniuPisici">
                ${eventsDropdown()}
                ${selectEventHTML()}
                <div id="statistici">
                    <div id="scrollableArea">
                        ${getCats()}
                    </div>
                </div>
                <div id="bet">
                    <div id="debugBtn">
                        <button onclick="window.curseStateChanger(1);">Change State</button>
                        <button onclick="window.testEventSystem();">Test Event Update</button>
                    </div>
                </div>
            </div>
        </article>`
        );
    }else{
        return Racing(catsArray);
    }
};
var curseHTML='';
export default function buildRace(){
    curseHTML = 
    Header +
    Navbar +
    Article() +
    Footer;
    return curseHTML;
}
buildRace();