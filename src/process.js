

const readline = require("readline")
const {getWords} = require('./db');
const {game} = require('../app')

const readStream = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const getInfo = (value) => {
    let question = "votre "+value;
    if(value == "theme"){
            question ="choissisez un thème : A=> Droit , B => Nourriture " ;
    } 
    return  new Promise ((res,rej) => {
        readStream.question(question, (answer) => res(answer))
         
    })
}

readStream.on('end' , () => console.log("end"))

const processExample = async() => {

    let flagStart = true;

    if(flagStart){
        let questions = ["nom","theme"];
        let dataGlobal= []
        for(let q of questions) {
            let myVar = await getInfo(q).then(function(res) {
            return res;
        });
        dataGlobal.push(myVar);
       // console.log("vous avez entré "+ myVar);
        }
    
        console.log(dataGlobal)
        flagStart = false;
    }
    
    getWords().then((res)=>{

        let words = res;
        game(words);
    })
    //readStream.close()
}


//const myName = getName().then(res =>res).then(readStream.close())
processExample()




//type check
 //interface