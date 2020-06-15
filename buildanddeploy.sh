#!/bin/sh

npm install

rm -rf ./www

ionic build --prod

#aws s3 sync ./www s3://non-sso-dev-site-webapp/ --delete
aws s3 sync ./www s3://bucket-name --delete
