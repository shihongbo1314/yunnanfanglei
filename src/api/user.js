import request from '@/utils/request'
/* 用户分页接口 */
export function getList(params) {
    return request({
        url: '/LightningDetection/user-info/page',
        method: 'post',
        params
    })
}
/* 用户添加或修改 */
export function PostList(params) {
    return request({
        url: '/LightningDetection/user-info/saveOrUpdate',
        method: 'post',
        params
    })
}
/* 用户删除 */
export function RemoveUser(params) {
    return request({
        url: '/LightningDetection/user-info/remove',
        method: 'post',
        params
    })
}
/* 修改个人账户信息 */
export function update(params) {
    return request({
        url: '/LightningDetection/user-info/update',
        method: 'post',
        params
    })
}
/* 获得角色列表 */
export function GetroleList(params) {
    return request({
        url: '/LightningDetection/user-role/list',
        method: 'post',
        params
    })
}
/* 根据上一级编号查询下级全部区划信息 */
export function getInfoByParentCode(params) {
    return request({
        url: 'LightningDetection/user-region/getInfoByParentCode',
        method: 'post',
        params
    })
}
/* 修改二级角色 */
export function compiletwo(params) {
    return request({
        url: '/LightningDetection/user-multi-role/update',
        method: 'post',
        params
    })
}
/* 查询这个人拥有的全部角色 */
export function multirole(params) {
    return request({
        url: '/LightningDetection/user-multi-role/list',
        method: 'post',
        params
    })
}
/* 获取公告列表 */
export function selectCement(params) {
    return request({
        url: '/LightningDetection/record-notice/list',
        method: 'post',
        params
    })
}
/* 添加公告信息 */
export function addCement(data) {
    return request({
        url: '/LightningDetection/record-notice/saveOrUpdate',
        method: 'post',
        data
    })
}
/* 删除公告信息 */
export function delectCement(params) {
    return request({
        url: '/LightningDetection/record-notice/delete',
        method: 'post',
        params
    })
}
/* 启用公告信息 */
export function enableCement(params) {
    return request({
        url: '/LightningDetection/record-notice/enable',
        method: 'post',
        params
    })
}
/* 获取公章信息 */
export function queryStamp(params) {
    return request({
        url: '/LightningDetection/record-seal/page',
        method: 'post',
        params
    })
}
/* 上传公章信息 */
export function addStamp(params) {
    return request({
        url: '/LightningDetection/record-seal/saveOrUpdate',
        method: 'post',
        data: params
    })
}
/* 删除公章信息 */
export function removeStamp(params) {
    return request({
        url: '/LightningDetection/record-seal/remove',
        method: 'post',
        params
    })
}
/* 修改公章信息 */
export function editStamp(params) {
    return request({
        url: '/LightningDetection/record-seal/enable',
        method: 'post',
        params
    })
}
/* 公章使用记录 */
export function sealusage(params) {
    return request({
        url: 'LightningDetection/record-seal-usage/page',
        method: 'post',
        params
    })
}
/* 获得这个人的分页消息通知 */
export function projectmsg(params) {
    return request({
        url: 'LightningDetection/record-project-msg/page',
        method: 'post',
        params
    })
}
/* 获得未读消息数量 */
export function getMsgCount(params) {
    return request({
        url: 'LightningDetection/record-project-msg/getMsgCount',
        method: 'post',
        params
    })
}
/* 消息全部已读 */
export function AllRead(params) {
    return request({
        url: 'LightningDetection/record-project-msg/AllRead',
        method: 'post',
        params
    })
}
/* 用户列表（不分页） */
export function userinfolist(params) {
    return request({
        url: 'LightningDetection/user-info/list',
        method: 'post',
        params
    })
}
/* 获得留言列表 */
export function getMessList(params) {
    return request({
        url: 'LightningDetection/record-communication/list',
        method: 'post',
        params
    })
}
/* 进行留言 */
export function postMessList(params) {
    return request({
        url: 'LightningDetection/record-communication/save',
        method: 'post',
        params
    })
}
/* 留言已读 */
export function allreadMess(params) {
    return request({
        url: 'LightningDetection/record-communication/allread',
        method: 'post',
        params
    })
}
/* 留言已读 */
export function getCommunicationUser(params) {
    return request({
        url: 'LightningDetection/record-communication/getCommunicationUser',
        method: 'post',
        params
    })
}
/* 分页查看报告记录 */
export function getstatisticsmonthly(params) {
    return request({
        url: 'LightningDetection/statistics-monthly/page',
        method: 'post',
        params
    })
}
/* 生成统计报告 */
export function createMonthStatistics(params) {
    return request({
        url: 'LightningDetection/statistics-monthly/createMonthStatistics',
        method: 'post',
        params
    })
}
/* 删除统计报告 */
export function deleteMonthStatistics(params) {
    return request({
        url: 'LightningDetection/statistics-monthly/delete',
        method: 'post',
        params
    })
}