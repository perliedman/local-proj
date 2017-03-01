# local-proj

[![Greenkeeper badge](https://badges.greenkeeper.io/perliedman/local-proj.svg)](https://greenkeeper.io/)

Find a projection for easy cartesian calculations, given a GeoJSON in WGS84.

_Problem:_ you have geographic data in WGS84 of limited extent, but arbitrary location,
and you need to work with the data in a cartesian system (use euclidean distance, etc.)

_Solution:_ feed your data to `local-proj`, and it will hand you a suitable projection
independent of geographic location

## Installing

```
npm install --save local-proj
```

## Example

```javascript
var localProj = require('local-proj');
var geojson = [...]

var projection = localProj.find(geojson);

var cartesian = projection.forward(geojsoncoord);
```

To reproject your GeoJSON to the projection, you might want to look at
[reproject](https://github.com/perliedman/reproject).

## API

### find(geojson)

Finds a local projection that is suitable for projecting the `geojson` to cartesian
coordinates.

The returned projection is a [proj4](http://proj4js.org/) projection object (`proj4.Proj`), which
you can use to create transforms to and from other projections.

Note that the local coordinate system will only work as expected for datasets up to a couple
of hundred kilometers in size.

Currently, the returned projection will always be a [transverse mercator](https://en.wikipedia.org/wiki/Transverse_Mercator_projection) projection.
