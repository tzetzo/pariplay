(function(){
    //Connect the button in the html with the _init_ function.
    var btn = document.getElementById('start');
    btn.addEventListener("click",function(){
        document.getElementById("game").style.display = "none";
        Game.setVars();
        Game.init();
    });
})();