const { delta, outOfChina } = require('../utils/calculate');

// wgs84 转 GCJ02 加偏
function WGS84ToGCJ02(wgsLng, wgsLat) {
    if (outOfChina(wgsLng, wgsLat)) {
        return [wgsLng, wgsLat];
    }
    let d = delta(wgsLat, wgsLng);
    return [wgsLng + d.lng, wgsLat + d.lat];
}

exports.WGS84ToGCJ02 = WGS84ToGCJ02

// GCJ02 转 wgs84 纠偏
function GCJ02ToWGS84(gcjLng, gcjLat) {
    if (outOfChina(gcjLng, gcjLat)) {
        return [gcjLng, gcjLat];
    }
    let d = delta(gcjLat, gcjLng);
    return [gcjLng - d.lng, gcjLat - d.lat];
}

exports.GCJ02ToWGS84 = GCJ02ToWGS84;