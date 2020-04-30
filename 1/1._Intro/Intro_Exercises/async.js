//when to use async:
//open a file, read/write, make a request online, interact with a db

//Promises are syntactical sugar for callbacks

// new Promise((resolve, reject) => {
//     try{
//     setTimeout(() => {
//         resolve("Everything went well")
//     }, 4000);
// } catch{
//     reject("Something went wrong")
// }
// }).then(message => console.log(message)) //if everything went well
// .catch(errorMessage => console.log(errorMessage))

//Async/await are syntactical sugar for Promises

function myPromise() {
 return new Promise((resolve, reject) => {
     setTimeout(()=> {
         resolve("The promise is done")
     }, 5000)
 })

}

async function callMyPromise(){
    // myPromise().then(message => {
    //     console.log(message)
    // })

    const message = await myPromise()
    console.log(message)

}

callMyPromise()

//another way of writing it
const arrowFunction = async() => {
    const message = await myPromise()
    console.log(message)
}
//pending
//fulfilled
