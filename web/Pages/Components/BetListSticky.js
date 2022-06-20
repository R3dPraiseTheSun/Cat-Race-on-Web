import { getEventList } from "../Curse/Curse.js";
import { GetUserId, isLogged } from "./Login.js";

let betList = {
    "betList":null,
    "catName":null
};
const BetList = function(){
    let formData={
        'userID': GetUserId()
    }
    $.ajax({
        type: "POST",
        url: "/web/serverGetBets.py",
        data: formData,
        async:false,
        success: function(data){
            betList.betList = data.betList;
            betList.catName = data.catName;
            //console.log("DEBUG:cats success!");
        },
        error: function(){
            //console.log("DEBUG:failed cats!");
        },
    }).done(() => {
        //console.log("DEBUG:CATS");
    });
}
const renderBets = function(){
    let eventListData = getEventList();
    if(eventListData.length == 0) return ``;
    var BetListHTML=``;
    for(let bet of betList.betList){
        if(eventListData[0].includes(bet[1]))
        BetListHTML += `
            <div class="separator"></div>
            <h4>Bet on Event:${bet[1]}</h4>
            <h5>Cat: ${''} with ${bet[6]} chips</h5>
            <h5>at ${bet[4]} - ${bet[5]}</h5>
            <div class="separator"></div>
        `;
    }
    return BetListHTML;
}

export const getStickyBets = function(){
    if(isLogged){
        BetList();
        if(betList.betList.length > 0){
            let stickyBetsNode = document.createElement("div")
            stickyBetsNode.setAttribute("id",'stickyBetsHolder')
            stickyBetsNode.innerHTML=renderBets();
            document.getElementById('root').appendChild(stickyBetsNode);
        }
    }
}

export function getBetList(){
    return betList;
}

export {betList}