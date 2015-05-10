BUILD_DIR = ./www
PROD_REPO = ssh://pigeon@146.185.167.197/home/pigeon/sites/pomodoro.cc/git/

i_node_modules:
	npm install

i_bower_components:
	./node_modules/bower/bin/bower install --allow-root --no-interactive

i_html5_notifications:
	mkdir -p src/lib/HTML5-Desktop-Notifications
	wget https://raw.githubusercontent.com/ttsvetko/HTML5-Desktop-Notifications/master/desktop-notify-min.js -O src/lib/HTML5-Desktop-Notifications/desktop-notify-min.js

i_web_driver:
	./node_modules/protractor/bin/webdriver-manager update

bootstrap: i_node_modules i_bower_components i_html5_notifications build test
production: i_node_modules i_bower_components i_html5_notifications build_prod test

test:
	npm test

e2e-test:
	sh test/e2e_test.sh

clean:
	rm -rf $(BUILD_DIR)

build: clean
	./node_modules/gulp/bin/gulp.js
	make sign-build

build_prod: clean
	PRODUCTION=true ./node_modules/gulp/bin/gulp.js
	make sign-build

sign-build:
	./node_modules/gulp/bin/gulp.js sign-build
