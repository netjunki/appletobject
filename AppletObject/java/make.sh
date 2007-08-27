#! /bin/bash

# fjenett 20070819
#
# this is my os-x build file, not sure it's usefull
# to anyone else.

echo ""
echo "----- creating build dir"
mkdir build

echo ""
echo "----- compiling ..."
javac -target 1.1 -d build org/appletobject/*.java

cd build

# the name ZZZZZZZZZ ... is to make the JVM load this
# at the very end. for those implementations that
# sort alphabetically before loading that is.

echo ""
echo "----- removing old jar, jar-ing new files"
rm ../ZZZZZZ.jar
jar cvf ../ZZZZZZ.jar org

cd ../

echo ""
echo "----- removing build dir"
rm -R build

echo ""
echo "----- copying ZZZ... to test/"
cp ZZZZZZ.jar ../test/ZZZZZZ.jar