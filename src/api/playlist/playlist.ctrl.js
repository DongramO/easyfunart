const docentList = require('../../db/model/siteList')
const mysql = require('../../lib/dbConnection')
const dbpool = require('../../../config/connection')

exports.getListSite = async (req, res) => {
  const { query } = req
  try {
    pool = await mysql(dbpool)
    const queryResult = await docentList.siteList(query, dbpool)
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 6001,
      message: e,
    })
  }
  pool.release()
  res.status(200).send({
    status: 'fail',
    code: 6000,
    message: 'success get site list',
    data: queryResult,
  })
}


exports.getListFavor = async (req, res) => {
  const { query } = req
  try {
    pool = await mysql(dbpool)
    const queryResult = await docentList.favorList(query, dbpool)
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 6002,
      message: e,
    })
  }
  pool.release()
  res.status(200).send({
    status: 'fail',
    code: 6000,
    message: 'success get listfavor',
    data: queryResult,
  })
}


exports.getListGuide = async (req, res) => {
  const { query } = req
  try {
    const queryResult = await docentList.guideList(query)
  } catch (e) {
    res.status(500).send({
      status: 'fail',
      code: 4001,
      message: e,
    })
  }
  res.status(200).send({
    status: 'fail',
    code: 4000,
    message: 'Guidelist select success',
    data: queryResult,
  })
}
