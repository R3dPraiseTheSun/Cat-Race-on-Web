function loginButton(){
    var loginModal = document.getElementById("loginForm").parentNode.parentNode.parentNode;
    console.log(loginModal.style.display);
    if(loginModal.style.display=='none')
        loginModal.style.display = 'inline-block';
    else
        loginModal.style.display = 'none';
}