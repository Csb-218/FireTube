

const stats = (number) => {
  
    if(number>1000 && number <1000000){
        const inThousands = number/1000
        return `${inThousands}K`
    }
    if(number > 1000000 ){
        const inMillions = (number/1000000).toString().slice(0,4)
        return `${inMillions}M`
    }
    else{
        return number
    }
   
}

export default stats