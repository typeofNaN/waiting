/**
 * @description 本地数据持久化，将数据存在localstorage中
 * @author typeofNaN
 * @time 2020-09-17
 */

export default {
  get (name) {
    let value = localStorage.getItem(name)
    if (/^\{.*\}$/.test(value)) {
      value = JSON.parse(value)
    }
    return value
  },
  set (name, value) {
    if (typeof value === typeof {}) {
      value = JSON.stringify(value)
    }
    return localStorage.setItem(name, value)
  },
  remove (name) {
    return localStorage.removeItem(name)
  }
}
