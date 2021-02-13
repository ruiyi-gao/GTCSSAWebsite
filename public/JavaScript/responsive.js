var prev_width = window.innerWidth;

function responsive_layout(firstLoad) {
    var table = document.getElementById("depart_table");
    var frames = document.getElementsByClassName("img_container");
    if (window.innerWidth < 750  && (prev_width >= 750 || firstLoad)) {
        var table_html = "";
        for (var i = 0; i < frames.length; i++) {
            table_html += "<tr><td><div class='img_container' style='width:40%'>" + frames[i].innerHTML + "</div>";
            i++;
            if (i == frames.length) {
                table_html += "</td></tr>"
                break;
            }
            table_html += "<div class='space_container' style='width:20%'></div>";
            table_html += "<div class='img_container' style='width:40%'>" + frames[i].innerHTML + "</div>";
            table_html += "</td></tr>"
        }
        table.innerHTML = table_html;
    } else if ((window.innerWidth < 1000 && (prev_width >= 1000 || firstLoad)) || window.innerWidth >= 750  && prev_width < 750) {
        var table_html = "";
        for (var i = 0; i < frames.length; i++) {
            table_html += "<tr><td><div class='img_container' style='width:20%'>" + frames[i].innerHTML + "</div>";
            i++;
            if (i == frames.length) {
                table_html += "</td></tr>"
                break;
            }
            table_html += "<div class='space_container' style='width:20%'></div>";
            table_html += "<div class='img_container' style='width:20%'>" + frames[i].innerHTML + "</div>";
            i++;
            if (i == frames.length) {
                table_html += "</td></tr>"
                break;
            }
            table_html += "<div class='space_container' style='width:20%'></div>";
            table_html += "<div class='img_container' style='width:20%'>" + frames[i].innerHTML + "</div>";
            table_html += "</td></tr>"
        }
        table.innerHTML = table_html;
    } else if (window.innerWidth >= 1000 && prev_width < 1000) {
        var table_html = "";
        for (var i = 0; i < frames.length; i++) {
            table_html += "<tr><td><div class='img_container' style='width:14.285%'>" + frames[i].innerHTML + "</div>";
            i++;
            if (i == frames.length) {
                table_html += "</td></tr>"
                break;
            }
            table_html += "<div class='space_container' style='width:14.285%'></div>";
            table_html += "<div class='img_container' style='width:14.285%'>" + frames[i].innerHTML + "</div>";
            i++;
            if (i == frames.length) {
                table_html += "</td></tr>"
                break;
            }
            table_html += "<div class='space_container' style='width:14.285%'></div>";
            table_html += "<div class='img_container' style='width:14.285%'>" + frames[i].innerHTML + "</div>";
            i++;
            if (i == frames.length) {
                table_html += "</td></tr>"
                break;
            }
            table_html += "<div class='space_container' style='width:14.285%'></div>";
            table_html += "<div class='img_container' style='width:14.285%'>" + frames[i].innerHTML + "</div>";
            table_html += "</td></tr>"
        }
        table.innerHTML = table_html;
    }
    prev_width = window.innerWidth;
}