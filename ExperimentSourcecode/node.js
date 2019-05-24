// requires to read from file
var fs = require('fs');

// function to apply distinct on array elements
const distinct = (value, index, self) => {

	return self.indexOf(value) === index;

}
 
// read file
fs.readFile('filepath', 'utf8', function(err, contents) {
    // split lines with new line
    var lines = contents.split(/\r?\n/);
    var array = [];
 
    // for each line store only the ones with LAC = 231
    lines.forEach(function(element) {

	var line = element.split(",");

	if (line[7] == "231")
		array.push(line[5] + "," + line[7]);
	
    });

    // filter data
    var filtered = array.filter(distinct);

    //print
    filtered.forEach(function(element) {
	console.log(element);
    });
});

