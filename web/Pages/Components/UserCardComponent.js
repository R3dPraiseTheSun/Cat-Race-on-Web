import * as LoginFunc from "./Login.js";
import { GetBalance } from "../Financiar/Financiar.js";

const resourcePath = "./resources/";

export const buildUserCard = function(){
    const userLogged = LoginFunc.isLogged;
    const username = LoginFunc.loggedInUser;
    const balance = GetBalance();
    const userCardData = function(){
        return (`
            <p>Username: ${username}</p>
            <p>Balance: ${balance}<img id = "chips" src="${resourcePath}chips.png"/></p>
        `);
    }
    if(userLogged){
        let userCardNode = document.createElement("div")
        userCardNode.setAttribute("id",'userCard')
        userCardNode.innerHTML=userCardData();
        document.getElementById('root').appendChild(userCardNode);
    }
}