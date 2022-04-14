import {Header, updateHeader} from "../Components/Header.js"
import * as Utils from "../Utils/SwitchPageUtils.js";


var isLogged = false;
var loggedInUser = '';
var modalShowing = false;

//define the modal
let login=`
<div id="login">
    <div>
        <form name="login" id="loginForm" method="post">
            <div>
                <p><label for="luser">User:</label></p>
                <p><input type="email" name="email" id="email" placeholder="email"></p>
                <p><label for="lpassword">Pass:</label> </p>
                <p><input type="password" name="password" id="password" placeholder="password"></p>
                <p><input type="submit"></p>
            </div>
        </form>
    </div>
</div>
`;

let modal = document.createElement('div');
modal.setAttribute("id","loginModal");
modal.innerHTML=login;

export function showModal() {
    modalShowing = !modalShowing;
    if(modalShowing == true){
        document.getElementById("root").appendChild(modal);
        document.getElementById("loginModal").addEventListener('click',function(event){
            if(event.target == document.getElementById("loginModal")){
                showModal();
            }
            $(document).ready(function () {
                $("#loginModal").submit(function (event) {
                  var formData = {
                    email: $("#email").val(),
                    password: $("#password").val(),
                  };
                  $.ajax({
                    type: "POST",
                    url: "/web/serverL.py",
                    data: formData,
                    dataType: "json",
                    encode: true,
                    success: function(data){
                        isLogged=true;
                        if(document.getElementsByClassName('account-buttons')[0] !== undefined) document.getElementsByClassName('account-buttons')[0].remove();
                        loggedInUser = data.user;
                        updateHeader()
                        Utils.changePage(0);
                    },
                    error: function(){
                        console.log("failed login!");
                    },
                  }).done(function () {
                    console.log("we did it bruh");
                  });
                  event.preventDefault();
                });
              });
        });
    }    
    else
        document.getElementById("root").removeChild(modal);
}

export {login, isLogged, modalShowing, loggedInUser};