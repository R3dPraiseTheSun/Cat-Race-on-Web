var isLogged = false;
var modalShowing = false;

//define the modal
let login=`
<div id="login">
    <div>
        <h2>Login with you own (personal) account purrr!</h2>
        <form>
            <div id="loginForm">
                <label for="user">User:</label>
                <input type="text" name="user" placeholder="username">
                <label for="password">Pass:</label>
                <input type="password" name="password" placeholder="password">
                <input type="submit" value="Send">
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
        });
    }    
    else
        document.getElementById("root").removeChild(modal);
}
export {login as loginModal, isLogged, modalShowing};