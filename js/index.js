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
            if(dx < 0) angle += PI;
            if(dx > 0 && dy < 0) angle += 2 * PI;
            console.log(parseInt(angle / 2 / PI * 360) + '°');
            handle.style.left = ORING + R * Math.cos(angle) - RH + 'px';
            handle.style.top = ORING + R * Math.sin(angle) - RH + 'px';
            var rotation = angle / PI / 2 * 360;
            light.style.transform = 'rotate(' + rotation + 'deg)';
            if(rotation < 180) rotation = -rotation;
            if(rotation >= 180) rotation = 360 - rotation;
            $('#rotation').slider('setValue', rotation);
        };
        dragContainer.onmouseup = function() {
            dragContainer.onmousemove = null;
        }
    };
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

    };
    var light = document.getElementById('light');
    light.style.left = ORING - 10 + 'px';
    light.style.top = ORING - 10 + 'px';
    $('#rotation').slider({
        min: -179,
        max: 180,
        value: 0,
        tooltip: 'hide',
        formatter: function (value) {
            $('#rotation_result').val(value);
        }
    }).on('slide', function (slideEvt) {
        var value = $(this)[0].value * -1;
        console.log(value);
        light.style.transform = 'rotate(' + value + 'deg)';
        var angle = value;
        if(angle < 0) angle += 360;
        angle = angle / 360 * 2 *   PI;
        console.log('===========', angle);
        handle.style.left = ORING + R * Math.cos(angle) - RH + 'px';
        handle.style.top = ORING + R * Math.sin(angle) - RH + 'px';
    });
    $('#rotation_result').keyup(function (e) {
        if(e.keyCode === 13) {
            $('#rotation').slider('setValue', $(this).val(), true);
            $(this).blur();
        }

    })
})();