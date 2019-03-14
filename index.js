const fs = require('fs')
const { GCJ02ToWGS84, WGS84ToGCJ02 } = require('./lib/conversion')

function transfer(inputPath, outputPath, GCJ02, WGS84) {
    const fileData = fs.readFileSync(inputPath, "utf-8");
    let geo = JSON.parse(fileData);
    geo.features.map((data) => {
        switch (data.geometry.type) {
            case 'Point':
                // 1层
                data.geometry.coordinates = GCJ02 ? GCJ02ToWGS84(...data.geometry.coordinates) : WGS84 ? WGS84ToGCJ02(...data.geometry.coordinates) : null;
                break;
            case 'Polygon':
            case 'MultiLineString':
                // 3层
                data.geometry.coordinates = data.geometry.coordinates.map(l2 => {
                    return l2.map(l3 => {
                        return GCJ02 ? GCJ02ToWGS84(...l3) : WGS84 ? WGS84ToGCJ02(...l3) : null;
                    })
                })
                break;
            default:
                throw new Error("Unexpected error")
        }
    });
    fs.writeFileSync(outputPath, JSON.stringify(geo), "utf-8");
}

function gcj2wgs(inputPath, outputPath) {
    transfer(inputPath, outputPath, true, false);
}
function wgs2gcj(inputPath, outputPath) {
    transfer(inputPath, outputPath, false, true);
}
exports.gcj2wgs = gcj2wgs;
exports.wgs2gcj = wgs2gcj;