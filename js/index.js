(function () {
    const R = 90;
    const ORING = 90;
    const RH = 15; 
    const PI = 3.1415926;
    var dragContainer = document.getElementById('drag_container');
    var ox = dragContainer.getBoundingClientRect().left + ORING;
    var oy = dragContainer.getBoundingClientRect().top + ORING;
    var handle = document.getElementById('handle');
    var dragCircle = document.getElementById('drag_circle');
    handle.style.left = ORING + R - RH + 'px';
    handle.style.top = ORING - RH + 'px';
    dragCircle.style.top = 0 + 'px';
    handle.onmousedown = function(ev) {
        ev.stopPropagation();
        dragContainer.onmousemove = function(ev) {
            oy = parseInt(dragCircle.style.top) + dragContainer.getBoundingClientRect().top + R;
            var x = ev.clientX;
            var y = ev.clientY;
            var dx = x - ox;
            var dy = y - oy;
            var angle = Math.atan(dy / dx);
            var flag = 1;
            if(dx < 0) angle += PI;
            if(dx > 0 && dy < 0) angle += 2 * PI;
            console.log(parseInt(angle / 2 / PI * 360) + '°');
            handle.style.left = ORING + R * Math.cos(angle) * flag - RH + 'px';
            handle.style.top = ORING + R * Math.sin(angle) * flag - RH + 'px';
        }
        dragContainer.onmouseup = function() {
            dragContainer.onmousemove = null;
        }
    }
    var maxY = 500 - 2 * ORING;
    dragCircle.onmousedown = function(ev) {
        var preY = ev.clientY;
        dragCircle.onmousemove = function(ev) {
            var y = ev.clientY;
            var dy = y - preY;
            var top = parseInt(dragCircle.style.top) + dy;
            if(top < 0) top = 0;
            if(top > maxY ) top = maxY;
            dragCircle.style.top = top + 'px';
            preY = y;
        }
        dragCircle.onmouseup = function() {
            dragCircle.onmousemove = null;
            dragCircle.onmouseup = null;
        }

    }
})();