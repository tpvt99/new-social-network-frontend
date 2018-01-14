export default {
  setLocaleTime (dateObj) {
    dateObj.setHours(dateObj.getHours() + new Date().getTimezoneOffset() / 60 * (-1))
  },
  dateDiff (date1, date2) {
    var diff = Math.abs(Date.parse(date1) - Date.parse(date2))
    return isNaN(diff) ? NaN : {
      s: Math.floor(diff / 1000 % 60),
      m: Math.floor(diff / 60000 % 60),
      h: Math.floor(diff / 3600000 % 24),
      d: Math.floor(diff / 86400000),
      y: Math.floor(diff / (86400000 * 365))
    }
  },
  totalTime (date1, date2, time) {
    var diff = Math.abs(Date.parse(date1) - Date.parse(date2))
    return isNaN(diff) ? NaN : time === 's' ? Math.floor(diff / 1000) : time === 'm' ? Math.floor(diff / 60000) : undefined
  }
}
