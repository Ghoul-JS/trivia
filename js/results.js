
printRes();

function printRes(){

    const val1 = JSON.parse(localStorage.getItem("buenas"));
    const val2 = JSON.parse(localStorage.getItem("malas"));

    document.getElementById("acertadas").textContent = val1;
    document.getElementById("erradas").textContent = val2;
}

function newTry(){
    window.location.href = '/index.html';
    localStorage.clear();
}