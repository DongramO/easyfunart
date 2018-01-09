// exports.PreviousDocent  =function(exId,track,connection){
//     //ㅁ르겠따~~~~~~~~~~~~
// return new Promise((resolve,seject) => {
//     let nextTrack = track +1
//     console.log(docentId, exId, track) 
//     const Query = 'SELECT docent_id, docent_title,docent_audio,docent_track FROM DOCENT WHERE docent_track = ? AND ex_id = ?'
//     connection.query(Query,[nextTrack,exId],(err,result) => {
//         if(err){
//             reject(err)
//         }else {
//                 resolve(result)
//         }
//     })
// })
// }

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