var proj4 = require('proj4'),
    coordReduce = require('turf-meta').coordReduce;

module.exports = {
    find: function(geojson) {
        var cs = coordReduce(geojson, function(memo, c) {
                memo.sum[0] += c[0];
                memo.sum[1] += c[1];
                memo.nCoords++;
                return memo;
            }, {
                sum: [0, 0],
                nCoords: 0
            }),
            clat = cs.sum[1] / cs.nCoords,
            clon = cs.sum[0] / cs.nCoords,
            proj = proj4(proj4.WGS84, '+proj=tmerc +lat_0=' + clat + ' +lon_0=' + clon + ' +k=1.000000 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');

        return proj;
    }
};
