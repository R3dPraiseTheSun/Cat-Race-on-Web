export const finishState = function getState(state){
    return(
        `<div>YOU `+state+`</div>`
    );
}

export const showModal = function modalBuilder(finish){
    let modal = document.createElement('div');
    modal.setAttribute("id","finish");
    modal.innerHTML=finish;
    document.getElementById("root").appendChild(modal);
}