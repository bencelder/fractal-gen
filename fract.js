function initialize(){
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");

    iterations = 10;
    res = 10;

    keys = [];
    mousePressed = false;
    mdownx = 0;
    mdowny = 0;

    x_min = -2.;
    x_max = 2.;
    y_min = -2.;
    y_max = 2.;

    dx = (y_max - y_min) / c.height;

    draw_fract();
}

function P_next(z, c){
    var a = c_square(z);
    a = c_add(a, c);
    return a;
}

function draw_fract(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#000000";
    for (var i = 0; i < c.width; i+=1){
        for (var j = 0; j < c.height; j+=1){
            x = x_min + i * dx;
            y = y_min + j * dx;

            var z = new Complex(0, 0);
            var b = new Complex(x, y);

            for (var k = 0; k < iterations; k++){
                z = P_next(z, b);
                if (c_mag(z) >= 2)
                    break;
            }

            // k = iterations => black
            // k = 0 => white

            if (c_mag(z) < 2.)
                ctx.fillRect(i, j, 1, 1);

        }
    }
}


function keyDown(e){
    kc = e.keyCode;
    //alert(e.keyCode);
    console.log(e.keyCode);


    // z
    if (kc == 90){
        width = c.width * dx;
        height = c.height * dx;

        x_center = x_min + width / 2.;
        y_center = y_min + height / 2.;

        x_min = x_center - width  / 4.;
        y_min = y_center - height / 4.;

        dx = dx / 2.;

        draw_fract();

    }

    // i
    if (kc == 73){
        iterations *= 2;
        draw_fract();
    }

    // k
    if (kc == 75){
        iterations /= 2;
        draw_fract();
    }
    

    keys[kc] = true;
}

function keyUp(e){
    kc = e.keyCode;
    keys[e.keyCode] = false;
}

function mouseMove(e){
    if (mousePressed){
        x = e.clientX - c.offsetLeft;
        y = e.clientY - c.offsetTop;

        delta_i = x - mdownx;
        delta_j = y - mdowny;

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.putImageData(imageData, delta_i, delta_j);

        deltax = (x - mdownx)*dx;
        deltay = (y - mdowny)*dx;
    }
}

function mouseDown(e){
    mdownx = e.clientX - c.offsetLeft;
    mdowny = e.clientY - c.offsetTop;

    imageData = ctx.getImageData(0, 0, c.width, c.height);

    mousePressed = true;
}

function mouseUp(e){
    mousePressed = false;
    x_min -= deltax;
    y_min -= deltay;
    draw_fract();
}
