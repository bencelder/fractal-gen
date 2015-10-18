function initialize(){
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");

    keys = [];

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

            for (var k = 0; k < 50; k++)
                z = P_next(z, b);

            if (c_mag(z) < 2.)
                ctx.fillRect(i, j, 1, 1);

        }
    }
}

function Complex(x, y){
    this.re = x;
    this.im = y;
}

function c_print(c){
    //alert(c.re + " + i" + c.im);
    console.log(c.re + " + i" + c.im);
}

function c_add(a, b){
    var x = a.re + b.re;
    var y = a.im + b.im;

    var c = new Complex(x, y);
    return c;
}

function c_mult(a, b){
    var x = a.re * b.re - a.im * b.im;
    var y = a.re * b.im + a.im * b.re;

    var c = new Complex(x, y);
    return c;
}

function c_square(a){
    var b = c_mult(a, a);
    return b;
}

function c_mag(a){
    var out = Math.sqrt(a.re*a.re + a.im * a.im);
    return out;
}


function keyDown(e){
    kc = e.keyCode;
    //alert(e.keyCode);
    keys[kc] = true;
}

function keyUp(e){
    kc = e.keyCode;
    keys[e.keyCode] = false;
}

function mouseMove(e){
    cursor.x = e.clientX - c.offsetLeft;
    cursor.y = e.clientY - c.offsetTop;
}
