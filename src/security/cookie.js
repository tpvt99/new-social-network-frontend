/* eslint-disable no-redeclare */
export function createCookie (name, value, days) {
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    var expires = '; expires=' + date.toGMTString()
  } else {
    var expires = ''
  }
  document.cookie = escape(name) + '=' + escape(value) + expires + '; path=/'
}

export function getCookie (name) {
  if (document.cookie.length > 0) {
    var c = document.cookie.indexOf(name + '=')
    if (c !== -1) {
      c = c + name.length + 1
      var cend = document.cookie.indexOf(';', c)
      if (cend === -1) {
        cend = document.cookie.length
      }
      return unescape(document.cookie.substring(c, cend))
    }
  }
  return ''
}

export function csrfSafeMethod (method) {
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method))
}
