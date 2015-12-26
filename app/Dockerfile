FROM smebberson/alpine-nginx

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf.default

RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

COPY etc/nginx/nginx.conf /etc/nginx/nginx.conf
RUN ["mkdir", "-p", "/var/www/pomodoro.cc/"]
ADD build/ /var/www/pomodoro.cc/
