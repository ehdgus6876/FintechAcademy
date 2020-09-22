function multi(p1, p2){
    return p1*p2;
}

// #work1 더하기, 나누기, 빼기
const plusfunc = (p1,p2) => {
    return p1 + p2;
};

const dividefunc = (p1,p2) => {
    return p1 / p2;
};

const subfunc = (p1,p2) => {
    return p1 - p2;
};

//es6 문법
const multiful = (p1,p2) => {
 return p1 * p2;
};

const a = 10;
const b = 5 ;

console.log(plusfunc(a,b));
console.log(dividefunc(a,b))
console.log(subfunc(a,b))
console.log(multiful(a,b))
