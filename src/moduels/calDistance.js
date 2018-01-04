module.exports = function calDistance(lat1, lon1, gallerySiteData) {
    let distanceResult = []
    for (i in gallerySiteData) {
        let radlat1 = Math.PI * lat1 / 180
        let radlat2 = Math.PI * gallerySiteData[i].gallery_latitude / 180
        let theta = lon1 - gallerySiteData[i].gallery_longitude
        let radtheta = Math.PI * theta / 180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515;
        dist = parseInt(dist * 1609.344, 10);
        if(dist <= 2000) {
            distanceResult.push({gallery_id : gallerySiteData[i].gallery_id, gallery_name : gallerySiteData[i].gallery_name})
        }
    }
    return distanceResult;
}