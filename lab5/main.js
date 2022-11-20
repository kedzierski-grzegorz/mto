#!/usr/bin/env node
process.stdin.resume();
process.stdin.setEncoding('utf8');

var lingeringLine = "";

function reverseNumber(number) {
	const reversedNumber = number.toString().replace('-','').split('').reverse().join('');
	return parseInt(reversedNumber) * (number < 0 ? -1 : 1);
}

function my_printf(format_string,param){
	for(var i=0;i<format_string.length;i++){
		if((format_string.charAt(i) == '#') && (format_string.charAt(i+1) == 'k')){
			process.stdout.write(param);
			i++;
		} else if ((format_string.charAt(i) == '#') && (format_string.charAt(i+1) == 'g')) {
			const number = parseInt(param);
			process.stdout.write(reverseNumber(number).toString());
			i++;
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

