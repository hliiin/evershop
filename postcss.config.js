// postcss.config.js
module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 16,  // 根元素字体大小，通常设置为 16 或 10
      propList: ["*"], // 转换所有属性，* 表示所有，默认是 ['*']
      minPixelValue: 2, // 小于等于 2px 的 px 不会被转换
    },
  },
};
