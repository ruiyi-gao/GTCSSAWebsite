var index = 0;

function display(i) {
    clearInterval(interval);
    interval = setInterval(display_next, 5000);
    var containers = document.getElementsByClassName("carousel_container");
    var dots = document.getElementsByClassName("carousel_dot");

    if (i < 0) {
        i = 0;
    } else if (i >= containers.length) {
        i = 0;
    }
    containers[index].style.display = "none";
    dots[index].className = dots[i].className.replace(" active", "");
    index = i;
    containers[index].style.display = "block";
    dots[index].className += " active";
}

function display_next() {
    display(index+1);
}

var interval = setInterval(display_next, 5000);