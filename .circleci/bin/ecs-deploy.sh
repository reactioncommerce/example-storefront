#!/bin/bash

sudo apt-get -y install python3-pip wget jq
sudo pip3 install awscli
wget https://github.com/mikefarah/yq/releases/download/2.0.1/yq_linux_amd64 -O /tmp/yq
sudo mv /tmp/yq /usr/local/bin/yq
sudo chmod +x /usr/local/bin/yq

if [ -z "${AWS_REGION}" ]; then
        AWS_REGION=us-west-2
fi

APP_DIR_NAME=devops/aws/app
APPS=$(ls ${APP_DIR_NAME})

for APP in $APPS; do
	echo "START PROCESSING APPLICATION ${APP}"

	MANIFEST_FILE="${APP_DIR_NAME}/${APP}/manifest.yaml"
	if [ ! -f ${MANIFEST_FILE} ]; then
	    echo "Application manifest file not found!"
	    exit 1
	fi

	ENV_NAME=$(/usr/local/bin/yq r $MANIFEST_FILE "environment.name")

	ENV_NAME_UPPERCASE=$(echo $ENV_NAME | awk '{print toupper($0)}')
	AWS_ACCESS_KEY_ID_VAR_NAME=CLOUDFORMATION_${ENV_NAME_UPPERCASE}_AWS_ACCESS_KEY_ID
	AWS_SECRET_ACCESS_KEY_VAR_NAME=CLOUDFORMATION_${ENV_NAME_UPPERCASE}_AWS_SECRET_ACCESS_KEY

	if [ "${!AWS_ACCESS_KEY_ID_VAR_NAME}" ]; then
		AWS_ACCESS_KEY_ID=${!AWS_ACCESS_KEY_ID_VAR_NAME}
	fi

	if [ "${!AWS_SECRET_ACCESS_KEY_VAR_NAME}" ]; then
		AWS_SECRET_ACCESS_KEY=${!AWS_SECRET_ACCESS_KEY_VAR_NAME}
	fi

	mkdir -p ~/.aws
	echo "[default]" > ~/.aws/credentials
	echo "aws_access_key_id = ${AWS_ACCESS_KEY_ID}" >> ~/.aws/credentials
	echo "aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}" >> ~/.aws/credentials

	echo "[default]" > ~/.aws/config
	echo "region = ${AWS_REGION}" >> ~/.aws/config

	echo Running aws s3 cp s3://${S3_PROPEL_ARTIFACTS_BUCKET}/propel-linux-amd64 ./propel
	aws s3 cp s3://${S3_PROPEL_ARTIFACTS_BUCKET}/propel-linux-amd64 ./propel

	sudo mv propel /usr/local/bin/propel
	sudo chmod +x /usr/local/bin/propel

	cd ${APP_DIR_NAME}/${APP}
	RELEASE_DESCRIPTION="CircleCI build URL: ${CIRCLE_BUILD_URL}"
	propel release create --deploy --descr "${RELEASE_DESCRIPTION}"
	echo "END PROCESSING APPLICATION ${APP}"
	
	cd -
done
