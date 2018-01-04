
const userData = require('../../db/model/users')
const PreferenceData = require('../../db/model/preference')
const pool = require('../../../config/connection')
const connect = require('../../lib/dbConnection')

exports.addPreference = async (req, res) => {
  const { sex, age, pre_place, pre_mood, pre_gnere, pre_subject, user_id, user_nickname } = req.body
  try {
    const userSelectResult = await userData.selectUsernickname(bodyString.user_nickname)
    if (userSelectResult.length === 0) {
      const userInsertResult = await userData.insertUser(bodyString.user_nickname)
    } else {
      const preferenceInsertResult = await preferenceData.insertPreference(bodyString, result)
    }
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
    message: 'success add Preference',
  })
}
