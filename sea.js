function initialize(){
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    c.style.cursor = "none";

    //cursor = new Cursor(0, 0);

    paused = -1; // -1 = not paused, 1 = paused
    keys = [];

    x_min = -2.;
    x_max = 2.;
    y_min = -2.;
    y_max = 2.;

    dx = (y_max - y_min) / c.height;

    //dy = (y_max - y_min)/c.height;

    /*
    var z = new Complex(0, 0);
    var c = new Complex(0.25, 0.5);

    for (var i = 0; i < 10; i++){
        z = P_next(z, c);
        c_print( z );
    }
    */

    draw_fract();

    //music.play();

    //lastframe = Date.now();
    //game_loop = setInterval( function(){loop()}, 1);
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

            for (var k = 0; k < 10; k++)
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

function diverges(x, y){
    var c = new Complex(x, y);

    var n = steps_to_diverge(c);

    if (n == -1.)
        return false;
    return true;

}

function steps_to_diverge(c){
    var z = new Complex(0, 0);

    for (var n = 0; n < 100; n++){
        if (c_mag(z) >= 2.)
            return n;

        // z -> z^2 + c
        z = c_square(z);
        a = c_add(z, c);
    }
    return -1.;
}

function loop(){
    now = Date.now();
    dt = (now - lastframe)/1000;
    lastframe = now;

    // update game objects

    // check for destruction

    // draw everything
    //draw();

}

function draw(){
    ctx.fillStyle = "#002447";
    ctx.fillRect(0, 0, c.width, c.height);

    cursor.draw();
    player.draw();

    for (var i = 0; i < bullets.length; i++)
        bullets[i].draw();

    for (var i = 0; i < patrols.length; i++)
        patrols[i].draw();
}


function keyDown(e){
    //alert(e.keyCode);
    kc = e.keyCode;
    keys[kc] = true;

    if (kc == 80)
        paused *= -1;
}

function keyUp(e){
    keys[e.keyCode] = false;
}

function mouseMove(e){
    cursor.x = e.clientX - c.offsetLeft;
    cursor.y = e.clientY - c.offsetTop;
}
