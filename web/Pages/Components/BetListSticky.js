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
    var BetListHTML=``;
    for(let bet of betList.betList)
        BetListHTML += `
            <div class="separator"></div>
            <h4>Bet on Event:${bet[1]}</h4>
            <h5>Cat: ${betList.catName[bet[3]][1]} with ${bet[5]} chips</h5>
            <h5>at ${bet[4]}</h5>
            <div class="separator"></div>
        `;
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

export {betList}