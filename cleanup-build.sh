#!/bin/bash

# Clean up unnecessary files in node_modules
echo "Cleaning up node_modules..."
cd .aws-sam/build/BngFunction

# Remove unnecessary files
find node_modules -type f -name "*.md" -delete
find node_modules -type f -name "LICENSE" -delete
find node_modules -type f -name "*.txt" -delete
find node_modules -type f -name "README*" -delete
find node_modules -type f -name "CHANGELOG*" -delete
find node_modules -type f -name "CONTRIBUTING*" -delete
find node_modules -type f -name ".npmignore" -delete
find node_modules -type f -name ".travis.yml" -delete
find node_modules -type f -name ".eslintrc*" -delete
find node_modules -type f -name ".prettierrc*" -delete

# Remove test directories
find node_modules -type d -name "__tests__" -exec rm -rf {} +
find node_modules -type d -name "test" -exec rm -rf {} +
find node_modules -type d -name "tests" -exec rm -rf {} +

# Remove documentation
find node_modules -type d -name "docs" -exec rm -rf {} +
find node_modules -type d -name "doc" -exec rm -rf {} +
find node_modules -type d -name "documentation" -exec rm -rf {} +

# Remove empty directories
find node_modules -type d -empty -delete

echo "Cleanup complete!"
