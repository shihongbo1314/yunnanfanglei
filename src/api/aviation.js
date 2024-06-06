import request from '@/utils/request'
/* 项目信息分页查询 */
export function getProject(params) {
    return request({
        url: 'LightningDetection/project-record/page',
        method: 'post',
        params
    })
}
/* 项目备案（添加或修改） */
export function addProject(params) {
    return request({
        url: 'LightningDetection/project-record/saveOrUpdate',
        method: 'post',
        data: params
    })
}
/* 备案项目state 35 提交审核员确定 */
export function SubmitAuditorQueding(params) {
    return request({
        url: 'LightningDetection/project-record/projectFilings',
        method: 'post',
        params
    })
}
/* 查询备案审核任务 */
export function ExaminePage(params) {
    return request({
        url: 'LightningDetection/record-examine/list',
        method: 'post',
        params
    })
}
/* 项目审核 */
export function Examine(params) {
    return request({
        url: 'LightningDetection/record-examine/examine',
        method: 'post',
        params
    })
}
/* 项目检测报告保存 */
export function updateTestImg(params) {
    return request({
        url: 'LightningDetection/project-record/updateTestImg',
        method: 'post',
        params
    })
}
/* 获取对接人 */ /* 转交用户列表 */
export function getDockUser(params) {
    return request({
        url: 'LightningDetection/user-info/getDockUser',
        method: 'post',
        params
    })
}
/* 获取上级别列表 */
export function getDockUserParent(params) {
    return request({
        url: 'LightningDetection/user-info/getDockUserParent',
        method: 'post',
        params
    })
}
/* 提交对接人 */
export function selectDockUser(params) {
    return request({
        url: 'LightningDetection/project-record/selectDockUser',
        method: 'post',
        params
    })
}
/* 对接人选择审核人 */
export function DockProject(params) {
    return request({
        url: 'LightningDetection/project-record/DockProject',
        method: 'post',
        params
    })
}
/* 获取项目审核流程记录 */
export function selectProjectRecord(params) {
    return request({
        url: 'LightningDetection/record-examine/examineRecord',
        method: 'post',
        params
    })
}
/* 获得不同状态项目总数 */
export function getCount(params) {
    return request({
        url: 'LightningDetection/project-record/getCount',
        method: 'post',
        params
    })
}
/* 获取汇总表统计数据 */
export function selectSummary(params) {
    return request({
        url: 'LightningDetection/project-record/summaryData',
        method: 'post',
        params
    })
}
/* 生成汇总统计文件路径 */  
export function generateSummary(params) {
    return request({
        url: 'LightningDetection/project-record/summaryFile',
        method: 'post',
        params
    })
}
/* 生成备案统计表 */
export function generateRecord(params) {
    return request({
        url: 'LightningDetection/project-record/RecordStatisticsFile',
        method: 'post',
        params
    })
}
/* 查询统计生成表 */
export function selectRecord(params) {
    return request({
        url: 'LightningDetection/project-record/RecordStatisticsData',
        method: 'post',
        params
    })
}
/* 删除项目 */
export function removeProject(params) {
    return request({
        url: 'LightningDetection/project-record/remove',
        method: 'post',
        params
    })
}
/* 修改项目 */
export function updateProject(data) {
    return request({
        url: 'LightningDetection/project-record/update',
        method: 'post',
        data
    })
}
/* 我参与的项目 */
export function myProject(params) {
    return request({
        url: 'LightningDetection/project-record/page',
        method: 'post',
        params
    })
}
/* -------------------------------- */
/* 添加刷新记录 */
export function refreshsave(params) {
    return request({
        url: 'LightningDetection/record-refresh/save',
        method: 'post',
        params
    })
}
/* 获得刷新记录 */
export function refreshgetByid(params) {
    return request({
        url: 'LightningDetection/record-refresh/getByid',
        method: 'post',
        params
    })
}
/* 修改刷新记录为需要刷新 */
export function refreshupdate(params) {
    return request({
        url: 'LightningDetection/record-refresh/update',
        method: 'post',
        params
    })
}
/* 删除刷新记录 */
export function refreshdelete(params) {
    return request({
        url: 'LightningDetection/record-refresh/delete',
        method: 'post',
        params
    })
}

/* ------------------- */
/* 查询项目的审核人员 */
export function getProjectExamineUser(params) {
    return request({
        url: 'LightningDetection/record-examine/getProjectExamineUser',
        method: 'post',
        params
    })
}
/* 查询这个项目的所有检测人列表及详细信息 */
export function getProjectTestUser(params) {
    return request({
        url: 'LightningDetection/project-record/getProjectTestUser',
        method: 'post',
        params
    })
}
/* 修改审核任务的备注 */
export function updateExamineRemarks(params) {
    return request({
        url: 'LightningDetection/record-examine/updateExamineRemarks',
        method: 'post',
        params
    })
}
/* 根据项目编号获得项目的全部信息 */
export function getProjectInfoById(params) {
    return request({
        url: 'LightningDetection/project-record/getProjectInfoById',
        method: 'post',
        params
    })
}
/* 获得当前审核任务的前一个任务的详细信息 */
export function getLastExamineInfo(params) {
    return request({
        url: 'LightningDetection/record-examine/getLastExamineInfo',
        method: 'post',
        params
    })
}
/* soket */
export function sendMsg(params) {
    return request({
        url: 'LightningDetection/websocket/sendMsg',
        method: 'post',
        params
    })
}


/* 转交 */
export function TransferProject(params) {
    return request({
        url: 'LightningDetection/record-examine/TransferProject',
        method: 'post',
        params
    })
}
/*  项目复用*/
export function multiplex(params) {
    return request({
        url: 'LightningDetection/project-record/multiplex',
        method: 'post',
        params
    })
}
/* ------------------上传签名-------------- */

export function uploadWebSignImg(params) {
    return request({
        url: 'LightningDetection/user-info/uploadWebSignImg',
        method: 'post',
        params
    })
}
/* 备案编制人预选 */
export function getDockUserbianzhi(params) {
    return request({
        url: '/LightningDetection/user-info/getDockUser',
        method: 'post',
        params
    })
}
/* 用户上传用户签名图片 */

export function uploadSignImg(data) {
    return request({
        url: '/LightningDetection/user-info/uploadSignImg',
        method: 'post',
        data
    })
}
/* 查询公式 */
export function getOne(params) {
    return request({
        url: '/LightningDetection/bill-formula/getOne',
        method: 'post',
        params
    })
}
/* 修改应返金额计算公式 */
export function getOneupdate(params) {
    return request({
        url: '/LightningDetection/bill-formula/update',
        method: 'post',
        params
    })
}
/* 项目统计接口 */
export function statistics(params) {
    return request({
        url: '/LightningDetection/project-record/statistics',
        method: 'post',
        params
    })
}
/* 撤回 */
export function reCallProject(params) {
    return request({
        url: '/LightningDetection/project-record/reCallProject',
        method: 'post',
        params
    })
}
/* 子项目 */
export function createSubproject(params) {
    return request({
        url: '/LightningDetection/project-record/createSubproject',
        method: 'post',
        params
    })
}
/* 查询审核任务 */
export function selectDockTask(params) {
    return request({
        url: '/LightningDetection/project-record/selectDockTask',
        method: 'post',
        params
    })
}
/* 修改任务的审核人 */
export function updateExamineReviewer(params) {
    return request({
        url: '/LightningDetection/record-examine/updateExamineReviewer',
        method: 'post',
        params
    })
}
/* 获取检测报告临时存储记录 */
export function temporarylist(params) {
    return request({
        url: '/LightningDetection/record-temporary/list',
        method: 'post',
        params
    })
}
/* 添加或者修改合同*/
export function ProjectinfoClick(params) {
    return request({
        url: '/LightningDetection/project-invoice/saveOrUpdate',
        method: 'post',
        params
    })
}
/* 删除合同信息*/
export function DeleteClick(params) {
    return request({
        url: '/LightningDetection/project-invoice/delete',
        method: 'post',
        params
    })
}
/* 返款台账表*/
export function RecordRefundData(params) {
    return request({
        url: '/LightningDetection/project-record/RecordRefundData',
        method: 'post',
        params
    })
}
export function RecordRefundExcel(params) {
    return request({
        url: '/LightningDetection/project-record/RecordRefundExcel',
        method: 'post',
        params
    })
}
/* 报价单创建修改 */
export function saveOrUpdate(params) {
    return request({
        url: '/LightningDetection/quotation/saveOrUpdate',
        method: 'post',
        params
    })
}
/* 分页查询报价单 */
export function quotationList(params) {
    return request({
        url: '/LightningDetection/quotation/page',
        method: 'post',
        params
    })
}
/* 报价单删除 */
export function quotationRemove(params) {
    return request({
        url: '/LightningDetection/quotation/remove',
        method: 'post',
        params
    })
}
/* 查询报价单可提交的管理员信息 */
export function getAdministrators(params) {
    return request({
        url: '/LightningDetection/quotation/getAdministrators',
        method: 'post',
        params
    })
}
/* 编制人提交至审核人 */
export function quotationsubmit(params) {
    return request({
        url: '/LightningDetection/quotationExamine/submit',
        method: 'post',
        params
    })
}
/* 查询个人待审核的报价单任务 */
export function quotationExaminelist(params) {
    return request({
        url: '/LightningDetection/quotationExamine/list',
        method: 'post',
        params
    })
}
/* 查询可以退回的用户列表 */
export function getBackUser(params) {
    return request({
        url: '/LightningDetection/quotationExamine/getBackUser',
        method: 'post',
        params
    })
}
/* 查询审核记录 */
export function examineRecord(params) {
    return request({
        url: '/LightningDetection/quotationExamine/examineRecord',
        method: 'post',
        params
    })
}
/* 报价单统计 */
export function statisticsData(params) {
    return request({
        url: '/LightningDetection/quotation/statistics',
        method: 'post',
        params
    })
}
/* 报价单统计下载 */
export function statisticsFile(params) {
    return request({
        url: '/LightningDetection/quotation/statisticsFile',
        method: 'post',
        params
    })
}
/* 查询审核记录 */
export function quotationExamineRecord(params) {
    return request({
        url: 'LightningDetection/quotationExamine/examineRecord',
        method: 'post',
        params
    })
}
/* 分页查看投标资料 */
export function tenderpage(params) {
    return request({
        url: '/LightningDetection/tender/page',
        method: 'post',
        params
    })
}
/* 删除投标资料 */
export function tenderdelete(params) {
    return request({
        url: '/LightningDetection/tender/delete',
        method: 'post',
        params
    })
}
/* 修改投标资料 */
export function tenderupdate(params) {
    return request({
        url: '/LightningDetection/tender/update',
        method: 'post',
        params
    })
}
/* 上传投标资料 */
export function tenderupload(params) {
    return request({
        url: '/LightningDetection/tender/upload',
        method: 'post',
        data: params
    })
}
/* ---------------------------------------------------- */

/* 查询申请开票记录 */
export function invoiceRequest(params) {
    return request({
        url: '/LightningDetection/invoice-request/list',
        method: 'post',
        params
    })
}
/* 申请开票 */
export function invoiceRequestsaveOrUpdate(params) {
    return request({
        url: '/LightningDetection/invoice-request/saveOrUpdate',
        method: 'post',
        params
    })
}
/* 市县用户删除开票请求 */
export function removeClickapplyForinfo(params) {
    return request({
        url: '/LightningDetection/invoice-request/remove',
        method: 'post',
        params
    })
}
/* 查询开票申请任务 */
export function invoiceexaminelist(params) {
    return request({
        url: '/LightningDetection/invoice-examine/list',
        method: 'post',
        params
    })
}
/* 开票任务审核（再次提交） */
export function invoiceexamineExamine(params) {
    return request({
        url: '/LightningDetection/invoice-examine/examine',
        method: 'post',
        params
    })
}
/* 获得项目的全部合同信息 */
export function getprojectAlllist(params) {
    return request({
        url: '/LightningDetection/project-invoice/list',
        method: 'post',
        params
    })
}
/* 申请废除 */
export function abolishinvoicecancel(params) {
    return request({
        url: '/LightningDetection/invoice-cancel-examine/cancel',
        method: 'post',
        params
    })
}
/* 省级管理查看待处理的废除申请 */
export function getinvoicecancel(params) {
    return request({
        url: '/LightningDetection/invoice-cancel-examine/list',
        method: 'post',
        params
    })
}
/* 审核（再次提交）废除任务 */
export function feichuinvoicecancel(params) {
    return request({
        url: '/LightningDetection/invoice-cancel-examine/examine',
        method: 'post',
        params
    })
}
/* 删除多个开票申请信息 */
export function removeByIds(params) {
    return request({
        url: 'LightningDetection/invoice-request/removeByIds',
        method: 'post',
        params
    })
}
/* 删除多个废除任务 */
export function removeByIdsDelete(params) {
    return request({
        url: 'LightningDetection/invoice-cancel-examine/removeByIds',
        method: 'post',
        params
    })
}
/* ------------------------------ */
export function examinePass(params) {
    return request({
        url: 'LightningDetection/record-examine/examine',
        method: 'post',
        params
    })
}
// 再次提交合并参数
export function NewexaminePass(data) {
    return request({
        url: 'LightningDetection/record-examine/examine',
        method: 'post',
        data
    })
}
/* 标记问题报告 */
export function postBiaoji(params) {
    return request({
        url: 'LightningDetection/project-record/updateProjectProblem',
        method: 'post',
        params
    })
}
/* 到账查询申请 */
export function examineSavePinzheng(params) {
    return request({
        url: '/LightningDetection/received-examine/save',
        method: 'post',
        data: params
    })
}
/* 到账查询申请 */
export function examineSelectPinzheng(params) {
    return request({
        url: '/LightningDetection/received-examine/list',
        method: 'post',
        params
    })
}
/* 到账查询审核 */
export function examineshenhePinzheng(params) {
    return request({
        url: '/LightningDetection/received-examine/examine',
        method: 'post',
        params
    })
}
export function examineshenhePinzheng2(params) {
    return request({
        url: '/LightningDetection/received-examine/examine',
        method: 'post',
        data: params
    })
}
