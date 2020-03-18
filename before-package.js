// 清理map文件
const fs = require('fs');

const tryRemove = file => {
    try {
        const stats = fs.statSync(file);
        fs.unlinkSync(file);
    } catch (e) {
    }
};

tryRemove("build/renderer.js.map");
tryRemove("build/main.js.map");

