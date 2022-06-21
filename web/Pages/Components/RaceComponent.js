import { catTimesData, lapData } from "../Utils/RacingManager.js";

class Cat{
    name;
    id;
    speed=10;
    racingLayer=0;
    nextLapTime=0;
    didFinish = false;
    constructor(name,id){
        this.racingLayer = 0;
        this.name = name;
        this.id = id;
        this.didFinish = false;
    }
    get speed(){
        return this.speed;
    }
    get id(){
        return this.id
    }
    setRandomSpeed = function(){
        this.speed=Math.random()*4+1;
    }
    nextStage = function(){
        this.racingLayer+=1;
        if(this.racingLayer == track.maxStage+1) {
            this.racingLayer = track.maxStage+1;
            if(!this.didFinish){
                this.didFinish=true;
                track.addWinner(this);
            }
            
        }
        var racingLayerEvent = new CustomEvent("racing-layer-change", {
            "detail": {"racingLayer": this.racingLayer}
        });
        document.dispatchEvent(racingLayerEvent);
    }
}

class CatTrack{
    currentStage;
    maxStage;
    competingCats = [];
    finishList = [];
    constructor(numberOfLaps){
        this.currentStage=0;
        this.maxStage=numberOfLaps;
    }
    set competingCats(catsArray){
        this.competingCats = catsArray;
    }
    get competingCats(){
        return this.competingCats;
    }
    setStage = function(newStage){
        if(newStage <= this.maxStage)
            this.currentStage=newStage;
        if(track.currentStage > 0) $("img#startline.showing").attr("class", "hidden");
        if(track.currentStage >= track.maxStage) $("img#finishline.hidden").attr("class", "showing");
    }
    addWinner = function(finishedCat){
        this.finishList.push(finishedCat);
        if($(".raceresults").remove())
        var resultNode = document.createElement("div");
        resultNode.className = "raceresults";
        resultNode.innerHTML = RaceResult();
        $("#root").append(resultNode);
    }
}

document.addEventListener("racing-layer-change", function(e){
    if(track.currentStage < e.detail.racingLayer) track.setStage(e.detail.racingLayer);
    let racerImages = document.querySelectorAll('.catHolder');
    for(let cat of track.competingCats){
        //console.log(cat.name+' is on layer '+cat.racingLayer+' and track current layer is: '+track.currentStage+' out of '+track.maxStage);
        if(cat.racingLayer == track.currentStage) {racerImages[cat.id].style.visibility = 'visible';}
        else {racerImages[cat.id].style.visibility = 'hidden';}
    }
    
})

let track;
export const StartTrack = (simulation, laps)=>{
    if(!simulation)
        console.log(catTimesData, lapData);
    track = new CatTrack(laps);
}

const resourcePath = "./resources/";

const pivotRacingLine = {top: 250, left: -250};
var RacingCats=``;
function generateCats(catList){
    let catsArray = [];
    let pivotPoint = pivotRacingLine;
    var position = 0;
    for(let cat of catList) {
        let objCat = new Cat(cat.catName, cat.catID);
        objCat.setRandomSpeed();
        objCat.nextLapTime = 10/objCat.speed;  
        catsArray.push(objCat);
        RacingCats += `
        <div id="Cat${position}" class="catHolder" style="display:inline">
            <img style="top:${pivotPoint.top}px; left:${pivotPoint.left}px; animation: movement${position} ${10/objCat.speed}s; animation-timing-function: linear;" src="${resourcePath}${cat.catName}.png"/>
        </div>
        `;
        position+=1;
        pivotPoint.top+=30;
        pivotPoint.left-=110;
    }
    track.competingCats=catsArray;
    //console.log(track);
    return RacingCats;
}

addEventListener("animationend",function listener(event){
    var position = event.animationName.split('movement')[1];
    let element = document.querySelector(`#Cat${position}.catHolder>img`);
    let parent = element.parentElement;
    for(let cat of track.competingCats){
        if(event.animationName.split('movement')[1] == cat.id){
            cat.nextStage();
            cat.setRandomSpeed();
            cat.nextLapTime = 10/cat.speed;
            let newElement = element;
            parent.removeChild(element);
            newElement.style.animation = `movement${position} ${10/cat.speed}s linear`;
            parent.appendChild(newElement)
        }
    }
});

const RaceResult = function(){
    console.log(track.finishList);
    var RaceResultHTML=`<h2>Race Result: </h2>`;
    for(let catNr in track.finishList){
        RaceResultHTML += `<h3 class="finish" id="No${catNr}">${track.finishList[catNr].name}</h3>`;
    }
    return RaceResultHTML;
}

var RacingComponent = ``;
export const Racing = function setupRace(catList){
    RacingComponent = `
    <article>
        <div id="meniuPisici">
            <div id="racingPanel">
                <h1>Racing now!</h1>
                <div class="backgroundHolder">
                    <img src="${resourcePath}catTrackBG.jpeg"/>
                    <img src="${resourcePath}catTrack.png"/>
                    <img id="startline" class="showing" src="${resourcePath}startLine.png"/>
                    <img id="finishline" class="hidden" src="${resourcePath}finishLine.png"/>
                </div>
                <div class="competingCats">
                    ${generateCats(catList)}
                </div>
            </div>
            <div id="debugBtn">
                <button onclick="window.curseStateChanger(0);">Back to Curse</button>
            </div>
        </div>
    </article>
    `;
    return RacingComponent;
}