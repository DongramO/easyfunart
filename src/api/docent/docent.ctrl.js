const docentData = require('../../db/model/docentData')

const mysql = require('../../lib/dbConnection')
const dbpool = require('../../../config/connection')
const decodeTokenFunc = require('../../lib/token')

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
      code: 6004,
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
        code: 6005,
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
  
  