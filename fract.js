function initialize(){
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");

    iterations = 50;
    res = 1;

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

// takes in x1 < x < x2 and returns a
// linear mapping to y
// y1 < y < y2
function linearMap(x, x1, x2, y1, y2){
    var a = (y2 - y1) / (x2 - x1);
    var y = y1 + a * (x - x1);
    return y;
}

function draw_fract(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#000000";
    var alpha;
    for (var i = 0; i < c.width; i+=res){
        for (var j = 0; j < c.height; j+=res){
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
            alpha = linearMap(k, 0, iterations, 0.3, 0.8);
            if (k == iterations)
                alpha = 1.;
            ctx.fillStyle = "rgba( 0, 0, 0, " + alpha
            ctx.fillRect(i, j, res, res);
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
