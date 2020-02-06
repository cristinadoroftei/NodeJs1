//ex 3 - add numbers from string to float
var numberOne = "1.10";
var numberTwo = "2.30";
var sum = parseFloat(numberOne) + parseFloat(numberTwo);
console.log(sum);


//ex 5 - decimals and average
var one = 10;
var two = 45;
var three = 98;

var sum = one + two + three;
var average = (sum / 3).toFixed(5);
console.log(average);


// Exercise 6 - Get the character by index

var letters = "abc";
// Get me the character "c"
var findC = letters.charAt(2);
var findC2 = letters[2]
var findC3 = letters.substring(2)
console.log(findC);


// --------------------------------------
// Exercise 7 - Replace

var fact = "You are learning javascript!";

// capitalize the J in Javascript

var newFact = fact.replace("j", "J");
console.log(newFact);

console.log(fact.indexOf("j"))
// --------------------------------------


