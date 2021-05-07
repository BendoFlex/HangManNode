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
        console.log(masked)
        
    }
    return masked.join("")
}

