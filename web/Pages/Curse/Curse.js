import {Navbar} from "../Components/Navbar.js";
import {Header} from "../Components/Header.js";
import {Footer} from "../Components/Footer.js";

import * as finish from "../Components/FinishState.js";
import { Racing, StartTrack } from "../Components/RaceComponent.js";
import { GetUserId, getAdminStatus } from "../Components/Login.js";

import * as Utils from "../Utils/SwitchPageUtils.js";
import * as Statistics from "../Components/Statistics.js";
import { betList, getStickyBets } from "../Components/BetListSticky.js";
import { PastEvent } from "../Utils/EventManager.js";
import download_events from exportData;

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
    if(state == 0) selectEvent = null;
    if(state == 2) StartTrack(true, $('#testLapsInput').val(), selectEvent);
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
        if(bets != null)
            for(let bet of bets) 
                if(bet[1] == selectEvent && cat.catID == bet[3])
                    currentBet=bet[6];
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
    var eventTime = $("#DateData").val();
    var eventLaps = $("#LapsData").val();
    // console.log(eventTime.split("T")[0].split('-')[2]+'/'+
    // eventTime.split("T")[0].split('-')[1]+'/'+
    // eventTime.split("T")[0].split('-')[0],
    // eventTime.split("T")[1]);
    let formData = {
        "date":eventTime.split("T")[0].split('-')[2]+'/'+
        eventTime.split("T")[0].split('-')[1]+'/'+
        eventTime.split("T")[0].split('-')[0],
        "time":eventTime.split("T")[1],
        "laps":eventLaps
    }
    $.ajax({
        type: "POST",
        url: "/web/serverCreateEvent.py",
        data: formData,
        success: function(data){
            window.location.reload();
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
        for(let event of eventList)
            if(event[0]==selectEvent)
                return `<div id="selected-event"><h2>Selected Event: ${event[0]}|| Starting Time: ${event[1]} - ${event[2]}</h2></div>`
    return ``
}

export const getEventList = function(){
    return eventList;
}

const adminTools = function(){
    if(getAdminStatus()==1)
        return(`
        <div style="margin-top:20px"><p>(Admin Tool) Set a New Event:</p>
            <label>Date and Time:<input id="DateData" type="datetime-local" value="${AddMinutesToDate(Date.now(),10)}" min="${AddMinutesToDate(Date.now(),10)}"></label>
            <label>Number of Laps:<input id="LapsData" type"number" value="5"/></label>
            <button onclick="window.testEventSystem();">Add Event</button>
        </div>
        `);
    return ``;
}

const resourcePath = "./resources/";
const Article = function curseBasedOnState(){ 
    if(curseState == 0){
        return(    
        `<article>
            <div id="meniuPisici">
            <button onclick="download_events()">Download Events</button>
                ${eventsDropdown()}
                ${selectEventHTML()}
                <div id="statistici">
                    <div id="scrollableArea">
                        ${getCats()}
                    </div>
                </div>
                <div id="bet">
                    <div id="debugBtn">
                        <label>Number of Laps:<input id="testLapsInput" type="number" value="5"/><button onclick="window.curseStateChanger(2);">Simulate Event</button></label>
                    </div>
                    ${adminTools()}
                </div>
            </div>
        </article>`
        );
    }else{
        return Racing(catsArray);
    }
};


function AddMinutesToDate(date, minutes) {
    let minDate = new Date(date + minutes*60000);
    return `${minDate.getFullYear()}-${("0" + (minDate.getMonth() + 1)).slice(-2)}-${("0" + (minDate.getDate())).slice(-2)}T${("0" + (minDate.getHours())).slice(-2)}:${("0" + (minDate.getMinutes())).slice(-2)}`;
}

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
