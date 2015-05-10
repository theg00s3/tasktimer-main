#!/bin/bash

./node_modules/protractor/bin/webdriver-manager update > /dev/null 2>&1

# start selenium
./node_modules/protractor/bin/webdriver-manager start > /dev/null 2>&1 &
SELENIUM_PID=$!
echo "selenium pid: $SELENIUM_PID"

# start gulp
./node_modules/gulp/bin/gulp.js connect > /dev/null 2>&1 &
GULP_PID=$!
echo "gulp pid: $GULP_PID"

printf '\n\n'

# wait until selenium is up
while ! curl http://localhost:4444/wd/hub/status > /dev/null 2>&1
do
  printf "."
  sleep 1
done

# run e2e-tests
./node_modules/protractor/bin/protractor test/protractor.conf.js
PROTRACTOR_EXIT_CODE=$?

# stop selenium
curl -s -L http://localhost:4444/selenium-server/driver?cmd=shutDownSeleniumServer > /dev/null 2>&1



if [ "$PROTRACTOR_EXIT_CODE" -eq 1 ];then
  exit 1
fi
