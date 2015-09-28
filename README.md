# local-proj

Find a projection for easy cartesian calculations, given a GeoJSON in WGS84.

_Problem:_ you have geographic data in WGS84 of limited extent, but arbitrary location,
and you need to work with the data in a cartesian system (use euclidean distance, etc.)

_Solution:_ feed your data to `local-proj`, and it will hand you a suitable projection
independent of geographic location

## Example

```javascript
var localProj = require('local-proj');
var geojson = [...]

var projection = localProj.find(geojson);

var cartesian = projection.forward(geojsoncoord);
```

## API

### find(geojson)

Finds a local projection that is suitable for projecting the `geojson` to cartesian
coordinates.

The returned projection is a [proj4](http://proj4js.org/) projection with two methods:
`forward` and `inverse`. `forward` takes a WGS84 coordinate as an array in longitude/latitude
order, and converts to a cartesian coordinate with meters as unit. `inverse` does the
opposite.

Note that the local coordinate system will only work as expected for datasets up to a couple
of hundred kilometers in size.

Currently, the returned projection will always be a [transverse mercator](https://en.wikipedia.org/wiki/Transverse_Mercator_projection) projection.
