var prev_width = window.innerWidth;

function change_layout() {
    if (window.innerWidth < 700 && prev_width >= 700) {
        var containers = document.getElementsByClassName("intro_container");
        var intros = document.getElementsByClassName("intro");
        var length = containers.length;
        for (var i = length - 1; i >= 0; i--) {
            containers[i].className = "intro_container_small_screen";
            intros[i].className = "intro_small_screen";
            
        }
    } else if (window.innerWidth > 700 && prev_width <= 700){
        var containers = document.getElementsByClassName("intro_container_small_screen");
        var intros = document.getElementsByClassName("intro_small_screen");
        var length = containers.length;
        for (var i = length - 1; i >= 0; i--) {
            containers[i].className = "intro_container";
            intros[i].className = "intro";
        }
    }
    prev_width = window.innerWidth;
}