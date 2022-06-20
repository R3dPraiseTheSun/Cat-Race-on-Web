import  * as render from "../../render.js";
import { getStickyBets } from "../Components/BetListSticky.js";
import { buildUserCard } from "../Components/UserCardComponent.js";

let baseURL = document.URL;
baseURL = baseURL.split('#')[0];
let pageNUmber = 0;

function processURL(response, urlPath){
    document.title = response.title;
    var root = document.getElementById("root");
    root.innerHTML = response.html;
    document.location.href = baseURL + urlPath;
}

export function changePage(number){ 
    render.getPages();
    var title;
    var urlPath;
    pageNUmber = number;
    switch (number) {
        case 0:
            title = "Acasa";
            urlPath = "#Acasa";
            break;
    
        case 1:
            title = 'Curse';
            urlPath = "#Curse";
            break;
        case 2:
            title = 'Adauga Bani';
            urlPath = "#Adauga Bani";
            break;
        case 3:
            title = 'About';
            urlPath = "#About";
            break;
        default:
            title = '404 not found';
            urlPath = '#nuuuu mai avem';
    }
    let response = {
        html: render.pageMap.get(number),
        title: title
    };
    processURL(response, urlPath);
    getStickyBets();
    buildUserCard();
}