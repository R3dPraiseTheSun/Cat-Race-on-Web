import buildHome from "./Pages/Acasa/Acasa.js"
import buildRace from "./Pages/Curse/Curse.js";
import buildMoney from "./Pages/Financiar/Financiar.js";
import buildAbout from "./Pages/About/About.js";
import * as Utils from "./Pages/Utils/SwitchPageUtils.js";

import {updateHeader} from "./Pages/Components/Header.js";
import {updateNav} from "./Pages/Components/Navbar.js";

import * as LoginFunc from "./Pages/Components/Login.js";

let pageArr=[];
var pageMap;
export function getPages(){
    pageArr = [[0, buildHome()], [1, buildRace()], [2, buildMoney()], [3, buildAbout()]];
    pageMap = new Map(pageArr);
}
getPages();

Utils.changePage(0);

if(document.cookie.includes('sessionID')){
    let formData ={
        cookie: document.cookie.split('sessionID=')[1].split(':')[0],
        clientID: document.cookie.split('sessionID=')[1].split(':')[1]
    };
    $.ajax({
        type: "POST",
        url: "/web/serverContinousLogin.py",
        data: formData,
        dataType: "json",
        success: function(data){
            LoginFunc.logStatus(true);
            LoginFunc.loggedInUserStatus(data.user);
            LoginFunc.UserIdStatus(data.id);
            updateHeader();
            updateNav();
            Utils.changePage(0);
            if(!document.cookie.includes('sessionID'))
                document.cookie = "sessionID="+data.sessionID+";";
        },
        error: function(){
            //console.log("DEBUG:failed login!");
        },
        }).done(function() {
        //console.log("DEBUG:login done");
    });
}
export {pageMap};