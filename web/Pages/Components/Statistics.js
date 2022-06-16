var modalShowing = false;

//define the modal
export const statistics= function stats(catName, avgPerformance){
    return(
        `<div id="circle"></div>
        <h1>${catName}</h1>
        <div id="lastRaces">
            <div class='win'>WIN</div>
            <div class='lose'>LOST</div>
            <div class='win'>WIN</div>
            <div class='win'>WIN</div>
            <div class='lose'>LOST</div>
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