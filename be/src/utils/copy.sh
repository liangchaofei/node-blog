#!/bin/sh
cd /Users/liangchaofei/Desktop/github/node-blog/be/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log