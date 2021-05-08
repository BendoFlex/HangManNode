const {client} = require("./connect")

const run = async () => {
    try {
        client.connect();
        const database = client.db('game');
        const words = database.collection('pendu')

        letter_range = "abcdefghijklmnopqrstuv"
        const rand = Math.floor(Math.random()*(letter_range.length - 1));
        const letter = letter_range.charAt(rand)
        console.log(letter)
        const query = {theme :'law', word : new RegExp("^"+letter, "i")}
        return roster = await words.find(query).limit(10)

    }catch(e){
        console.log(e)
        client.close();
    }
}

run().then(async(res) => {
    let it = 0;
    while(it < 9 && res.hasNext()){
         const {word} = await res.next();
         console.log(word)
         it++;
    }
})
.catch((e)=>{
    console.log(e)
})