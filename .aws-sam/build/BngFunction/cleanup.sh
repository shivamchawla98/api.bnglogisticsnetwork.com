#!/bin/bash

function cleanup_node_modules() {
    local dir=$1
    echo "Cleaning up $dir"
    
    # Remove unnecessary files and directories
    find "$dir" -type d -name "test" -exec rm -rf {} +
    find "$dir" -type d -name "tests" -exec rm -rf {} +
    find "$dir" -type d -name "docs" -exec rm -rf {} +
    find "$dir" -type d -name "doc" -exec rm -rf {} +
    find "$dir" -type d -name "example" -exec rm -rf {} +
    find "$dir" -type d -name "examples" -exec rm -rf {} +
    find "$dir" -type f -name "*.md" -delete
    find "$dir" -type f -name "*.ts" ! -name "*.d.ts" -delete
    find "$dir" -type f -name "*.map" -delete
    find "$dir" -type f -name "LICENSE*" -delete
    find "$dir" -type f -name "README*" -delete
    find "$dir" -type f -name "CHANGELOG*" -delete
    find "$dir" -type f -name ".npmignore" -delete
    find "$dir" -type f -name ".gitignore" -delete
    find "$dir" -type f -name ".travis.yml" -delete
    find "$dir" -type f -name ".eslintrc*" -delete
    find "$dir" -type f -name ".prettierrc*" -delete
}

# Clean up auth layer
cd layers/auth/nodejs
cleanup_node_modules "node_modules"
cd ../../..

# Clean up aws layer
cd layers/aws/nodejs
cleanup_node_modules "node_modules"
cd ../../..

# Clean up core layer
cd layers/core/nodejs
cleanup_node_modules "node_modules"
cd ../../..

# Clean up db layer
cd layers/db/nodejs
cleanup_node_modules "node_modules"
cd ../../..

# Clean up dependencies layer
cd layers/dependencies/nodejs
cleanup_node_modules "node_modules"
cd ../../..

# Clean up graphql layer
cd layers/graphql/nodejs
cleanup_node_modules "node_modules"
cd ../../..

# Clean up utils layer
cd layers/utils/nodejs
cleanup_node_modules "node_modules"
cd ../../..

# Clean up main function
cleanup_node_modules "node_modules"
