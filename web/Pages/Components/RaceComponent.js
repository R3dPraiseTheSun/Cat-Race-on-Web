class Cat{
    name;
    id;
    speed=10;
    racingLayer=0;
    constructor(name,id){
        this.name = name;
        this.id = id;
    }
    get speed(){
        return this.speed;
    }
    setRandomSpeed = function(){
        this.speed=Math.random()*10+1;
    }
    nextStage = function(){
        this.racingLayer+=1;
    }
}

class CatTrack{
    currentStage;
    maxStage;
    competingCats = [Cat];
    constructor(){
        this.currentStage=0;
        this.maxStage=4;
    }
    set competingCats(catsArray){
        this.competingCats = catsArray;
    }
    get competingCats(){
        return this.competingCats;
    }
    setStage = function(newStage){
        this.currentStage=newStage;
    }
}

let track = new CatTrack();
const resourcePath = "./resources/";

const pivotRacingLine = {top: 250, left: -250};
var RacingCats=``;
function generateCats(catList){
    let catsArray = [Cat];
    let pivotPoint = pivotRacingLine;
    var position = 0;
    for(let cat of catList) {
        let objCat = new Cat(cat.catName, cat.catID);
        catsArray.push(objCat);
        objCat.setRandomSpeed();

        RacingCats += `
        <div id="Cat${position}" class="catHolder" style="width:10%; display:inline">
        <img style="top:${pivotPoint.top}px; left:${pivotPoint.left}px; animation: movement${position} ${10/objCat.speed}s; animation-timing-function: linear;" src=${resourcePath}${cat.catName}.png>
        </div>`;

        position+=1;
        pivotPoint.top+=30;
        pivotPoint.left-=110;
    }
    track.competingCats=catsArray;
    console.log(track);
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
            let newElement = element;
            parent.removeChild(element);
            newElement.style.animation = `movement${position} ${10/cat.speed}s linear`;
            parent.appendChild(newElement)
        }
    }
});



var RacingComponent = ``;
export const Racing = function setupRace(catList){
    RacingComponent = `
    <article>
        <div id="meniuPisici">
            <div id="racingPanel">
                <h1>Racing now!</h1>
                <div>
                    <img src=${resourcePath}/catTrackBG.jpeg>
                    <img src=${resourcePath}/catTrack.png>
                    ${generateCats(catList)}
                </div>
            </div>
            <div id="debugBtn">
                <button onclick="window.curseStateChanger(0);">Change State</button>
                <button onclick="window.finishRaceWin()">Finish Race Win</button>
                <button onclick="window.finishRaceLost()">Finish Race Lost</button>
            </div>
        </div>
    </article>
    `;
    return RacingComponent;
}