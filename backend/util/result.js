const createResult = (err,data) =>{
    const result = {}
    if(data){
        result.status = true
        result.data = data
    }
    else{
        result.status = false
        result.data = err
    }
    return result;
}

module.exports = {createResult}