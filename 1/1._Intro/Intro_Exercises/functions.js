var sum = addition(2, 5);
console.log(sum);

function addition(a, b) {
  return a + b;
}

//hoisting
test = 1;
var test;
console.log(test);

var sum = addition(2, 5);
console.log(sum);

for (let i = 0; i < 10; i++) {
  console.log(i);
  setTimeout(function() {
    console.log("The number is " + i);
  }, 1000);
}

// const example = "this is how you write a const";
// console.log(example);

// function pokeMe() {
//   console.log("Meow");
// }

// function approachSomeone(someoneToPoke) {
//   console.log("tip tap tip tap");
//   someoneToPoke();
// }

// approachSomeone(pokeMe);

//2 types of syntaxes
//first - plain function
// const introduce = function(name) {
//   console.log("Hello my name is", name);
// };

// const prepareIntroduction = function(introducerFunction, name) {
//   console.log("Mhmhmhhmh");
//   introducerFunction(name);
// };

// prepareIntroduction(introduce, "Cristina");

//second - arrow function
// const introduce = name => {
//   console.log("Hello my name is", name);
// };

// const prepareIntroduction = (introducerFunction, name) => {
//   console.log("Mhmhmhhmh");
//   introducerFunction(name);
// };

// prepareIntroduction(introduce, "Cristina");



const me = {
    hobby: "climbing"
}

const aboutMe = (me) => {
    console.log("My hobby is", me.hobby)
}

// aboutMe(me)



const callLater = {
    toCall: () => {
        console.log("This is a function inside of an json object")
    }
}


const callLater2 = {
    toCall: aboutMe //just a reference to the aboutMe function
}


callLater.toCall()
callLater2.toCall(me)


