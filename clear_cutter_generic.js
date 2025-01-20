const fs = require('fs').promises;
const path = require('path');

async function organizeFiles(dir) {
    try {
        let files = await fs.readdir(dir);
        console.log('Initial files:', files);

        for (const file of files) {
            const ext = path.extname(file).slice(1); // Get the file extension without the dot
            const fullPath = path.join(dir, file);

            const stat = await fs.lstat(fullPath);
            if (stat.isDirectory()) {
                continue; // Skip directories
            }

            if (ext) {
                const dirPath = path.join(dir, ext);
                if (!await fs.existsSync(dirPath)) {
                    await fs.mkdir(dirPath);
                }

                const newPath = path.join(dir, ext, file);
                await fs.rename(fullPath, newPath);
            }
        }

        files = await fs.readdir(dir);
        console.log('Organized files:', files);
    } catch (error) {
        console.error('Error organizing files:', error);
    }
}

organizeFiles(__dirname);
