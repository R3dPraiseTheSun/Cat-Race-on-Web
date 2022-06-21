import { StartTrack } from "../Components/RaceComponent.js";

let catTimesData, lapData;

const checkRacingStatus = function(){
    $.ajax({
        type: "POST",
        url: "/web/serverGetRacingState.py",
        success: function(data){
            if(data.race){
              catTimesData = data.catData.catInfo.timeComplet;
              lapData = data.catData.catInfo.lapTimesData;
              var totalLaps = data.catData.totalLaps;
              StartTrack(false, totalLaps);
              window.curseStateChanger(1);
            }
            //console.log("DEBUG:cats success!");
        },
        error: function(){
            //console.log("DEBUG:failed cats!");
        },
    }).done(() => {
        //console.log("DEBUG:CATS");
        setTimeout(function(){
          checkRacingStatus();
        }, 5000)
    });
}

checkRacingStatus();

export {catTimesData, lapData}