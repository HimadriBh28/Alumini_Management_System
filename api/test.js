const fs = require('fs');
const path = require('path');

console.log('Current directory:', __dirname);
console.log('Files in current dir:', fs.readdirSync(__dirname));

// Try to find backend
try {
    console.log('Looking for backend at:', path.join(__dirname, '..', 'backend'));
    console.log('Backend exists?', fs.existsSync(path.join(__dirname, '..', 'backend')));
    
    if (fs.existsSync(path.join(__dirname, '..', 'backend'))) {
        console.log('Backend contents:', fs.readdirSync(path.join(__dirname, '..', 'backend')));
    }
} catch (e) {
    console.log('Error:', e.message);
}
