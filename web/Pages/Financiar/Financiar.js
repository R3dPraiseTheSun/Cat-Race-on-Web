import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"
import {UserId} from "../Components/Login.js"

const resourcePath = "./resources/";

window.AddMoney = AddMoney;

var Article;
var balance = 0;
function UpdateFinanciarArticle(){
    Article =`<article>
        <div id=financiar>
        <h1>Balanta</h1>
        <div><p>Disponibil: ${balance}<img id = "chips" src="${resourcePath}chips.png "/></p></div>
        </div>
        <div id=financiar>
        <h1>Adauga Bani</h1>
        <div><label>Introdu suma <input id="addMoneyInput" type="number" min="0"/><button onClick="window.AddMoney()">ADD</button><img id = "cash" src="${resourcePath}cash.png"/></label></div>
        </div>
        <div id=financiar>
        <h1>Istoric curse</h1>
        </div>
    </article>
    `};

function AddMoney(){
    let amount = document.getElementById("addMoneyInput").value;
    $.ajax({
        type: "POST",
        url: "/web/serverAddBalance.py",
        data:{
            UserId,
            amount,
        },
        success:function(){
            console.log("DEBUG:BALANCEADD SUCCESS");
            window.changePage(2);
        }
    }).done(() => {
        console.log("DEBUG:BALANCEADD");
    });
};

function getMoney(){
    $.ajax({
        type: "POST",
        url: "/web/serverGetBalance.py",
        data:{
            UserId,
        },
        success: function(data){
            balance=data.balance;
            UpdateFinanciarArticle(balance);
            console.log("DEBUG:balance success!", balance);
        },
        error: function(){
            console.log("DEBUG:failed balance!");
        },
    }).done(() => {
        console.log("DEBUG:BALANCE");
    });
}

var adaugabaniHTML = '';
export default function buildMoney(){
    getMoney();
    adaugabaniHTML=
    Header +
    Navbar +
    Article +
    Footer;
    return adaugabaniHTML;
}

buildMoney();
