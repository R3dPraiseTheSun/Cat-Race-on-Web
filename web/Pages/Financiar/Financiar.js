import {Navbar} from "../Components/Navbar.js"
import {Header} from "../Components/Header.js"
import {Footer} from "../Components/Footer.js"
import {UserId} from "../Components/Login.js"

import * as LoginFunc from "../Components/Login.js"

const resourcePath = "./resources/";

window.AddMoney = AddMoney;

var balance = 0;

export const GetBalance = function(){
    getMoney();
    return balance;
}

const FinanciarData = function (){
    getMoney();
    return(`
        <article>
            <div id=financiar>
                <h1>Balanta</h1>
                <div><p>Disponibil:${balance}<img id = "chips" src="${resourcePath}chips.png"/></p></div>
            </div>
            <div id=financiar>
                <h1>Adauga Bani</h1>
                <div><label>Introdu suma <input id="addMoneyInput" type="number" min="0"/><button onClick="window.AddMoney()">ADD</button><img id = "cash" src="${resourcePath}cash.png"/></label></div>
            </div>
            <div id=financiar>
                <h1>Istoric Cont:</h1>
                <div id="historyTable">
                    <table>
                        <tr>
                            <th>Event</th>
                            <th>Cat Name</th>
                            <th>Bettet Amount</th>
                            <th>Bet Date</th>
                            <th>Status</th>
                        </tr>
                        ${getTableData()}
                    </table>
                </div>
            </div>
        </article>
    `);
}
function AddMoney(){
    let amount = document.getElementById("addMoneyInput").value; 
    $.ajax({
        type: "POST",
        url: "/web/serverAddBalance.py",
        async:false,
        data:{
            UserId,
            amount,
        },
        success:function(){
            //console.log("DEBUG:BALANCEADD SUCCESS");
            balance += parseInt(amount);
            window.changePage(2);
        }
    }).done(() => {
        //console.log("DEBUG:BALANCEADD");
    });
}

function getMoney(){
    if(LoginFunc.isLogged)
    {
        $.ajax({
            type: "POST",
            url: "/web/serverGetBalance.py",
            async:false,
            data:{
                UserId,
            },
            success: function(data){
                balance=data.balance;
                //console.log("DEBUG:balance success!", balance);
            },
            error: function(){
                //console.log("DEBUG:failed balance!");
            },
        }).done(() => {
            //console.log("DEBUG:BALANCE");
        });
    }
}
function getTableData(){
    let tableData = [];
    var tableDataHTML = ``;
    if(LoginFunc.isLogged)
    {
        $.ajax({
            type: "POST",
            url: "/web/serverGetTableData.py",
            async:false,
            data:{
                UserId,
            },
            success: function(data){
                tableData = data.tableData;
                //console.log("DEBUG:balance success!", balance);
            },
            error: function(){
                //console.log("DEBUG:failed balance!");
            },
        }).done(() => {
            //console.log("DEBUG:BALANCE");
        });
        for(let tableRow of tableData){
            tableDataHTML += `
            <tr>
                <td>${tableRow[0]}</td>
                <td>${tableRow[1]}</td>
                <td>${tableRow[2]}</td>
                <td>${tableRow[3]} - ${tableRow[4]}</td>
                <td>/*TO DO*/</td>
            </tr>
            `
        }
        return tableDataHTML;
    }
}

var adaugabaniHTML = '';
export default function buildMoney(){
    adaugabaniHTML=
    Header +
    Navbar +
    FinanciarData() +
    Footer;
    return adaugabaniHTML;
}

buildMoney();
