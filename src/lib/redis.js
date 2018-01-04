const redis = require('redis')

const client = redis.createClient(6379, 'localhost')

exports.setRedis = function setRedis(mcS, value) {
  return new Promise((resolve, reject) => {
    try {
      const redisKey = mcS

      const redisValue = {
        
      }
      client.set(redisKey, redisValue, (err, data) => {
        if (err) {
          Console.log(err)
          throw new Error(err)
        }
        client.expire(redisKey, 3600 * 24 * 10)
        resolve('success')
      })
    } catch (e) {
      console.log(e)
      resolve(e)
    }
  })
}

exports.getRedis = function getRedis(mcS, ctx) {
  return new Promise((resolve, reject) => {
    try {
      client.get(mcS, (err, data) => {
        if (err) throw new Error(err)
        client.expire(mc_s, 3600 * 24 * 10)
        if (data) resolve(JSON.parse(data).auth)
        else resolve({})
      })
    } catch (e) {
      console.log(e)
      resolve(false)
    }
  })
}
