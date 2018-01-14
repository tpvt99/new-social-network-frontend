/* eslint-disable no-unused-vars */
import { LOGIN_URL, REGISTER_URL, CHECK_AUTHENTICATION, LOGOUT_URL, CHECK_NETWORKAUTHENTICATION } from '../api/api.js'
import { getCookie, csrfSafeMethod } from '../security/cookie.js'
import routes from '../url/url.js'
import querystring from 'query-string'
import axios from 'axios'

export default {
  login (context, data, redirect) {
    var that = this
    context.$http({
      method: 'post',
      baseURL: LOGIN_URL,
      data: querystring.stringify(data),
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    }).then(function (data) {
      if (data.data.status_code === 200) {
        window.location.replace('/timeline/')
      } else {
        context.error = 'Email hoặc mật khẩu không chính xác'
      }
    })
  },
  register (context, data, redirect) {
    var that = this
    context.$http({
      baseURL: REGISTER_URL,
      method: 'post',
      data: querystring.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      withCredentials: true
    }).then(function (data) {
      var s = data.data.status
      if (s === 'error') {
        context.error = 'Có lỗi xảy ra. Vui lòng tải lại trang'
      } else if (s === 'email') {
        context.error_email = 'Email đã được đăng kí hoặc không hợp lệ'
      } else if (s === 'password') {
        context.error_password = 'Mật khẩu tối thiểu 6 kí tự'
      } else if (s === 'fullname') {
        context.error_fullname = 'Tên đăng kí chứa kí tự không hợp lệ'
      } else {
        window.location.replace(routes.timeline.path)
      }
    })
  },
  logout (context, redirect) {
    context.$http({
      method: 'post',
      baseURL: LOGOUT_URL,
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      withCredentials: true
    }).then(function (data) {
      if (data.data.status_code === 'ok') {
        context.$router.push(redirect)
      }
    })
  },
  checkAuthentication (resolve, reject) {
    axios({
      method: 'GET',
      baseURL: CHECK_AUTHENTICATION,
      withCredentials: true
    }).then(function (response) {
      var data = JSON.parse(response.data.replace('while(1);', ''))
      if (data.status_code === 'ok') {
        resolve(data.user)
      } else {
        reject()
      }
    })
  },
  checkNetworkAuthentication (resolve, reject) {
    axios({
      method: 'GET',
      baseURL: CHECK_NETWORKAUTHENTICATION,
      withCredentials: true
    }).then(function (response) {
      var data = JSON.parse(response.data.replace('while(1);', ''))
      if (data.status_code === 'ok') {
        resolve(data.data)
      } else {
        reject()
      }
    })
  }
}
