#!/bin/bash

CROSS_BROWSER=$1
SELENIUM_JAR="selenium.jar"
if [ -f "$SELENIUM_JAR" ]
then
  echo "$SELENIUM_JAR found."
else
  echo "$SELENIUM_JAR not found."
  wget http://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar -O $SELENIUM_JAR
fi

if [ -n "$CROSS_BROWSER" ]; then
  ./node_modules/nightwatch/bin/nightwatch -e chrome,firefox,safari
else
  ./node_modules/nightwatch/bin/nightwatch -e firefox
fi

NIGHTWATCH_EXIT_CODE=$?

exit $NIGHTWATCH_EXIT_CODE
