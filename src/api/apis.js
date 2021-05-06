import axios from 'axios'

export function login(userInfo) {
  return axios.post('/backApi/login' + '?username=' + userInfo.username + '&password=' + userInfo.password, userInfo)
}

export function register(userInfo) {
  return axios.post('/backApi/register', userInfo)
}

export function dailyData(socketInfo) {
  return axios.get('/backApi/dailyData' + '?stock_code=' + socketInfo.socketCode + '&ds=' + socketInfo.ds + '&quarter=' + socketInfo.quarter, socketInfo)
}

export function minuteData(socketInfo) {
  return axios.get('/backApi/minuteDataV2' + '?stock_code=' + socketInfo.stock_code, socketInfo)
}

export function textPrediction(text) {
  return axios.post('/backApi/textPrediction' + '?text=' + text, text)
}

export function stockList() {
  return axios.get('/backApi/stockList')
}

export function userInfo() {
  return axios.post('/user/getInfo')
}

export function logout() {
  return axios.post('/login/logout')
}
