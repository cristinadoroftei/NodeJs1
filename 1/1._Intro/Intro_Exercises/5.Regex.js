//Test shows if the pattern appears in the string
const myReg = /Hello/i
const result = myReg.test("hello world")

//console.log(result) //true, but for "hello world" is false

//Pipe
const petRegEx = /alpaca|low|sheep/
const petString = "Anders has an alpaca"
const result1 = petRegEx.test(petString)
//console.log(result1)

//Match
const extractString = "Extract the word from this string"
const wordRegex = /word/
//console.log(extractString.match(wordRegex))

console.log(extractString.match(/string/))

const myString = "I love lemons, but besides lemons I love oranges too "
const myWordRegex = /love/
//console.log(myString.match(myWordRegex))

//The 6 flag
//console.log("Repeat, repeat, repeat".match(/Repeat/g)) //we expect it to match globally

const twinkleStarSong = "Twinkle, twinkle, little star"
//console.log(twinkleStarSong.match(/Twinkle/gi))

//Wildcard
const hunStr = "That's humbug!"
const hug = "I need a hug. "
const huRegex = /hu./
//console.log(hunStr.match(huRegex))
//console.log(hug.match(huRegex))

const funString = "He is a fun un"
//console.log(funString.match(/.un/g))


//Wildcard
//console.log("I foung big bug in my bag".match(/b[aiu]g/g))

//Exercise: find all the vowels above!
//console.log("I foung big bug in my bag".match(/[aeiou]/g))

//Negated character sets
//console.log("I foung big bug in my bag".match(/[^aeiou]/g))

//Range
//console.log("123something678".match(/[0-9]/g))
console.log("123sometHing678".match(/[a-z]/gi))
