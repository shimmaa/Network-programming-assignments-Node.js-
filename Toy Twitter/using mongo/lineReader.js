
var EventEmitter = require('events').EventEmitter;


// IMPLEMENT: the putData method of LineReader such that
// you accumulate data inside the lineReader object and emit a 'line' event once
// you complete a line that ends with the delimited ";"


var LineReader = function(){
	var line = "";

    this.putData = function(input_data,ccc){
    	input_data=input_data.replace('\r\n', '');
		input_data=input_data.replace('\r', '');
        input_data=input_data.replace('\n', '');
        var sl = input_data.split(";");
		var end=sl.length-1;
		for(var i=0;i<end;i++)
		{
			line+=sl[i];
			console.log('ln '+line);
			this.emit('line', line,ccc,i);
			line='';
		}
		line+=sl[end];	
	}
}

LineReader.prototype = new EventEmitter();

module.exports = LineReader;

