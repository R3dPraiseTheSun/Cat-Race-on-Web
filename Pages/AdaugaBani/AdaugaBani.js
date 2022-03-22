function loginButton(){
    var loginModal = document.getElementById("loginForm").parentNode.parentNode.parentNode;
    console.log(loginModal.style.display);
    if(loginModal.style.display=='none')
        loginModal.style.display = 'inline-block';
    else
        loginModal.style.display = 'none';
}

function homePage(){
    var article = document.getElementsByTagName("article")[0];
    article.innerHTML = `
    <div>
        <h1>Titlu generat din js</h1>
        <p>Generat de <b>js</b>!</p>
    </div>
    `;
}