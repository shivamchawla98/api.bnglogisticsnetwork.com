#!/bin/bash

# Clean up previous builds
rm -rf .aws-sam/build layers/*/nodejs/node_modules

# Create new layer directories
mkdir -p layers/core-dependencies/nodejs
mkdir -p layers/graphql-db/nodejs
mkdir -p layers/auth-utils/nodejs
mkdir -p layers/aws/nodejs

# Function to build a layer
build_layer() {
    local layer_name=$1
    echo "Building $layer_name layer..."
    cd "layers/$layer_name/nodejs" || exit
    
    # Remove existing node_modules
    rm -rf node_modules package.json
    
    # Copy appropriate package.json based on layer
    case $layer_name in
        "core-dependencies")
            echo '{
                "dependencies": {
                    "@nestjs/common": "^10.0.0",
                    "@nestjs/core": "^10.0.0",
                    "@nestjs/platform-express": "^10.0.0",
                    "@nestjs/config": "^3.2.0",
                    "@vendia/serverless-express": "^4.12.6",
                    "express": "^4.18.2",
                    "bcrypt": "^5.1.1",
                    "cookie-parser": "^1.4.6",
                    "express-session": "^1.18.0"
                }
            }' > package.json
            ;;
        "graphql-db")
            echo '{
                "dependencies": {
                    "@nestjs/graphql": "^12.0.11",
                    "@nestjs/apollo": "^12.0.11",
                    "@nestjs/typeorm": "^10.0.1",
                    "typeorm": "^0.3.20",
                    "pg": "^8.11.3",
                    "graphql": "^16.8.1"
                }
            }' > package.json
            ;;
        "auth-utils")
            echo '{
                "dependencies": {
                    "@nestjs/jwt": "^10.2.0",
                    "@nestjs/passport": "^10.0.3",
                    "passport": "^0.7.0",
                    "passport-jwt": "^4.0.1",
                    "passport-local": "^1.0.0",
                    "jsonwebtoken": "^9.0.2"
                }
            }' > package.json
            ;;
        "aws")
            echo '{
                "dependencies": {
                    "@aws-sdk/client-ses": "^3.723.0",
                    "@aws-sdk/client-s3": "latest",
                    "@aws-sdk/client-secrets-manager": "latest"
                }
            }' > package.json
            ;;
    esac
    
    # Install production dependencies
    npm install --production
    
    # Clean up unnecessary files
    echo "Cleaning up $layer_name layer..."
    if [ -d "node_modules" ]; then
        find node_modules -type f -name "*.d.ts" -delete
        find node_modules -type f -name "*.map" -delete
        find node_modules -type f -name "*.md" -delete
        find node_modules -type f -name "LICENSE" -delete
        find node_modules -type f -name "*.ts" ! -name "*.d.ts" -delete
        find node_modules -type f -name "*.txt" -delete
        find node_modules -type f -name "*.json" ! -name "package.json" -delete
        find node_modules -type d -empty -delete
    fi
    
    cd ../../..
}

echo "Building layers..."
# Build consolidated layers
build_layer "core-dependencies"
build_layer "graphql-db"
build_layer "auth-utils"
build_layer "aws"

# Show layer sizes
echo -e "\nLayer sizes:"
for layer in core-dependencies graphql-db auth-utils aws; do
    size=$(du -sh "layers/$layer/nodejs/node_modules" 2>/dev/null | cut -f1)
    echo "$layer layer: $size"
done
