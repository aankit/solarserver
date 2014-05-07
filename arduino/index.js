var measure, reading;

exports.setMeasure = function(m){
	measure = m;
};

exports.setReading = function(r){
	reading = r;
};

exports.getInfo = function(){
	return{
		measure: measure,
		reading: reading
	};
};