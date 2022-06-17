class Cat{
    name='';
    id='';
    speed=10;
    constructor(name,id){
        this.name = name;
        this.id = id;
    }
}

const resourcePath = "./resources/";

var RacingComponent = ``;
export const Racing = function setupRace(){
    RacingComponent = `
    <article>
        <div id="meniuPisici">
            <div id="racingPanel">
                <h1>Racing now!</h1>
                <div>
                    <img src=${resourcePath}/catTrackBG.jpeg>
                    <img src=${resourcePath}/catTrack.png>
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