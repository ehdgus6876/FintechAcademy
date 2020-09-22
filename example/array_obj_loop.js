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

var car3 = {
    name : "PORSCHE",
    ph : "500ph",
    start : function () {
        console.log("engine is starting");
    },
    stop : function () {
        console.log("engine is stopped");
    }
};

var cars = [car, car2, car3];

// #work 3 자동차 배열을 순회하여 이름이 smart 인 자동차 찾으면 "find" 라고 출력하고 마력(ph) 출력하기

for(var i=0;i<cars.length;i++){
    if(cars[i].name == "PORSCHE"){
        console.log("find!");
        console.log(cars[i].ph);
    }
}

//es6
cars.map((car) => {
    if(car.name == "PORSCHE"){
        console.log("find!");
        console.log(car.ph);
    }
});
