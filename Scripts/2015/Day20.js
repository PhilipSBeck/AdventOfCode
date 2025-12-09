function Year2015Day20PartOne(value) {
    let min = parseInt(value);
    let num = 1;
    while(true){
        let presentCount = num * 10;
        for(let i = 3600000; i <= num/2; i++){
            if(num%i == 0)
            {
                presentCount += i * 10;
            }
        }
        if (presentCount >= min){
            return i;
        }
        if(num%100 == 0){
            console.log(min - presentCount);
        }
        num++;
    }

    return "Unfinished";
}

function Year2015Day20PartTwo(value) {
    return "Unfinished";
}