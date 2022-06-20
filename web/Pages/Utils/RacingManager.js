const checkRacingStatus = function(){
    $.ajax({
        type: "POST",
        url: "/web/serverGetRacingState.py",
        success: function(data){
            console.log(data);
            //console.log("DEBUG:cats success!");
        },
        error: function(){
            //console.log("DEBUG:failed cats!");
        },
    }).done(() => {
        //console.log("DEBUG:CATS");
    });
}
