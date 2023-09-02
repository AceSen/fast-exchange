import { request } from './request';
import CryptoJS from "crypto-js";

const config = {
    baseURL: "https://www.okx.com"
};

/**
 * 签名
 * @param {*String} method 请求方式
 * @param {*String} url 路径
 */
function getOkSign(method, url, timestamp, secret, body) {
    if (!method || !url || !timestamp || !secret) {
      return null;
    }

    return CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(timestamp + method.toUpperCase() + url + body, secret)
    );
  }

  /**
   * 
   * @param {*} param 
   * @param {*} headers 
   * @param {*} secret 
   * @returns 
   */
function getBalance(param, headers, secret) {
    config.method = 'get';
    config.url = '/api/v5/asset/balances';
    const timestamp = new Date().toISOString();
    const sign = getOkSign(config.method, config.url, timestamp, secret, '');
    config.headers = {
        "OK-ACCESS-SIGN": sign,
        "OK-ACCESS-TIMESTAMP": timestamp,
        ...headers,
    }

    return request(config);
}

function getCcyList(param, headers, secret) {
    config.method = 'get';
    config.url = '/api/v5/asset/currencies';
    const timestamp = new Date().toISOString();
    const sign = getOkSign(config.method, config.url, timestamp, secret, '');
    config.headers = {
        "OK-ACCESS-SIGN": sign,
        "OK-ACCESS-TIMESTAMP": timestamp,
        ...headers,
    }

    return request(config);
}

function withdrawal(param, headers, secret) {
    config.method = 'post';
    config.url = '/api/v5/asset/withdrawal';
    const timestamp = new Date().toISOString();
    const sign = getOkSign(config.method, config.url, timestamp, secret, JSON.stringify(param));
    console.log(JSON.stringify(param))
    config.headers = {
        "OK-ACCESS-SIGN": sign,
        "OK-ACCESS-TIMESTAMP": timestamp,
        ...headers,
    };
    config.data = param;

    return request(config);
}

/**
 * 查询充币历史记录
 * @param {*} param 
 * @param {*} headers 
 * @param {*} secret 
 * @returns 
 */
function getDepositHis(param, headers, secret) {
    config.method = 'get';
    config.url = '/api/v5/asset/deposit-history';
    const timestamp = new Date().toISOString();
    const sign = getOkSign(config.method, config.url, timestamp, secret, '');
    config.headers = {
        "OK-ACCESS-SIGN": sign,
        "OK-ACCESS-TIMESTAMP": timestamp,
        ...headers,
    };
    return request(config)
}

/**
 * 获取充值地址
 * @param {*} param 
 * @param {*} headers 
 * @param {*} secret 
 * @returns 
 */
function getDepositAddr(param, headers, secret) {
    config.method = 'get';
    config.url = '/api/v5/asset/deposit-address?ccy=' + param;
    const timestamp = new Date().toISOString();
    const sign = getOkSign(config.method, config.url, timestamp, secret, '');
    config.headers = {
        "OK-ACCESS-SIGN": sign,
        "OK-ACCESS-TIMESTAMP": timestamp,
        ...headers,
    };
    return request(config)
}


export default {
    getBalance,
    getCcyList,
    withdrawal,
    getDepositHis,
    getDepositAddr,
}

