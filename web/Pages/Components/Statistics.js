var modalShowing = false;
var avgPerformance = 0;

let resultArray = [];

const lastFiveStats = function fiveStats(catId){
    avgPerformance = 0;
    $.ajax({
        type: "POST",
        url: "/web/serverGetCatStats.py",
        data:{
            catId,
        },
        success: function(data){
            resultArray = [];
            for(let dataRow of data) {console.log(dataRow); resultArray.push(dataRow[1]);}
            console.log("DEBUG:cats stats success!");
        },
        error: function(){
            console.log("DEBUG:failed cats stats!");
        },
    }).done(() => {
        console.log("DEBUG:CATS stats");
    });

    var LastFive = ``;
    for(let i=0; i<5; i++){
        LastFive += `<div class="${resultArray[i]}">${resultArray[i].toUpperCase()}</div>`;
        if(resultArray[i]=='win')
            avgPerformance += 20;
    }
    return LastFive;
}

//define the modal
export const statistics= function stats(catName, catID){
    return(
        `<div id="circle"></div>
        <h1>${catName}</h1>
        <div id="lastRaces">
            ${lastFiveStats(catID)}
        </div>
        <div id="avgPerformance">
            <h3>Average performance:</h3>
            <p>${avgPerformance}%</p>
        </div>`
    )
};


let modal = document.createElement('div');
modal.setAttribute("id","catStatistics");

export function showModal(clientX, clientY, catName, avgPerf) {
    modal.innerHTML=statistics(catName, avgPerf);
    modal.style.top=(clientY+5) + 'px';
    modal.style.left=(clientX) +'px';
    modalShowing = true;
    document.getElementById("root").appendChild(modal);
}

export function closeModal(){
    modalShowing = false;
    document.getElementById("root").removeChild(modal);
}