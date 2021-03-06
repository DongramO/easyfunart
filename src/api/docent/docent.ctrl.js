const docentData = require('../../db/model/docentData')
const trackList = require('../../db/model/siteList')
const mysql = require('../../lib/dbConnection')
const dbpool = require('../../../config/connection')
const decodeTokenFunc = require('../../lib/token')

 exports.getDocentMain = async (req, res) =>{
  const pool = await mysql(dbpool)
  let DataResult,dText
  try { 
    const { docentTrack, exId } = req.query
    
    DataResult = await trackList.trackList(docentTrack, exId, pool) 
    dText = DataResult[0].docent_text.replace(/\\n/g,"\n")
    
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 6001,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 6000,
    message: 'success get docent info ',
    data: {
      ex_id : DataResult[0].ex_id,
      ex_title : DataResult[0].ex_title,  
      docent_title : DataResult[0].docent_title,
      docent_audio : DataResult[0].docent_audio,
      docent_track : DataResult[0].docent_track,
      docent_text : dText,
      docent_place : DataResult[0].docent_place
    }
  })
 }
 
exports.getBeforeDocent = async (req,res) => {
  let DataResult, dText
  const pool = await mysql(dbpool)
  try { 
    const { docentTrack, exId } = req.query
    console.log(docentTrack,exId)
    
    const beforeTrack =Number(docentTrack) -1
    DataResult = await trackList.trackList(beforeTrack, exId, pool) //ex_id가 같고 트랙-1 인 데이터 찾기 
    dText = DataResult[0].docent_text.replace(/\\n/g,"\n")
    
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 6004,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 6000,
    message: 'success get  before docent ',
    data: {
      ex_id : DataResult[0].ex_id,
      ex_title : DataResult[0].ex_title,  
      docent_title : DataResult[0].docent_title,
      docent_audio : DataResult[0].docent_audio,
      docent_track : DataResult[0].docent_track,
      docent_text : dText,
      docent_place : DataResult[0].docent_place
    }
  })
}
exports.getNextDocent = async (req, res) => {
  let DataResult , dText
  const pool = await mysql(dbpool)
  try { 
    const { docentTrack, exId } = req.query
    
    const nextTrack =Number(docentTrack)+1
    DataResult = await trackList.trackList(nextTrack, exId, pool) //ex_id가 같고 트랙+1 인 데이터 찾기 
    dText = DataResult[0].docent_text.replace(/\\n/g,"\n")
    
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 6005,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 6000,
    message: 'success get  next docent ',
    data: {
      ex_id : DataResult[0].ex_id,
      ex_title : DataResult[0].ex_title,  
      docent_title : DataResult[0].docent_title,
      docent_audio : DataResult[0].docent_audio,
      docent_track : DataResult[0].docent_track,
      docent_text : dText,
      docent_place : DataResult[0].docent_place
    }
  })
}

// exports.getDocentText = async (req, res) => {
//   let docentTextResult,dText
//   try {
//     pool = await mysql(dbpool)
//     docentTextResult = await docentData.docentText(req.params.docentId ,pool)
//     dText = docentTextResult[0].docent_text.replace(/\\n/g,"\n")

//   } catch (e) {
//       console.log(e)
//     pool.release()
//     res.status(500).send({
//       status: 'fail',
//       code: 6005,
//       message: e,
//     })
//     return
//   }
//   pool.release()
//   res.status(200).send({
//     status: 'success',
//     code: 6000,
//     message: 'success get docent Text',
//     data: {
//         docentText : dText
//     }
//   })
// }

// exports.getDocentPlace = async (req, res) => {
  //   let docentPlaceResult
  //   try { 
  //     pool = await mysql(dbpool)
  //     docentPlaceResult = await docentData.docentPlace(req.params.docentId ,pool)
  
  //   } catch (e) {
  //     pool.release()
  //     res.status(500).send({
  //       status: 'fail',
  //       code: 6006,
  //       message: e,
  //     })
  //     return
  //   }
  //   pool.release()
  //   res.status(200).send({
  //     status: 'success',
  //     code: 6000,
  //     message: 'success get docent Place',
  //     data: {
  //         docentPlace : docentPlaceResult[0].docent_place
  //     }
  //   })
  // }
  
  