const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const updatedContent = content
            // Remove bcrypt imports/requires
            .replace(/const bcrypt = require\(['"]bcrypt['"]\);?/g, '')
            .replace(/const bcrypt = require\(['"]bcryptjs['"]\);?/g, '')
            .replace(/import \* as bcrypt from ['"]bcrypt['"];?/g, '')
            .replace(/import \* as bcrypt from ['"]bcryptjs['"];?/g, '')
            .replace(/import bcrypt from ['"]bcrypt['"];?/g, '')
            .replace(/import bcrypt from ['"]bcryptjs['"];?/g, '')
            .replace(/require\(['"]bcrypt['"]\)/g, '')
            .replace(/require\(['"]bcryptjs['"]\)/g, '')
            
            // Remove saltRounds
            .replace(/const saltRounds = \d+;?/g, '')
            
            // Replace bcrypt operations
            .replace(/await bcrypt\.hash\(([^,]+)[^)]+\)/g, '$1')
            .replace(/bcrypt\.hash\(([^,]+)[^)]+\)/g, '$1')
            .replace(/await bcrypt\.compare\(([^,]+),\s*([^)]+)\)/g, '$1 === $2')
            .replace(/bcrypt\.compare\(([^,]+),\s*([^)]+)\)/g, '$1 === $2')
            .replace(/const hashedPassword = (?:await )?bcrypt\.hash\(([^,]+)[^)]+\)/g, 'const hashedPassword = $1');

        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent);
            console.log(`Updated ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}

function walkDir(dir) {
    if (!fs.existsSync(dir)) {
        console.log(`Directory ${dir} does not exist, skipping...`);
        return;
    }
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (stat.isFile() && (filePath.endsWith('.js') || filePath.endsWith('.ts'))) {
            replaceInFile(filePath);
        }
    }
}

// Process both dist and .aws-sam directories
const directories = [
    path.join(__dirname, 'dist'),
    path.join(__dirname, '.aws-sam', 'build', 'BNGBackendFunction', 'dist')
];

directories.forEach(dir => {
    console.log(`Processing directory: ${dir}`);
    walkDir(dir);
});
