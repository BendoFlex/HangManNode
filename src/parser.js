const fs = require('fs')
const readline = require('readline');
const {client} = require('./connect');

var filename = __dirname + '/assets.html';

/* fs.readFile(filename, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
    }
    console.log(data)
  })*/

  /*fs.open(filename, 'r', (err,fd) => {
      console.log(fd)
      fd.read()
      console.log(fd)
  })*/



async function processLineByLine() {
  const fileStream = fs.createReadStream('assets.html', 'utf8');

  const rl = readline.createInterface({//PROCESS INTERFACE
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let list_of_words = []
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const start =  line.indexOf(">");//PROCESS SLICING
    const first =  line.slice(start + 1);
    const end = first.indexOf("<");
    

    const word = String(line.slice(start + 1, start + end + 1));
   
    let parsed = word;
    if(word.indexOf("&eacute;") != -1 ){
        parsed = word.replace(/&eacute;/g ,"e");//PROCESS REPLACE ALL
        
    }
    if(word.indexOf("&ecirc;") != -1){
        parsed = word.replace(/&ecirc;/g ,"e");//PROCESS REPLACE ALL
    }

  
    //console.log(parsed.split(" "))

    if((word != '' && word.split(" ").length == 1) || word.indexOf("Ad") != -1){
        if(word.indexOf("Ad") != -1 && word.split(" ").length > 2){
            let parts = word.split(" ");
            list_of_words.push(parts[0]+" "+parts[1]) //PUSH wanted splitted part
        }
        else{
            list_of_words.push(parsed)
        }
        
    }

  }
  return list_of_words;
}

processLineByLine().then((words) => {
    try{
    client.connect();
   const database = client.db("game");
   const game = database.collection("pendu")

   game.insertOne({word :"legiferer" ,theme :"law"})
       /* for (word of words){
                game.insertOne({word :word ,theme :"law"})
        }*/
   

    }
    catch(e) {
        console.log(e);
        client.close();
    }
}

)


function sanitize (word) { //PROCESS ITERATION PAR CLE, what is an object?
    let refs = {
        "&eacute;" : "é",
        "&ecirc;" : "è"
    }
    let sanitized =""
   
    for(patt of Object.keys(refs)) {
        let pattern = "/"+patt+"/"
        let re = new RegExp(pattern , "g");
        
        if(word.indexOf(pattern)!= -1){
           sanitized = word.replace(/&eacute;/g , refs[pattern])
           //sanitized = sanitized.replace(/&ecirc;/g , refs[pattern])
        }
        
    }
    return sanitized;
    
}