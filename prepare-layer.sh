#!/bin/bash

# Create layer directory structure
mkdir -p layers/dependencies/nodejs

# Copy package files
cp package.json layers/dependencies/nodejs/
cp package-lock.json layers/dependencies/nodejs/

# Install production dependencies in the layer
cd layers/dependencies/nodejs
npm ci --production

# Remove unnecessary files
rm package.json package-lock.json
cd ../../..
