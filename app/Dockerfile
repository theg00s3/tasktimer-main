FROM shepmaster/nginx-template-image:latest
RUN ["mkdir", "-p", "/var/www/pomodoro.cc/"]
ADD www/ /var/www/pomodoro.cc/
ADD etc/nginx /etc/nginx/sites-templates
RUN chmod -R 777 /var/www/pomodoro.cc/
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 80
