import buildHome from "./Pages/Acasa/Acasa.js"
import buildRace from "./Pages/Curse/Curse.js";
import buildMoney from "./Pages/Financiar/Financiar.js";
import buildAbout from "./Pages/About/About.js";
import * as Utils from "./Pages/Utils/SwitchPageUtils.js";

let pageArr=[];
var pageMap;
export function getPages(){
    pageArr = [[0, buildHome()], [1, buildRace()], [2, buildMoney()], [3, buildAbout()]];
    pageMap = new Map(pageArr);
}
getPages();

Utils.changePage(0);

export {pageMap};