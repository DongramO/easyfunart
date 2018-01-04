const exhibitionData = require('../../../db/model/exhibitionData')
const dbPool = require('../../../../config/connection')
const dbConnection = require('../../../lib/dbConnection')

exports.getGalleryInfo = async (req, res) => {
    let exGalleryDataResult
    try {
        const { galleryId } = req.query
        connection = await dbConnection(dbPool)

        exGalleryDataResult = await exhibitionData.getGalleryInfo(galleryId, connection)
    } catch (e) {
        connection.release()
        res.status(500).send({
            status: "fail",
            code: 3003,
            message: e
        })
    }
    connection.release()
    res.status(200).send({
        status: "success",
        code: 3000,
        message: "successfully load gallery data",
        data: {
            period: exGalleryDataResult[0].gallery_period,
            runtime: exGalleryDataResult[0].gallery_runtime,
            address: exGalleryDataResult[0].gallery_address,
            phone : exGalleryDataResult[0].gallery_phone,
            latitude: exGalleryDataResult[0].gallery_latitude,
            longitude: exGalleryDataResult[0].gallery_longitude
        }
    })
}