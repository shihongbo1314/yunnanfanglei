<template>
    <div style="width: 100%;height: 100%">
        <div class="table">
            <div class="header">
                <div class="header-top">
                    <div>
                        <span style="width:80px;text-align: left;">项目名称：</span>
                        <el-input
                            style="width:60%;"
                            v-model="number"
                            placeholder="请填写项目名称"
                        ></el-input>

                    </div>
                    <div style="line-height:32px;">
                        <span>报价金额范围：</span>
                        <el-input
                            class="inputsty"
                            v-model="startMoney"
                            placeholder="报价金额开始范围"
                            type='number'
                        ></el-input>
                        <span style="width:20px;margin:0 10px;display:block">至</span>
                        <el-input
                            class="inputsty"
                            v-model="endMoeny"
                            placeholder="报价金额结束范围"
                            type='number'
                        ></el-input>
                    </div>
                    <span>项目归属：</span>
                    <el-input style="width: 240px;" v-model="company" disabled></el-input>
                    
                </div>
                <div class="header-bottom">

                    <div>
                        <el-date-picker
                            v-model="invoiceTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="报价开始时间"
                            end-placeholder="报价结束时间"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                            style="margin-right:5px;"
                        >
                        </el-date-picker>
                        <span>行政区划：</span>
                        <el-input
                            class="inputsty"
                            v-model="regionName"
                            placeholder="请填写行政区划"
                        ></el-input>
                        <span>报价单状态：</span>
                        <el-select
                            v-model="appstatusvalue"
                            placeholder="请选择"
                            clearable
                            multiple
                            style="z-index:99"
                        >
                            <el-option
                                v-for="(item,index) in appstatus "
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <el-button
                            type="info"
                            size="small"
                            @click.stop="selectSummary"
                            style="margin-left: 18px"
                        > 查询 </el-button>
                        <el-button
                            type="primary"
                            size="small"
                            @click.stop="downloadFile"
                        > 下载 </el-button>

                    </div>
                </div>
            </div>
            <div class="content">
                <table
                    border
                    cellpadding="0"
                    cellspacing="0"
                    boderColor="#ababab"
                >
                    <thead>
                        <tr class="head">
                            <th colspan="17"> {{userInfo.regionIdMap.name + '项目报价统计表'}} </th>
                        </tr>
                    </thead>
                </table>
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    heigth="540"
                    v-loading="loading"
                    border
                >
                    <el-table-column
                        label="序号"
                        prop="content.xuhao"
                        width="80px"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        label="项目名"
                        prop="content.number"
                    >
                    </el-table-column>
                    <el-table-column
                        label="委托方"
                        prop="content.compy"
                    >
                    </el-table-column>
                    <el-table-column
                        label="报价方"
                        prop="content.bidder"
                    >
                    </el-table-column>

                    <el-table-column
                        label="报价金额"
                        prop="content.money"
                    >
                    </el-table-column>
                    <el-table-column
                        label="联系人"
                        prop="content.contacts"
                    >
                    </el-table-column>
                    <el-table-column
                        label="联系电话"
                        prop="content.phone"
                    >
                    </el-table-column>
                    <el-table-column
                        label="报价日期"
                        prop="content.save_time"
                    >
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { statisticsData, statisticsFile } from "@/api/aviation.js";
export default {
    data() {
        return {
            userInfo: JSON.parse(sessionStorage.getItem("records")),
            tabDate: [],
            tableData: [],
            number: "",
            invoiceTime: [],
            regionName: "",
            startMoney: "",
            endMoeny: "",
            company:"",
            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "今年",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setMonth(0);
                            start.setDate(1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "去年",
                        onClick(picker) {
                            var oDate = new Date();
                            var prevYear = oDate.getFullYear() - 1;
                            const end = new Date();
                            const start = new Date();
                            start.setFullYear(prevYear);
                            start.setMonth(0);
                            start.setDate(1);

                            end.setFullYear(prevYear);
                            end.setMonth(11);
                            end.setDate(31);

                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
            loading: false,
            appstatusvalue: "",
            appstatus: [
                {
                    value: "4",
                    label: "创建完成",
                },
                {
                    value: "5",
                    label: "已保存报告",
                },
                {
                    value: "6",
                    label: "县审核中",
                },
                {
                    value: "7",
                    label: "县审核通过",
                },
                {
                    value: "8",
                    label: "县审核不通过",
                },
                {
                    value: "9",
                    label: "州市审核中",
                },
                {
                    value: "10",
                    label: "州市审核通过",
                },
                {
                    value: "15",
                    label: "省级审核中",
                },
                {
                    value: "16",
                    label: "省级审核通过",
                },
                {
                    value: "17",
                    label: "省级审核不通过",
                },
                {
                    value: "18",
                    label: "县级退回",
                },
                {
                    value: "19",
                    label: "市级退回",
                },
                {
                    value: "20",
                    label: "省级退回",
                },
                {
                    value: "21",
                    label: "被退回在编辑",
                },
                {
                    value: "22",
                    label: "在编辑已提交",
                },
                {
                    value: "23",
                    label: "已转交",
                },
                {
                    value: "24",
                    label: "被转交",
                },
                {
                    value: "26",
                    label: "完整通过",
                },
            ],
        };
    },
    computed: {
        sessionlevel() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            return records.roleIdMap.level;
        },
    },
    watch: {
        invoiceTime(val) {
            if (val == null) {
                this.invoiceTime = [];
                this.selectSummary();
            }
        },
    },
    mounted() {
        this.selectSummary();
    },
    methods: {
        selectSummary() {
            this.loading = true;
            this.tableData = [];
            const regiId = JSON.parse(sessionStorage.getItem("records"));
            this.company = regiId.company == '1' ? '云南省气象灾害防御技术中心' : '云南启旭科技有限公司';
            let parameter = {
                regionId: regiId.regionIdMap.id,
                number: this.number,
                startMoney: this.startMoney,
                endMoeny: this.endMoeny,
                startSaveTime: this.invoiceTime[0],
                endSaveTime: this.invoiceTime[1],
                regionName: this.regionName,
                states: this.appstatusvalue.toString(),
                company: regiId.company
            };
            statisticsData(parameter).then((res) => {
               /*  console.log(res); */
                this.loading = false;
                if (res.data.state == 200 && res.data.stateStr == "成功") {
                    this.tabDate = res.data.records;
                    for (var i in this.tabDate) {
                        this.tableData.push({
                            address: i,
                            content: this.tabDate[i],
                        });
                    }
                } else {
                    this.tableData = [];
                }
            });
        },
        //
        downloadFile() {
            const regiId = JSON.parse(sessionStorage.getItem("records"));
            let parameter = {
                regionId: regiId.regionIdMap.id,
                number: this.number,
                startMoney: this.startMoney,
                endMoeny: this.endMoeny,
                startSaveTime: this.invoiceTime[0],
                endSaveTime: this.invoiceTime[1],
                regionName: this.regionName,
                states: this.appstatusvalue.toString(),
                company: regiId.company
            };
            statisticsFile(parameter).then((res) => {
                if (res.data.state == 200 && res.data.stateStr == "成功") {
                    var iframe = document.createElement("a");
                    iframe.href =
                        "http://140.249.209.176:8084/LightningDetection/quotation/" +
                        res.data.records;
                    iframe.click();
                    iframe.remove();
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
table,
table tr th,
table tr td {
    border: 1px solid #a8d3f1;
}
.table {
    width: 100%;
    height: 100%;
    .header {
        padding: 10px 24px;
        text-align: right;
        background: #fff;
        margin-bottom: 6px;
        border-radius: 5px;
        .header-top {
            margin-bottom: 10px;
        }
        .header-bottom {
            display: flex;
            justify-content: space-between;
        }
        div {
            display: flex;
            span {
                width: 120px;
                display: inline-block;
                line-height: 32px;
            }
            .inputsty {
                width: 30%;
            }
        }
    }
    .content {
        padding: 24px;
        background: #fff;
        border-radius: 5px;
        height: calc(100% - 100px);
        overflow-y: auto;
        table {
            width: 100%;
            border-collapse: collapse;
            .head {
                background: #e8f3ff;
                th {
                    font-size: 24px;
                    font-weight: 500;
                    padding: 24px 0;
                }
            }
            .cot {
                width: 100%;
                height: 750px;
                overflow-y: scroll;
                tr {
                    width: 100%;
                }
                th {
                    padding: 24px 0;
                    font-size: 13px;
                    font-weight: 400;
                    width: 5.9%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    text-align: center;
                }
                td {
                    padding: 12px 0 12px 18px;
                }
            }
        }
        ::v-deep .el-table .cell {
            color: #000;
        }
        .el-table--border:after,
        .el-table--group:after,
        .el-table:before {
            background-color: #a8d3f1;
        }
        .el-table--border,
        .el-table--group {
            border-color: #a8d3f1;
        }
        .el-table td,
        .el-table th.is-leaf {
            border-bottom: 1px solid #a8d3f1;
        }
        .el-table--border th,
        .el-table--border th.gutter:last-of-type {
            border-bottom: 1px solid #a8d3f1;
        }
        .el-table--border td,
        .el-table--border th {
            border-right: 1px solid #a8d3f1;
        }
    }
    ::v-deep.el-dialog__body {
        text-align: center;
    }
}
::v-deep .el-date-editor .el-range__icon {
    line-height: 25px;
}
::v-deep .el-date-editor .el-range-separator {
    line-height: 25px;
}
::v-deep .el-input__inner {
    height: 32px;
    line-height: 30px;
}
::v-deep input {
    height: 30px !important;
    line-height: 30px !important;
}
::v-deep .el-checkbox {
    line-height: 32px;
    margin: 0 15px;
}
</style>