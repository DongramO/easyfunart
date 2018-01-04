exports.getGalleryLatLngInfo = function (connection) {
    return new Promise((resolve, reject) => {
      const Query = 'select gallery_id, gallery_name, gallery_latitude, gallery_longitude from GALLERY order by gallery_id ASC'
      connection.query(Query, (err, data) => {
        if (err) {
          reject('Gallery Latitude, Longitude Select Query Error')
        } else {
          resolve(data)
        }
      })
    })
  }