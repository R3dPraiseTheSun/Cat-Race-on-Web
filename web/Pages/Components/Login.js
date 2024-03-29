import {Header, updateHeader} from "../Components/Header.js";
import {Navbar, updateNav} from "../Components/Navbar.js";
import * as Utils from "../Utils/SwitchPageUtils.js";

var isLogged = false;
var loggedInUser = '';
var UserId = '';
var admin = 0;
var modalShowing = false;

export const logStatus = function(value){
    isLogged=value;
    updateHeader();
    updateNav();
}

export const adminSetStatus = function(value){
    admin=value;
}
export const getAdminStatus = function(){
    return admin
}
export const loggedInUserStatus = function(value){
    loggedInUser=value;
}
export const GetLoggedInUser = function(){
    return loggedInUser;
}
export const UserIdStatus = function(value){
    UserId=value;
}
export const GetUserId = function(){
    return UserId;
}

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
                        //console.log(data);
                        isLogged=true;
                        loggedInUser = data.user;
                        UserId = data.id;
                        admin=data.admin;
                        updateHeader();
                        updateNav();
                        Utils.changePage(0);
                        if(!document.cookie.includes('sessionID'))
                            document.cookie = "sessionID="+data.sessionID+":"+data.id+";";
                    },
                    error: function(){
                        //console.log("DEBUG:failed login!");
                    },
                  }).done(function() {
                    //console.log("DEBUG:login done");
                  });
                  event.preventDefault();
                });
              });
        });
    }    
    else
        document.getElementById("root").removeChild(modal);
}

export {login, isLogged, modalShowing, loggedInUser, UserId};