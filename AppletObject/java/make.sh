#! /bin/bash

# 2007-05-24 07:43:03 - fjenett
#
# this is my os-x build file, not sure it's usefull
# to anyone else.

mkdir build

javac -target 1.1 -d build de/bezier/js/preloading/*.java
javac -target 1.1 -d build de/bezier/js/version/*.java

cd build
rm ../ZZZZZZ.jar
jar cvf ../ZZZZZZ.jar de

rm -R ../build