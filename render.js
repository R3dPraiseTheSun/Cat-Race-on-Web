import Acasa from "./Pages/Acasa/Acasa.js"
import Curse from "./Pages/Curse/Curse.js";
import AdaugaBani from "./Pages/AdaugaBani/AdaugaBani.js";
import About from "./Pages/About/About.js";

import * as Utils from "./Pages/Utils/SwitchPageUtils.js"

const pageArr = [[0, Acasa], [1, Curse], [2, AdaugaBani], [3, About]];
export const pageMap = new Map(pageArr);

Utils.changePage(0);
