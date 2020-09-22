var car = {
    name : "BMW",
    ph : "500ph",
    start : function () {
        console.log("engine is starting");
    },
    stop : function () {
        console.log("engine is stoped");
    }
};

var car2 = {
    name : "BENZ",
    ph : "300ph",
    start : function () {
        console.log("engine is starting");
    },
    stop : function () {
        console.log("engine is stopped");
    }
};

var cars = [car,car2];

console.log(cars);


// #work2 두번째 요소에 이름을 출력하세요.

console.log(cars[1].name);