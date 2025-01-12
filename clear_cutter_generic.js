const fs = require('fs');
const path = require('path');

let files = fs.readdirSync(__dirname);
console.log('Initial files:', files);

for (const file of files) {
    const ext = path.extname(file).slice(1); // Get the file extension without the dot
    if (ext) { // Skip files without extensions (like hidden files or folders)
        const dirPath = path.join(__dirname, ext); // Folder named after the extension
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
    }
}

files = fs.readdirSync(__dirname); // Update the record after creating directories

for (const file of files) {
    const ext = path.extname(file).slice(1); // Get the file extension without the dot
    if (ext) { // Skip files without extensions
        const oldPath = path.join(__dirname, file);
        const newPath = path.join(__dirname, ext, file);
        fs.renameSync(oldPath, newPath);
    }
}

console.log('Organized files:', fs.readdirSync(__dirname));