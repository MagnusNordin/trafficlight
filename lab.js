process.stdin.resume();

var gpio = require('pi-gpio'); 
var mainLight = {red:11,yellow:12,green:15};
var secondLight = {red: 16, green: 18};

function switchLight(light, onoff) {
	process.nextTick( function() {
		gpio.open(light, "output", function(err) {
			gpio.write(light, onoff, function() {
				gpio.close(light);
			});
		});
	});
}


var interval = setInterval(function() {
	gpio.open(22, "input", function(err) {
		gpio.read(22, function(err, value) {
			if (value === 1) {
				switchLight(secondLight.green, 1);	
			}
			else {
				switchLight(secondLight.green, 0);
			}
			gpio.close(22);
		});
	});
}, 500);

function startUp() {
	switchLight(mainLight.red, 0);
	switchLight(mainLight.yellow, 0);
	switchLight(mainLight.green, 0);
	switchLight(secondLight.red, 0);
	switchLight(secondLight.green, 0);
	
	process.on('exit', exitHandler);
	process.on('SIGINT', exitHandler);
};


function exitHandler() {
	console.log('Goodbye!');
	process.exit();
}

  
startUp();
switchLight(mainLight.green, 1);
switchLight(secondLight.red, 1);
