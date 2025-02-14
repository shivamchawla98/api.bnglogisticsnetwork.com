#!/bin/bash

# Clean up previous builds
rm -rf dist .aws-sam/build node_modules layers/*/nodejs/node_modules

# Install dependencies and build the NestJS application
npm install
npm run build

# Build the layers
./build-layers.sh

# Clean up the build directory
rm -rf .aws-sam

# Build with SAM
sam build

# Ensure the handler is properly copied and node_modules are installed
mkdir -p .aws-sam/build/BngFunction
cp -r dist/* .aws-sam/build/BngFunction/
cp package.json .aws-sam/build/BngFunction/

# Copy layer dependencies to function
cd .aws-sam/build/BngFunction
mkdir -p node_modules
for layer in core-dependencies graphql-db auth-utils aws; do
    if [ -d "../../../layers/$layer/nodejs/node_modules" ]; then
        echo "Copying $layer dependencies..."
        cp -r "../../../layers/$layer/nodejs/node_modules/"* "node_modules/"
    fi
done

# Install minimal function dependencies (only those not in layers)
npm install --production