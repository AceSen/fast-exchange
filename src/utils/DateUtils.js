export default {
    /**
     * 暂停运行
     * @param {*number} ms 
     * @returns 
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * 格式化时间
     * @param {*Date} dateTime 
     * @returns 
     */
    formatDateTime(dateTime) {
        let Y = dateTime.getFullYear();
        let M = (dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1);
        let D = (dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate());
        let h = (dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours());
        let m = (dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes());
        let s = (dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds());
        let ms = dateTime.getMilliseconds();
        let strDate = `${Y}/${M}/${D} ${h}:${m}:${s}:${ms}`;
        return strDate;
    },
}