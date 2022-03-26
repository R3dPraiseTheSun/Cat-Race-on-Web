var modalShowing = false;

//define the modal
let register=`
<div id="register">
    <div>
        <h2>Register your own (personal) account purrr!</h2>
        <form name="register" id="registerForm" method="post">
            <div>
                <p><label for="user">User:</label></p>
                <p><input type="text" name="user" id="user" placeholder="username"></p>
                <p><label for="email">Email:</label></p>
                <p><input type="email" name="email" id="email" placeholder="email"></p>
                <p><label for="password">Password:</label></p>
                <p><input type="password" name="password" id="password" placeholder="password"></p>
                <p><input type="submit" value="Send"></p>
            </div>
        </form>
    </div>
</div>
`;

let modal = document.createElement('div');
modal.setAttribute("id","registerModal");
modal.innerHTML=register;

export function showModal() {
    modalShowing = !modalShowing;
    if(modalShowing == true){
        document.getElementById("root").appendChild(modal);
        document.getElementById("registerModal").addEventListener('click',function(event){
            if(event.target == document.getElementById("registerModal")){
                showModal();
            }
        });
        $(document).ready(function () {
            $("#registerForm").submit(function (event) {
              var formData = {
                user: $("#user").val(),
                email: $("#email").val(),
                password: $("#password").val(),
              };
              $.ajax({
                type: "POST",
                url: "/web/serverP.py",
                data: formData,
                dataType: "json",
                encode: true,
              }).done(function (data) {
                console.log(data);
              });
              event.preventDefault();
            });
          });
    }    
    else
        document.getElementById("root").removeChild(modal);
}
export {register, modalShowing};