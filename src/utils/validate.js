/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['shengguanli','xianbeian','xianguanli','xianbianzhi','shiguanli','shiduijie','shibianzhi','shibeian','shengduijie','shishenhe','shengshenhe','shihongbo','shengzhongshen','shengbianyin','shengbeian']
  return valid_map.indexOf(str.trim()) >= 0
}
