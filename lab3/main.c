#include <stdio.h>
#include <string.h>
#include <ctype.h>

int is_length_limit_printf(char *format_string, int startIndex, char *formatNumber) {
	if (!(format_string[startIndex] == '#' && format_string[startIndex+1] == '.'))
		return 0;

	int formatIndex = 0;
	int result = 0;

	for (int i = startIndex + 2; i < strlen(format_string); i++) {
		if (!isdigit(format_string[i]) && format_string[i] != 'k') {
			break;
		}

		if (i > startIndex + 2 && format_string[i] == 'k') {
			result = 1;
			break;
		}

		formatNumber[formatIndex] = format_string[i];
		formatIndex++;
	}

	formatNumber[formatIndex] = '\0';

	return result;
}

int is_length_minimum_printf(char *format_string, int startIndex, char *formatNumber) {
	if (!(format_string[startIndex] == '#' && isdigit(format_string[startIndex+1])))
		return 0;

	int formatIndex = 0;
	int result = 0;
	for (int i = startIndex + 1; i < strlen(format_string); i++) {
		if (!isdigit(format_string[i]) && format_string[i] != 'k') {
			break;
		}

		if (i > startIndex + 1 && format_string[i] == 'k') {
			result = 1;
			break;
		}

		formatNumber[formatIndex] = format_string[i];
		formatIndex++;
	}

	formatNumber[formatIndex] = '\0';

	return result;
}

int my_printf(char *format_string, char *param){
	for(int i=0;i<strlen(format_string);i++){
		char format[53];
		char formatNumber[50];

		if((format_string[i] == '#') && (format_string[i+1] == 'k')){
			i += 2;
			printf("%s",param);
		} 
		
		if (is_length_limit_printf(format_string, i, formatNumber)) {
			sprintf(format, "%%.%ss", formatNumber);
			printf(format, param);
			i += strlen(formatNumber) + 2;
		} else if (is_length_minimum_printf(format_string, i, formatNumber)) {
			sprintf(format, "%%%ss", formatNumber);
			printf(format, param);
			i += strlen(formatNumber) + 1;
		} else {
			if (isalpha(format_string[i])) {
				if (format_string[i] >= 65 && format_string[i] <= 90) {
					putchar(format_string[i] + 32);
				} else {
					putchar(format_string[i] - 32);
				}
			} else {
				putchar(format_string[i]);
			}
		}
			
	}
	puts("");
}

int main(int argc, char *argv[]){
	char buf[1024],buf2[1024];
	while(gets(buf)){
		gets(buf2);
		my_printf(buf,buf2);
	}
	return 0;
}
