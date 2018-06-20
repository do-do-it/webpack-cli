/*
 * @Author: 张敏
 * @Date: 2018-04-17 09:18:17
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-06-20 09:36:19
 */

/**
 * 封装localStorage
 */

class Storage {
    constructor(opt) {
        this.opt = opt || {};
        this.prefix = this.opt.prefix || '';
    }
    set(key, value, expiredays = 0) {
        const dbData = {
            data: value,
            expire_time: this._formatDate('yyyy-MM-dd', new Date(new Date().getTime() + expiredays * 24 * 3600 * 1000))
        };
        try {
            window.localStorage.setItem(this._getkey(key), JSON.stringify(dbData));
        } catch (e) {

        }
    }
    get(key) {
        const today = this._formatDate();
        let value = null;
        try {
            const dbData = JSON.parse(window.localStorage.getItem(this._getkey(key)));
            if (dbData.expire_time >= today) {
                value = dbData.data;
            }
        } catch (e) {

        }
        return value;
    }
    remove(key) {
        let data = null;
        try {
            data = window.localStorage.getItem(this._getkey(key));
        } catch (e) {

        }
        if (data) {
            try {
                window.localStorage.removeItem(this._getkey(key));
            } catch (e) {

            }
        }
    }
    _getkey(key) {
        return `${this.prefix}-${key}`;
    }
    _formatDate(format = 'yyyy-MM-dd', date) {
        const now = date || new Date();
        const rule = {
            'M+': now.getMonth() + 1,
            'd+': now.getDate(),
            'h+': now.getHours(),
            'm+': now.getMinutes(),
            's+': now.getSeconds(),
            'q+': Math.floor((now.getMonth() + 3) / 3),
            'S+': now.getMilliseconds()
        };
        let formatStr = format;
        if (/(y+)/i.test(formatStr)) {
            formatStr = formatStr.replace(RegExp.$1, (now.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let k in rule) {
            if (new RegExp(`(${k})`).test(formatStr)) {
                formatStr = formatStr.replace(RegExp.$1, RegExp.$1.length === 1
                    ? rule[k] : ('00' + rule[k]).substr(('' + rule[k]).length));
            }
        }
        return formatStr;
    }
}

export default Storage;
