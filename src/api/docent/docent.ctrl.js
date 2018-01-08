
const docentData = require('../../db/model/docentData')
const trackList = require('../../db/model/siteList')

const mysql = require('../../lib/dbConnection')
const dbpool = require('../../../config/connection')
const decodeTokenFunc = require('../../lib/token')

exports.getNextDocent = async (req, res) => {
  let ListResult
  try { 
    const { docentTrack, exId } = req.query
    pool = await mysql(dbpool)
    const nextTrack =Number(docentTrack)+1
    ListResult = await trackList.trackList(nextTrack, exId, pool) //ex_id가 같고 트랙+1 인 데이터 찾기 
    console.log(ListResult)
    
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
      docent_title : ListResult[0].docent_title,
       docent_audio : ListResult[0].docent_audio,
       docent_track : ListResult[0].docent_track,
       ex_id : ListResult[0].ex_id
      
    }
  })
}
exports.getBeforeDocent = async (req,res) => {
  let ListResult
  try { 
    const { docentTrack, exId } = req.query
    console.log(docentTrack,exId)
    pool = await mysql(dbpool)
    const beforeTrack =Number(docentTrack) -1
    ListResult = await trackList.trackList(beforeTrack, exId, pool) //ex_id가 같고 트랙+1 인 데이터 찾기 
    console.log(ListResult)
    
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
      docent_title : ListResult[0].docent_title,
       docent_audio : ListResult[0].docent_audio,
       docent_track : ListResult[0].docent_track,
       ex_id : ListResult[0].ex_id
      
    }
  })
}

exports.getDocentText = async (req, res) => {
  let docentTextResult,dText
  try {
    pool = await mysql(dbpool)
    docentTextResult = await docentData.docentText(req.params.docentId ,pool)
    dText = docentTextResult[0].docent_text.replace(/\\n/g,"\n")

  } catch (e) {
      console.log(e)
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
    message: 'success get docent Text',
    data: {
        docentText : dText
    }
  })
}

exports.getDocentPlace = async (req, res) => {
    let docentPlaceResult
    try { 
      pool = await mysql(dbpool)
      docentPlaceResult = await docentData.docentPlace(req.params.docentId ,pool)
  
    } catch (e) {
      pool.release()
      res.status(500).send({
        status: 'fail',
        code: 6006,
        message: e,
      })
      return
    }
    pool.release()
    res.status(200).send({
      status: 'success',
      code: 6000,
      message: 'success get docent Place',
      data: {
          docentPlace : docentPlaceResult[0].docent_place
      }
    })
  }
  
  