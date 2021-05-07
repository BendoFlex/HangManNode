
const game = () => {

//DB game... collection> pendu 
let words =[
    {"word" :"brelingue"},
    {"word" : "stipuler"},
    {"word" :"baltringue"},
    {"word" : "complotiste"},
    {"word" : "freluquet"},
    {"word" : "intrinseque"},
    {"word" : "bandouliere"}
]

let rand = Math.floor(Math.random()*7);
let chosenWord = words[rand].word;
let typedChar = []
let status = "Progress"
let found = false;
let counter = 0;
let startFlag = true;
let MAX_COUNT = chosenWord.length + 3;

if(startFlag){
    console.log("------------->")
    console.log("Welcome to Guessing Word Game by BendoFlex ! ")
    console.log("--------------------->")
    console.log("please type a letter\n")
}

process.stdin.on("data" ,(data) => {
    const parsed = data.toString().trim();

    if(found || counter > MAX_COUNT){
        if(found){
            status = "WINNER";
            console.log("bien joué !")
        }
        if(counter > MAX_COUNT){
            status = "LOSER";
            console.log("c'était "+chosenWord)
        }
        console.log("STATUS : "+status)
        process.stdin.pause()
    }
    else {
        console.log("STATUS : "+status)
        console.log("type a word :)")
        counter ++;

        if(validateChar(parsed) === true){//entrer un mot
            console.log("vous avez entré "+parsed)
            if(typedChar.indexOf(parsed) == -1){
                typedChar.push(parsed)
            }
        }
        else{
            console.log("veuillez entrer une lettre")
        }

        
        const masked = maskWord(chosenWord,typedChar); //masked Word generated

        console.log("Mot "+masked)

        if(masked == chosenWord){
            found = true;
        }
    
        //console.log(typedChar)
    }
   
})


function maskWord (word, typed) {
    let splitted = word.split("");
    let masked = []
    for(letter of splitted){
        if(typed.indexOf(letter) == -1){
            masked.push("*");
        }
        else {
            masked.push(letter)
        }
        
    }
    return masked.join("")
}

function validateChar (word) {//OK
    if(word.length == 1 && word.match(/[a-z]/i) ){
        return true;
    }
    return false;
}

function isEnd (word) {
    if(word.match(/^(?!*)$/)){
        return true;
    }
    return false;
}

}

game();