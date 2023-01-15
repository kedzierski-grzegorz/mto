#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding('utf8');

var lingeringLine = "";


function int_to_hex(number, lettersOffset) {
	if (!lettersOffset) {
		lettersOffset = 0;
	}

	var hex = '';
	if (number >= 0) {
		hex = number.toString(16);
	} else {
		hex = ((1 << 24) + number).toString(16);
	}
	

	var formattedHex = '';

	for (var i = 0; i < hex.length; i++) {
		if (isNaN(hex[i])) {
			const newChar = String.fromCharCode(hex[i].charCodeAt() + lettersOffset);
			formattedHex += newChar;
		} else {
			formattedHex += hex[i];
		}
	}

	return formattedHex;
}

function my_printf(format_string,param){
	for(var i=0;i<format_string.length;i++){
		if((format_string.charAt(i) == '#') && (format_string.charAt(i+1) == 'j')){
			const number = parseInt(param);
			process.stdout.write(int_to_hex(number, 6));
			i++;
		}else{
			process.stdout.write(format_string.charAt(i));
		}
	}
	console.log("");
}

process.stdin.on('data', function(chunk) {
	lines = chunk.split("\n");

	lines[0] = lingeringLine + lines[0];
	lingeringLine = lines.pop();
	for(var i=0;i<lines.length;i++){
		my_printf(lines[i],lines[i+1])
		i++;
	}

});

