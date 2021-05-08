const {client} = require("./connect");
const {game} = require('../app');

const getData = async () => {
    try {
        client.connect();
        const database = client.db('game');
        const words = database.collection('pendu')

        letter_range = "abdefghijlmnopqrstv"
        const rand = Math.floor(Math.random()*(letter_range.length - 1));
        const letter = letter_range.charAt(rand)
        console.log(letter)
        const query = {theme :'law', word : new RegExp("^"+letter, "i")} //PROCESS REGEXP with variable
        return roster = await words.find(query)
        
    }catch(e){
        console.log(e)
        client.close();
    }
}

const getWords = async() => {

    const myWords =  getData().then(async(res) => {
        let it = 0;
        let words = [];
        let count = await res.count()
        //console.log(count)
        while((it < 8 || it <  count - 1) && res.hasNext()){
             const {word} = await res.next();
             //console.log(it)
            // console.log(word)
             words.push(word)
             it++;
        }
        //console.log(words)
        return words;
    })
    .catch((e)=>{
        console.log(e)
    })
    //console.log(myWords)
    return myWords;
}





 getWords().then((res)=>{

    let words = res;
    game(words);
})


