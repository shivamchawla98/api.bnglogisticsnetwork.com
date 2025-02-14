#!/bin/bash

# Clean up previous builds
rm -rf .aws-sam/build

# Build TypeScript
npm run build

# Build SAM
sam build
