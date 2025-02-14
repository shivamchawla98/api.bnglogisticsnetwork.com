#!/bin/bash

echo "Main package size:"
du -sh .
echo "\nNode modules size:"
du -sh node_modules

echo "\nLargest dependencies:"
du -sh node_modules/* | sort -hr | head -n 20

echo "\nCore layer size:"
du -sh layers/core/nodejs/node_modules

echo "\nDependencies layer size:"
du -sh layers/dependencies/nodejs/node_modules
