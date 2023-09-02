export default {
    floatRate10: function() {
        return (1 + (Math.random() / 10)).toFixed(2);
    },

    floatRate: function(num) {
        return (1 + (Math.random() * num)).toFixed(2);
    },

    getRandomNum12: function() {
        const timestamp = Date.now().toString().slice(-8); // 获取后8位时间戳
        const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // 生成4位随机数
      
        return timestamp + randomPart;
    },
}