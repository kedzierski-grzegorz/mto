#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding('utf8');

var lingeringLine = "";

function isPrintfXj(format_string, startIndex) {
	if (!(format_string[startIndex] == '#' && format_string[startIndex + 1] == '.' && isNumber(format_string[startIndex+2])))
		return '';

	var formatIndex = 0;
	var formatNumber = '';
	var result = false;

	for (var i = startIndex + 2; i < format_string.length; i++) {
		if (!isNumber(format_string[i]) && format_string[i] != 'j') {
			break;
		}

		if (i > startIndex + 2 && format_string[i] == 'j') {
			result = true;
			break;
		}

		formatNumber += format_string[i] + '';
		formatIndex++;
	}

	return result ? formatNumber : '';
}

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

function int_to_hex_ext(number, lettersOffset, z) {
	var hexNumber = int_to_hex(number, lettersOffset);
	var formattedNumber = '';
	for (var i = 0; i < hexNumber.length; i++) {
		if (hexNumber[i] === '0') {
			formattedNumber += 'o';	
		} else {
			formattedNumber += hexNumber[i];
		}
	}

	var zNumber = isNumber(z) ? Number(z) : 0;
	var numberOfNewSpaces = zNumber - formattedNumber.length;

	for (var i = 0; i < numberOfNewSpaces; i++) {
		formattedNumber = 'o' + formattedNumber;
	}

	return formattedNumber;
}

function isNumber(char) {
	if (typeof char !== 'string') {
	  return false;
	}
  
	if (char.trim() === '') {
	  return false;
	}
  
	return !isNaN(char);
}

function my_printf(format_string,param){
	for(var i=0;i<format_string.length;i++){
		var printfXjFormat = isPrintfXj(format_string, i);

		if((format_string.charAt(i) == '#') && (format_string.charAt(i+1) == 'j')){
			const number = parseInt(param);
			process.stdout.write(int_to_hex(number, 6));
			i++;
		} else if (printfXjFormat) {
			const number = parseInt(param);
			process.stdout.write(int_to_hex_ext(number, 6, printfXjFormat));
			i += printfXjFormat.length + 2;
		} else{
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

