#! /bin/bash

# 2007-02-04 20:01:42 - fjenett
#
# this is my os-x build file, not sure it's usefull
# to anyone else.

javac -target 1.1 de/bezier/js/preloading/*.java
javac -target 1.1 de/bezier/js/version/*.java

rm ZZZZZZ.jar
jar cvf ZZZZZZ.jar de