module.exports = {
    extends: [
      'plugin:vue/vue3-recommended',
      'airbnb-base',
    ],
    plugins: [
      'vue',
    ],
    rules: {
      'no-console': 'off', // 如果你不想限制console输出，可以把这个规则关闭
      'vue/max-attributes-per-line': ['error', {
        singleline: 5, // 在单行上最多允许5个属性
        multiline: {
          max: 1, // 在多行上允许一个属性
          allowFirstLine: false // 不允许属性和开始标签放在同一行
        }
      }],
      // 在vue模板文件中强制使用4个空格缩进
      'vue/html-indent': ['error', 2]
    },
  };