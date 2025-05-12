// 扩展webpack  没有成功 无语---------------------
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname,'src')
    }
  }
}