#!/bin/bash

MOD_NAME="fis3-vue2-bootstrap"
TAR="$MOD_NAME.tar.gz"

# add path
export PATH=/home/fis/npm/bin:$PATH
#show fis3 version
fis3 --version --no-color

npm install --registry=http://registry.npm.baidu.com
#产出到同目录下output中
fis3 release prod -d output

#进入output目录
cd output

#将output目录进行打包
tar zcf $TAR ./*
mv $TAR ../

cd ..
rm -rf output

mkdir output

mv $TAR output/

echo "build end"
