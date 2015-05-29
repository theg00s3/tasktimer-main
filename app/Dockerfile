FROM nginx:1.9.1
RUN ["rm", "/etc/nginx/nginx.conf"]
RUN ["mkdir", "-p", "/var/www/pomodoro.cc/"]
RUN ["mkdir", "-p", "/etc/nginx/ssl/pomodoro.cc/"]
ADD www/ /var/www/pomodoro.cc/
ADD etc/nginx/nginx.ssl.conf /etc/nginx/nginx.conf
EXPOSE 80
