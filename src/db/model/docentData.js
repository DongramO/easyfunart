
exports.getDocentData = function(docentId,connection){
    return new Promise((resolve, reject) => {
        const Query = 'SELECT docent_audio FROM DOCENT WHERE docent_id = ?'
        connection.query(Query, docentId, (err,result) =>{
            if(err){
                reject('docent audio select query  error')
            } else {
                resolve(result)
            }
        })
    })
}

exports.docentText = function(docentId,connection){
return new Promise((resolve,reject) => {
    const Query = 'SELECT docent_text FROM DOCENT WHERE docent_id = ?'
    connection.query(Query,docentId,(err,result) => {
        if(err){
            reject(err)

        }else {
            console.log('aaaaa',result)
            resolve(result)
        }
    })
})
}

exports.docentPlace = function(docentId,connection){
    return new Promise((resolve,reject) => {
        const Query = 'SELECT docent_place FROM DOCENT WHERE docent_id = ?'
        connection.query(Query,docentId,(err,result) => {
            if(err){
                reject(err)
    
            }else {
                resolve(result)
            }
        })
    })
    }