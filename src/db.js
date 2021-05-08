const {client} = require("./connect")

const run = async () => {
    try {
        client.connect();
        const database = client.db('game');
        const words = database.collection('pendu')

        return roster = await words.find({})

    }catch(e){
        console.log(e)
        client.close();
    }
}

run().then(async(res) => {
    //let it = 0;
    while(res.hasNext()){
         const {word} = await res.next();
         console.log(word)
         //it++;
    }
})
.catch((e)=>{
    console.log(e)
})