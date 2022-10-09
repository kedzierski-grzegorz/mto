#include <stdio.h>
#include <string.h>

int my_printf(char *format_string, char *param){
	for(int i=0;i<strlen(format_string);i++){
		if((format_string[i] == '#') && (format_string[i+1] == 'k')){
			i += 2;
			printf("%s",param);
		} if ((format_string[i] == '#') && (format_string[i+1] == '.') && isdigit(format_string[i+2]) && (format_string[i+3] == 'k')) {
			char format[5];
			sprintf(format, "%%.%cs", format_string[i+2]);
			printf(format, param);
			i += 3;
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
