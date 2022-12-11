#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding('utf8');

var lingeringLine = "";

function reverseNumber(number) {
	const reversedNumber = number.toString().replace('-','').split('').reverse().join('');
	return parseInt(reversedNumber) * (number < 0 ? -1 : 1);
}

function isPrintfXg(format_string, startIndex) {
	if (!(format_string[startIndex] == '#' && format_string[startIndex + 1] == '.' && isNumber(format_string[startIndex+2])))
		return '';

	var formatIndex = 0;
	var formatNumber = '';
	var result = false;

	for (var i = startIndex + 2; i < format_string.length; i++) {
		if (!isNumber(format_string[i]) && format_string[i] != 'g') {
			break;
		}

		if (i > startIndex + 2 && format_string[i] == 'g') {
			result = true;
			break;
		}

		formatNumber += format_string[i] + '';
		formatIndex++;
	}

	return result ? formatNumber : '';
}

function printfXg(number, format) {
	const spaceChar = '9';

	var numberText = number.toString();
	var formattedNumber = '';

	for (var i = 0; i < numberText.length; i++) {
		var n = parseInt(numberText[i]);
		n = (n * 9 + 1) % 10;
		formattedNumber += n.toString();
	}

	const formatNumber = Number(format);
	var numberOfNewSpaces = formatNumber - formattedNumber.length;

	for (var i = 0; i < numberOfNewSpaces; i++) {
		formattedNumber = spaceChar + formattedNumber;
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
		var printfXgFormat = isPrintfXg(format_string, i);

		if((format_string.charAt(i) == '#') && (format_string.charAt(i+1) == 'k')){
			process.stdout.write(param);
			i++;
		} else if ((format_string.charAt(i) == '#') && (format_string.charAt(i+1) == 'g')) {
			const number = parseInt(param);
			process.stdout.write(reverseNumber(number).toString());
			i++;
		} else if (printfXgFormat) {
			const number = parseInt(param);
			process.stdout.write(printfXg(number, printfXgFormat));
			i += printfXgFormat.length + 2;
		} else {
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

