<template>
    <div style="width: 100%;height: 100%">
        <div class="table">
            <div class="header">
                <div class="header-top">
                    <div>
                        <el-date-picker
                            v-model="timeValue"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="备案开始时间"
                            end-placeholder="备案结束时间"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                        <span>行政区划：</span>
                        <el-input
                            class="inputsty"
                            v-model="regionName"
                            placeholder="请填写行政区划"
                        ></el-input>

                    </div>
                    <div style="line-height:32px;">
                        <span>合同额范围：</span>
                        <el-input
                            class="inputsty"
                            v-model="amountRangeStart"
                            placeholder="合同额开始范围"
                            type='number'
                        ></el-input>
                        <span style="width:20px;margin:0 10px;display:block">至</span>
                        <el-input
                            class="inputsty"
                            v-model="amountRangeEnd"
                            placeholder="合同额结束范围"
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
                            start-placeholder="开票开始时间"
                            end-placeholder="开票结束时间"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                            style="margin-right: 35px;"
                        >
                        </el-date-picker>
                        <el-date-picker
                            v-model="arrivalTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="入账开始时间"
                            end-placeholder="入账结束时间"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                            style="margin-right: 35px;"
                        >
                        </el-date-picker>
                        <el-date-picker
                            v-model="completeTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="通过开始时间"
                            end-placeholder="通过结束时间"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                        <el-checkbox
                            v-model="checked"
                            v-if="sessionlevel == '1'"
                        >省本级</el-checkbox>
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
                    <div>
                        <el-button
                            type="primary"
                            size="small"
                            @click.stop="design"
                        > 应拨金额的计算公式 </el-button>
                    </div>
                </div>
            </div>
            <div class="content" id="outTable">
                <table
                    border
                    cellpadding="0"
                    cellspacing="0"
                    boderColor="#ababab"
                >
                    <thead>
                        <tr class="head">
                            <th colspan="17"> {{userInfo.regionIdMap.name + '科技服务台账'}} </th>
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
                        label="州市名称"
                        prop="address"
                    >
                    </el-table-column>
                    <el-table-column
                        label="合同数量"
                        prop="content.ContractCount"
                    >
                    </el-table-column>
                    <el-table-column
                        label="问题报告数量"
                        prop="content.problemCount"
                    >
                    </el-table-column>
                    <el-table-column
                        label="问题报告率"
                        prop="content.problemProportion"
                    >
                    </el-table-column>
                    <el-table-column
                        label="检测报告数量"
                        prop="content.TestCount"
                    >
                    </el-table-column>
                    <el-table-column
                        label="开票金额"
                        prop="content.InvoicingMoney"
                    >
                    </el-table-column>
                    <el-table-column
                        label="收入到账金额"
                        prop="content.ArrivalMoney"
                    >
                    </el-table-column>
                   <!--  <el-table-column
                        label="欠款金额"
                        prop="content.ArrearsMoney"
                    >
                    </el-table-column> -->
                    <el-table-column
                        label="应拨金额"
                        prop="content.AdvanceMoney"
                    >
                    </el-table-column>
                    <el-table-column
                        label="合同总金额"
                        prop="content.ContractMoney"
                    >
                    </el-table-column>
                   <!--  <el-table-column
                        label="剩余应返金额"
                        prop="content.SurplusReturnMoney"
                    >
                    </el-table-column> -->
                </el-table>
            </div>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="40%"
            >
                <span style="font-size:15px">应拨金额 = 入账金额 *
                    <el-input
                        type="number"
                        style="width:100px"
                        v-model="moneyAll.daozhang"
                    /> - 入账金额 /
                    <el-input
                        type="number"
                        style="width:100px"
                        v-model="moneyAll.kaipiao"
                    /> *
                    <el-input
                        type="number"
                        style="width:100px"
                        v-model="moneyAll.ride"
                    />
                </span>
                <span
                    slot="footer"
                    class="dialog-footer"
                >
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="getOneupdate()"
                    >确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
    selectSummary,
    generateSummary,
    getOne,
    getOneupdate,
} from "@/api/aviation.js";
import * as XlSX from "xlsx";
import FileSaver from "file-saver"; // 数据下载
export default {
    data() {
        return {
            userInfo: JSON.parse(sessionStorage.getItem("records")),
            tabDate: [],
            tableData: [],
            timeValue: [new Date(),new Date()],
            invoiceTime: [],
            arrivalTime: [],
            completeTime: [],
            regionName: "",
            amountRangeStart: "",
            amountRangeEnd: "",
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
            dialogVisible: false,
            moneyAll: {
                daozhang: "",
                kaipiao: "",
                ride: "",
                id: "",
            },
            loading: false,
            checked: false /* 省本级条件 */,
        };
    },
    computed: {
        sessionlevel() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            return records.roleIdMap.level;
        },
    },
    watch: {
        timeValue(val) {
            if (val == null) {
                this.timeValue = [];
                this.selectSummary();
            }
        },
        invoiceTime(val) {
            if (val == null) {
                this.invoiceTime = [];
                this.selectSummary();
            }
        },
        arrivalTime(val) {
            if (val == null) {
                this.arrivalTime = [];
                this.selectSummary();
            }
        },
        completeTime(val) {
            if (val == null) {
                this.completeTime = [];
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
            this.company = regiId.company=='1' ? '云南省气象灾害防御技术中心':'云南启旭科技有限公司';
            const dateString = this.timeValue[0];
            const dateString1 = this.timeValue[1];
            const date = new Date(dateString);
            const date1 = new Date(dateString1);
            const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;
            const formattedDate1 = `${date1.getFullYear()}-${padZero(date1.getMonth() + 1)}-${padZero(date1.getDate())}`;
            function padZero(value) {
                return value < 10 ? '0' + value : value;
            }
            let parameter = {
                regionId: regiId.regionIdMap.id,
                startTime: this.timeValue.length == 0 ? null:formattedDate,
                endTime: this.timeValue.length == 0 ? null: formattedDate1,
                invoiceStartTime: this.invoiceTime[0],
                invoiceEndTime: this.invoiceTime[1],
                arrivalStartTime: this.arrivalTime[0],
                arrivalendTime: this.arrivalTime[1],
                completeStartTime: this.completeTime[0],
                completeEndTime: this.completeTime[1],
                regionName: this.regionName,
                amountRangeStart: this.amountRangeStart,
                amountRangeEnd: this.amountRangeEnd,
                company:regiId.company,
            };
            if (this.checked) {
                parameter.justProvince = 1;
            }
            selectSummary(parameter).then((res) => {
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
            /* const regiId = JSON.parse(sessionStorage.getItem("records"));
            let parameter = {
                regionId: regiId.regionIdMap.id,
                startTime: this.timeValue[0],
                endTime: this.timeValue[1],
                invoiceStartTime: this.invoiceTime[0],
                invoiceEndTime: this.invoiceTime[1],
                arrivalStartTime: this.arrivalTime[0],
                arrivalendTime: this.arrivalTime[1],
                completeStartTime: this.completeTime[0],
                completeEndTime: this.completeTime[1],
                regionName: this.regionName,
                amountRangeStart: this.amountRangeStart,
                amountRangeEnd: this.amountRangeEnd,
            };
            if (this.checked) {
                parameter.justProvince = 1;
            }
            generateSummary(parameter).then((res) => {
                if (res.data.state == 200 && res.data.stateStr == "成功") {
                    var iframe = document.createElement("a");
                    iframe.href =
                        "http://140.249.209.176:8084/LightningDetection/Summary/" +
                        res.data.records;
                    iframe.click();
                    iframe.remove();
                }
            }); */
            const regiId = JSON.parse(sessionStorage.getItem("records"))
            const name = regiId.regionIdMap.name;
            //导出当前页
            let vv = XlSX.utils.table_to_book(document.getElementById('outTable'));
            let vbouts = XlSX.write(vv, {
               bookType: "xlsx",
               bookSST: true,
               type: "array",
            });
            try {
            FileSaver.saveAs(
            new Blob([vbouts], { type: "application/octet-stream" }),`${name}气象灾害防御技术中心各地州防雷检测科技服务台账统计表.xlsx`);
            } catch (e) {
              if (typeof console !== "undefined") console.log(e, vbouts);
            }
            return vbouts;
        },
        getOne() {
            getOne({}).then((res) => {
                this.moneyAll = res.data.records;
            });
        },
        getOneupdate() {
            getOneupdate({
                id: this.moneyAll.id,
                daozhang: this.moneyAll.daozhang,
                kaipiao: this.moneyAll.kaipiao,
                ride: this.moneyAll.ride,
            }).then((res) => {
                if (res.data.state == 200) {
                    this.$message.success("修改成功");
                    this.dialogVisible = false;
                    this.selectSummary();
                } else {
                    this.$message.error("修改失败");
                    this.dialogVisible = false;
                }
            });
        },
        design() {
            this.dialogVisible = true;
            this.getOne();
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