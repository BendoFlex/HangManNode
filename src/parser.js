const fs = require('fs')
const readline = require('readline');

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
    const parsed = word.replace(/&eacute;/g ,"é");//PROCESS REPLACE ALL

    console.log(parsed)
    console.log(parsed.split(" "))

    if((parsed != '' && parsed.split(" ").length == 1) || parsed.indexOf("Ad") != -1){
        if(parsed.indexOf("Ad") != -1 && parsed.split(" ").length > 2){
            let parts = parsed.split(" ");
            list_of_words.push(parts[0]+" "+parts[1]) //PUSH wanted splitted part
        }
        else{
            list_of_words.push(parsed)
        }
        
    }

  }
  console.log(list_of_words)
}

processLineByLine();


function sanitize (word) { //PROCESS ITERATION PAR CLE
    let refs = [{"&eacute;" : "é"} , {"&ecirc;" : "è"}]
    for(pattern of Object.keys(refs)) {
        if(word.indexOf(pattern)!= -1){
            word.replace(/+pattern+/g , pattern)
        }
        
    }
    
}