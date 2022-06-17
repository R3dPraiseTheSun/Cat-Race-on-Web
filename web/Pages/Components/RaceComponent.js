class Cat{
    name='';
    id='';
    speed=10;
    constructor(name,id){
        this.name = name;
        this.id = id;
    }
    get speed(){
        return this.speed;
    }
    setInitialSpeed = function(){
        this.speed=Math.floor(Math.random()*101);
    }
    setSpeed = function(newSpeed){
        this.speed=newSpeed;
    }
}

const resourcePath = "./resources/";

const pivotRacingLine = {top: 250, left: -250};
var RacingCats=``;
function generateCats(catList){
    let pivotPoint = pivotRacingLine;
    for(let cat of catList) {
        let objCat = new Cat(cat.catName, cat.catID);
        objCat.setInitialSpeed();
        console.log(objCat, objCat.speed);
        RacingCats += `<div class="catHolder" style="width:10%; display:inline"><img style="top:${pivotPoint.top}px; left:${pivotPoint.left}px" src=${resourcePath}${cat.catName}.png></div>`;
        pivotPoint.top+=30;
        pivotPoint.left-=110;
        console.log(pivotPoint);
    }
    return RacingCats;
}

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