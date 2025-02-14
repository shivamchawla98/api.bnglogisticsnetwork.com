#!/bin/bash

# Clean up previous builds
rm -rf lambda/dist
rm -rf lambda/node_modules
rm -f lambda/lambda.zip

# Copy dist folder to lambda
cp -r dist lambda/

# Install production dependencies in lambda directory
cd lambda
npm install --production

# Create timestamp file to force update
echo $(date) > timestamp.txt

# Create deployment package
zip -r lambda.zip dist/ node_modules/ timestamp.txt

# Go back to original directory
cd ..

echo "Lambda package prepared successfully"
