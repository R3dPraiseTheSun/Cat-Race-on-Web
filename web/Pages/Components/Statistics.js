var modalShowing = false;

let resultArray = [];
var avgPerformance = 0;
var LastFive = ``;

const lastFiveStats = function fiveStats(catId){
    $.ajax({
        type: "POST",
        url: "/web/serverGetCatStats.py",
        async: false,
        data:{
            catId,
        },
        success: function(data){
            resultArray = [];
            for(let dataRow of data) {resultArray.push(dataRow[1]);}
            //console.log("DEBUG:cats stats success!");
        },
        error: function(){
            //console.log("DEBUG:failed cats stats!");
        },
    }).done(() => {
        //console.log("DEBUG:CATS stats");
    });
}

//define the modal
export const statistics= function stats(catName, catID){
    lastFiveStats(catID);
    function fct(){
        LastFive = ``;
        avgPerformance = 0;
        for(let i=0; i<5; i++){
            LastFive += `<div class="${resultArray[i]}">${resultArray[i].toUpperCase()}</div>`;
            if(resultArray[i]=='win')
                avgPerformance += 20;
        }
        return LastFive;
    }
    return(
        `<div id="circle"></div>
        <h1>${catName}</h1>
        <div id="lastRaces">
        ${fct()}
        </div>
        <div id="avgPerformance">
        <h3>Average performance:</h3>
        <p>${avgPerformance}%</p>
        </div>`
        )
    };
    
    
    let modal = document.createElement('div');
    modal.setAttribute("id","catStatistics");
    
export function showModal(clientX, clientY, catName, catID) {
    modal.innerHTML=statistics(catName, catID);
    modal.style.top=(clientY+5) + 'px';
    modal.style.left=(clientX) +'px';
    modalShowing = true;
    document.getElementById("root").appendChild(modal);
}

export function closeModal(){
    modalShowing = false;
    document.getElementById("root").removeChild(modal);
}