const aftersixmonths = () => {

    let currentDate = new Date() ; 
    let year = currentDate.getFullYear()
    let month = currentDate.getMonth()
    if(month + 6 > 12){
        month = (month+6) % 12 ; 
        year++; 
    }
    else{
        month = month + 6 ; 
    }

    
    let date = currentDate.getDate()
    return (new Date(year , month , date).toISOString().split("T")[0]) 
}
// let newdate = new Date() ;
// console.log(aftersixmonths(newdate)) ; 
module.exports = aftersixmonths ; 
