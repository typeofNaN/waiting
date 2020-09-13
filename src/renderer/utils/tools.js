/**
 * @description 工具类，提供一些常用方法
 * @author typeofNaN
 * @time 2020-09-13
 */

class Tools {
  /**
   * @description 生成随机DomId
   * @author typeofNaN
   * @time 2020-09-13
   * @param { len } 创建DomId的长度
   * @returns 返回DomId
   */
  createDomID (len) {
    return Number(Math.random().toString().substr(3, len)).toString(36)
  }

  /**
   * @description 对对象进行深拷贝
   * @author typeofNaN
   * @time 2020-09-13
   * @param { obj } 需要被拷贝的对象
   * @returns 返回深拷贝后的对象
   */
  copyObj (obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  /**
   * @description 时间格式化
   * @author typeofNaN
   * @time 2020-09-13
   * @param { time } 需要被格式化的时间，可为时间对象，也可为时间字符串
   * @param { format } 时间格式化的格式 默认 yyyy-MM-dd hh:mm:ss  {y}-{m}-{d} {h}:{i}:{s}
   * @returns 返回格式化后的时间
   */
  parseTime (time, format = '{y}-{m}-{d} {h}:{i}:{s}') {
    if (arguments.length === 0) {
      return ''
    }
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      }
      if ((typeof time === 'number') && (time.toString().length === 10)) {
        time = time * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return timeStr
  }

  /**
   * @description 生成随机数
   * @author typeofNaN
   * @time 2020-09-13
   * @param { min } 最小值
   * @param { max } 最大值
   * @returns 返回生成的随机数
   */
  randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  /**
   * @description 获取当前时间的时间戳
   * @author typeofNaN
   * @time 2020-09-13
   * @returns 返回当前时间的时间戳
   */
  getNowTime () {
    return new Date().getTime()
  }

  /**
   * @description 获取某天到今天之间的日期集合
   * @author typeofNaN
   * @time 2020-09-13
   * @param { num } 日期集合个数 默认30
   * @returns 返回日期集合
   */
  getDateList (num = 30) {
    const dateList = []
    for (let i = 0; i < num; i++) {
      dateList.unshift(new Date(new Date().setDate(new Date().getDate() - i)).toLocaleDateString())
    }
    return dateList
  }

  /**
   * @description 将字符串首字母格式化成大写
   * @author typeofNaN
   * @time 2020-09-13
   * @param { str } 需要被格式化的字符串
   * @returns 返回格式化完后的字符串
   */
  uppercaseFirstChar (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  /**
   * @description 判断是否是数组
   * @author typeofNaN
   * @time 2020-09-13
   * @param { arg } 判断的数组
   */
  isArray (arg) {
    if (typeof Array.isArray === 'undefined') {
      return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
  }

  /**
   * @description 时间计时器
   * @author typeofNaN
   * @time 2020-09-13
   * @param { datestr } 时间字符串
   * @param { timestamp } 时间戳
   * @returns 格式化后的时间
   */
  timeCount (datestr, timestamp) {
    if (!datestr) {
      return ''
    }
    const before = new Date(datestr).getTime()
    let now

    if (timestamp) {
      now = timestamp
    } else {
      now = new Date().getTime()
    }

    const between = now - before
    const d = ~~(between / (1000 * 60 * 60 * 24))
    const h = ~~(between / (1000 * 60 * 60)) - d * 24
    const m = ~~(between / (1000 * 60)) - (d * 24 + h) * 60
    const s = ~~(between / 1000) - ((d * 24 + h) * 60 + m) * 60

    return `${d}日${this.addZero(h)}小时${this.addZero(m)}分${this.addZero(s)}秒`
  }

  /**
   * @description 是否显示时间计时器
   * @author typeofNaN
   * @time 2020-09-13
   * @param { datestr } 时间字符串
   * @param { timestamp } 时间戳
   * @param { between } 时间戳
   * @returns true || false
   */
  showTimeout (datestr, timestamp, between) {
    if (!datestr) {
      return false
    }
    const before = new Date(datestr).getTime()
    const now = timestamp

    const b = now - before

    if (b > between) {
      return true
    } else {
      return false
    }
  }

  addZero (num) {
    let fmtNum = ''
    fmtNum = num < 10 ? '0' + num : num
    return fmtNum
  }

  /**
   * @description 获取当前日期
   * @author typeofNaN
   * @time 2020-09-13
   * @returns 日期
   */
  getDateStr (dt) {
    const time = new Date(dt)
    const year = time.getFullYear()
    const month = this.addZero(time.getMonth() + 1)
    const date = this.addZero(time.getDate())

    return `${year}-${month}-${date}`
  }

  /**
   * @description 获取 n 天前的日期
   * @author typeofNaN
   * @time 2020-09-13
   * @param { n } 日期天数
   * @returns n 天前的日期
   */
  getBeforeDate (n) {
    const time = this.getNowTime() - (n * 24 * 60 * 60 * 1000)
    return this.getDateStr(time)
  }

  /**
   * @description 将数字转换成千分位
   * @author typeofNaN
   * @time 2020-09-13
   * @param { num } 需要被格式化的数据
   * @returns 转换成千分位后的数据
   */
  numToKilo (num) {
    if (num) {
      return num.toLocaleString()
    } else {
      return '0'
    }
  }

  /**
   * @description 防抖函数
   * @author typeofNaN
   * @time 2020-09-13
   * @param { fn } 执行方法
   * @param { wait } 延迟时间
   */
  debounce (fn, wait = 500) {
    let timeout = null
    return function () {
      if (timeout !== null) clearTimeout(timeout)
      timeout = setTimeout(fn, wait)
    }
  }

  /**
   * @description 笛卡尔积
   * @author typeofNaN
   * @time 2020-09-13
   * @param { arr } 源二维数组
   */
  cartesianProduct (arr) {
    return arr.reduce((a, b) => a.map((x) => b.map((y) => x.concat([y]))).reduce((a, b) => a.concat(b), []), [[]]
    )
  }

  /**
   * @description 格式化比特大小
   * @author typeofNaN
   * @time 2020-09-13
   * @param { byteSize } 比特大小
   */
  formatterByteSize (byteSize) {
    if (byteSize < (1 << 10)) {
      return byteSize + ' b'
    } else if (byteSize >= (1 << 10) && byteSize < (1 << 20)) {
      return (byteSize / (1 << 10)).toFixed(2) + ' k'
    } else if (byteSize >= (1 << 20) && byteSize < (1 << 30)) {
      return (byteSize / (1 << 20)).toFixed(2) + ' M'
    } else if (byteSize >= (1 << 30) && byteSize < (1 << 40)) {
      return (byteSize / (1 << 30)).toFixed(2) + ' G'
    } else {
      return (byteSize / (1 << 30)).toFixed(2) + ' T'
    }
  }
}

export default new Tools()
