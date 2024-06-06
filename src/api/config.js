
import request from '@/utils/request'
/* 环节配置 */
/* 分页查询接口 */
export function settingConfig(params) {
    return request({
        url: 'LightningDetection/setting-link/page',
        method: 'post',
        params
    })
}
/* 删除接口 */
export function settingDelete(params) {
    return request({
        url: 'LightningDetection/setting-link/delete',
        method: 'post',
        params
    })
}
/* 添加接口 */
export function settingSaveOrUpdate(params) {
    return request({
        url: 'LightningDetection/setting-link/saveOrUpdate',
        method: 'post',
        params
    })
}
/* 查询指定行政区划是否配置 */
export function settingGetByRegionId(params) {
    return request({
        url: 'LightningDetection/setting-link/getByRegionId',
        method: 'post',
        params
    })
}
/* 分页获得设备记录 */
export function equipmentpage(params) {
    return request({
        url: '/LightningDetection/equipment/page',
        method: 'post',
        params
    })
}
/* 添加修改设备 */
export function equipmentsaveOrUpdate(params) {
    return request({
        url: '/LightningDetection/equipment/saveOrUpdate',
        method: 'post',
        data:params
    })
}
/* 添加修改设备 */
export function equipmentremove(params) {
    return request({
        url: '/LightningDetection/equipment/remove',
        method: 'post',
        params
    })
}