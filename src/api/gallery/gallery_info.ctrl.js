const exhibitionData = require('../../db/model/exhibitionData')
const dbPool = require('../../../config/connection')
const dbConnection = require('../../lib/dbConnection')

exports.getGalleryInfo = async (req, res) => {
    let exGalleryDataResult
    const  connection = await dbConnection(dbPool)
    console.log('ttt')
    try {
        const { galleryId } = req.params
       
        exGalleryDataResult = await exhibitionData.getGalleryInfo(galleryId, connection)
    } catch (e) {
        connection.release()
        res.status(500).send({
            status: "fail",
            code: 4002,
            message: e
        })
    }
    connection.release()
    res.status(200).send({
        status: "success",
        code: 4000,
        message: "successfully load gallery data",
        data: {
            runtime: exGalleryDataResult[0].gallery_runtime,
            address: exGalleryDataResult[0].gallery_address,
            phone : exGalleryDataResult[0].gallery_phone,
            latitude: exGalleryDataResult[0].gallery_latitude,
            longitude: exGalleryDataResult[0].gallery_longitude
        }
    })
}