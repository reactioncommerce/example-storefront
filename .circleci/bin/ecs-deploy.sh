#!/bin/bash

sudo apt-get -y install python3-pip wget
sudo pip3 install awscli
wget https://github.com/mikefarah/yq/releases/download/2.0.1/yq_linux_amd64 -O /tmp/yq
sudo mv /tmp/yq /usr/local/bin/yq
sudo chmod +x /usr/local/bin/yq

if [ -z "${AWS_REGION}" ]; then
	AWS_REGION=us-west-2
fi

if [ "${CLOUDFORMATION_AWS_ACCESS_KEY_ID}" ]; then
	AWS_ACCESS_KEY_ID=${CLOUDFORMATION_AWS_ACCESS_KEY_ID}
fi

if [ "${CLOUDFORMATION_AWS_SECRET_ACCESS_KEY}" ]; then
	AWS_SECRET_ACCESS_KEY=${CLOUDFORMATION_AWS_SECRET_ACCESS_KEY}
fi


mkdir ~/.aws
echo "[default]" > ~/.aws/credentials
echo "aws_access_key_id = ${AWS_ACCESS_KEY_ID}" >> ~/.aws/credentials
echo "aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}" >> ~/.aws/credentials

echo "[default]" > ~/.aws/config
echo "region = ${AWS_REGION}" >> ~/.aws/config

aws s3 cp --recursive s3://${S3_ECS_DEPLOY_BUCKET}/staging/devops .

find aws -name \*sh | xargs chmod +x
cd aws/app
ls -la
cat ./update-app-stack.sh
./update-app-stack.sh sk-service
