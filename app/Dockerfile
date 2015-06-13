FROM nginx:1.9.1
RUN ["rm", "/etc/nginx/nginx.conf"]
RUN ["mkdir", "-p", "/var/www/pomodoro.cc/"]
RUN ["mkdir", "-p", "/etc/nginx/ssl/pomodoro.cc/"]
ADD www/ /var/www/pomodoro.cc/
ADD etc/nginx/nginx.ssl.conf /etc/nginx/nginx.conf
RUN chmod -R 777 /var/www/pomodoro.cc/
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 80
