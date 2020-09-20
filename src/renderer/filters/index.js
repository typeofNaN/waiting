/**
 * @description 过滤器方法
 * @author typeofNaN
 * @time 2020-09-13
 */

import Tools from '@/utils/tools'

/**
 * @description 格式化时间
 * @author typeofNaN
 * @time 2020-09-13
 * @param { time } 需要被格式化的时间，可为时间对象，也可为时间字符串
 * @param { format } 时间格式化的格式 默认 yyyy-MM-dd hh:mm:ss
 * @returns 返回格式化后的时间
 */
export const parseTime = timeNum => Tools.parseTime(timeNum, '{y}/{m}/{d}')

/**
 * @desxription 将毫秒格式化成时间
 * @author typeofNaN
 * @time 2020-09-19
 * @param { t } 时间戳
 * @returns 格式化后的时间
 */
export const formatDuring = timeNum => Tools.formatDuring(timeNum)

/**
 * @desxription 将毫秒格式化成时间  多少天前
 * @author typeofNaN
 * @time 2020-09-20
 * @param { timeNum } 时间戳
 * @returns 格式化后的时间
 */
export const timeAgo = timeNum => Tools.timeAgo(timeNum)
