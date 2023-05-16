const ab = (dateFrom, dateTo, dateCheck) => {
    // let newdatefrom = dateFrom.slice("T") ; 
    let arrfrom = (dateFrom.toISOString().split("T")[0]); 
    let arrto = (dateTo.toISOString().split("T")[0]); 
    let arrcheck = (dateCheck.toISOString().split("T")[0]);
    
    
    const check = new Date(arrcheck);
    const start = new Date(arrfrom);
    const end = new Date(arrto);

    return check >= start && check <= end;
}


module.exports = ab ; 