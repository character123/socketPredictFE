import axios from 'axios'

export function login(userInfo) {
  console.log('login userInfo')
  console.log(userInfo)
  return axios.post('/backApi/login' + '?username=' + userInfo.username + '&password=' + userInfo.password, userInfo)
}

export function register(userInfo) {
  console.log('register userInfo')
  console.log(userInfo)
  return axios.post('/backApi/register', userInfo)
}

export function dailyData(socketInfo) {
  console.log('dailyData socketInfo')
  console.log(socketInfo)
  return axios.get('/backApi/dailyData' + '?stock_code=' + socketInfo.socketCode + '&ds=' + socketInfo.ds + '&quarter=' + socketInfo.quarter, socketInfo)
}

export function minuteData(socketInfo) {
  console.log('minuteData socketInfo')
  console.log(socketInfo)
  return axios.get('/backApi/minuteData' + '?stock_code=' + socketInfo.stock_code, socketInfo)
}

export function textPrediction(text) {
  console.log('textPrediction text')
  console.log(text)
  return axios.post('/backApi/textPrediction' + '?text=' + text, text)
}

export function stockList() {
  console.log('stockList')
  return axios.get('/backApi/stockList')
}

export function userInfo() {
  return axios.post('/user/getInfo')
}

export function logout() {
  return axios.post('/login/logout')
}
