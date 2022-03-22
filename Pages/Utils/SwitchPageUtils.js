import  {pageMap}  from "../../render.js";
export function changePage(number){ 
    var root = document.getElementById("root");
    root.innerHTML = pageMap.get(number);
}