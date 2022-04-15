var modalShowing = false;

var avgPerformance = 100;
//define the modal
let statistics=`
<div id="circle"></div>
<h1>CATOLO</h1>
<div id="lastRaces">
    <div class='win'>WIN</div>
    <div class='lose'>LOST</div>
    <div class='win'>WIN</div>
    <div class='win'>WIN</div>
    <div class='lose'>LOST</div>
</div>
<div id="avgPerformance">
    <h3>Average performance:</h3>
    <p>`+avgPerformance+`%</p>
</div>
`;

let modal = document.createElement('div');
modal.setAttribute("id","catStatistics");
modal.innerHTML=statistics;

export function showModal(clientX, clientY) {
    modal.style.top=(clientY+5) + 'px';
    modal.style.left=(clientX) +'px';
    modalShowing = !modalShowing;
    document.getElementById("root").appendChild(modal);
}

export function closeModal(){
    document.getElementById("root").removeChild(modal);
}

export {statistics};