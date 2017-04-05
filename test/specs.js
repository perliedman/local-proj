var test = require('tape'),
	localProj = require('../');

test('transforms origin correctly', function(t) {
	var p = [11.9, 57.7];
	var proj = localProj.find({type: 'Point', coordinates: p});

	var projectedP = proj.forward(p);

	t.equal(projectedP[0], 0);
	t.equal(projectedP[1], 0);

	t.end();
});

test('transforms distant point correctly', function(t) {
	var point = {
	  "type": "Feature",
	  "properties": {
	    "marker-color": "#0f0"
	  },
	  "geometry": {
	    "type": "Point",
	    "coordinates": [-75.343, 39.984]
	  }
	};
	var proj = localProj.find(point);

	// This point is calculated by Turf.js' destination
	// function to be 50 miles from the origin
	var projectedP = proj.forward([-74.39964, 39.98017]);
	var distance = Math.sqrt(projectedP[0]*projectedP[0] + projectedP[1]*projectedP[1]);

	t.ok(Math.abs(1 - distance / (50 * 1609.344)) < 0.0015);
	t.end()
});
