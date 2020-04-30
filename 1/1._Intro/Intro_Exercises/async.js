
//when to use async:
//open a file, read/write, make a request online, interact with a db

//Promises are syntactical sugar for callbacks

new Promise((resolve, reject) => {
    try{
    setTimeout(() => {
        resolve("Everything went well")
    }, 4000);
} catch{
    reject("Something went wrong")
}
}).then(message => console.log(message)) //if everything went well
.catch(errorMessage => console.log(errorMessage))


//callback hell


//pending
//fulfilled