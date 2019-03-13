const earthR = 6378245.0;
const ee = 0.00669342162296594323;

function outOfChina(lon, lat) {
    return !(lon >= 72.004 && lon <= 137.8347 && lat > 0.8292 && lat < 55.8272);
}

exports.outOfChina = outOfChina;

function transform(x, y) {
    let xy = x * y;
    let absX = Math.sqrt(Math.abs(x));
    let xPi = x * Math.PI,
        yPi = y * Math.PI;
    let d = 20.0 * Math.sin(6.0 * xPi) + 20.0 * Math.sin(2.0 * xPi);
    let lat = d,
        lng = d;
    lat += 20.0 * Math.sin(yPi) + 40.0 * Math.sin(yPi / 3.0);
    lng += 20.0 * Math.sin(xPi) + 40.0 * Math.sin(xPi / 3.0);
    lat += 160.0 * Math.sin(yPi / 12.0) + 320 * Math.sin(yPi / 30.0);
    lng += 150.0 * Math.sin(xPi / 12.0) + 300.0 * Math.sin(xPi / 30.0);
    lat *= 2.0 / 3.0;
    lng *= 2.0 / 3.0;
    lat += -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * xy + 0.2 * absX;
    lng += 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * xy + 0.1 * absX;
    return {
        lat: lat,
        lng: lng
    };
}

function delta(lat, lng) {
    let d = transform(lng - 105.0, lat - 35.0);
    let radLat = lat / 180.0 * Math.PI;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    d.lat = (d.lat * 180.0) / ((earthR * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
    d.lng = (d.lng * 180.0) / (earthR / sqrtMagic * Math.cos(radLat) * Math.PI);
    return d;
}

exports.delta = delta;