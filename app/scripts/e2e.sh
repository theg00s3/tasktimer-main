#!/bin/bash

SELENIUM_JAR="selenium.jar"
if [ -f "$SELENIUM_JAR" ]
then
  echo "$SELENIUM_JAR found."
else
  echo "$SELENIUM_JAR not found."
  wget http://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar -O $SELENIUM_JAR
fi

# ./node_modules/gulp/bin/gulp.js
cd www
python -m SimpleHTTPServer 9000 > /dev/null 2>&1 &
SERVER_PID=$!

while curl --silent http://localhost:9000
do
  echo "."
  sleep 0.1
done
cd ..

./node_modules/nightwatch/bin/nightwatch

NIGHTWATCH_EXIT_CODE $?

kill -9 $SERVER_PID

exit $NIGHTWATCH_EXIT_CODE
