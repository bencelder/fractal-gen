function Complex(x, y){
    this.re = x;
    this.im = y;
}

function c_print(c){
    //alert(c.re + " + i" + c.im);
    console.log(c.re + " + i" + c.im);
}

function c_equals(a, b){
    if (a.re == b.re && a.im == b.im)
        return true;
    return false;
}

function c_copy(a){
    b = new Complex(a.re, a.im);
    return b;
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
