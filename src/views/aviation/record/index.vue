<template>
    <div style="width: 100%;height: 100%">
        <div class="table">
           <!--  <div class="header">
                <div>
                    <el-date-picker v-model="timeValue" type="daterange" align="right" unlink-panels range-separator="至"
                        start-placeholder="备案开始时间" end-placeholder="备案结束时间" :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <span>行政区划：</span>
                    <el-input class="inputsty" v-model="regionName" placeholder="请填写行政区划"></el-input>
                    <span>档案编号：</span>
                    <el-input class="inputsty" v-model="number" placeholder="请填写档案编号"></el-input>
                    <el-checkbox v-model="checked" v-if="sessionlevel == '1'">省本级</el-checkbox>
                    <el-checkbox v-model="checked" v-if="sessionlevel == '2'">州市本级</el-checkbox>
                    <span>项目归属：</span>
                    <el-input class="inputsty" v-model="company" disabled></el-input>
                    <el-button type="info" size="small" @click.stop="selectRecord" style="margin-left: 18px"> 查询
                    </el-button>
                    <el-button type="primary" size="small" @click.stop="downloadFile"> 下载 </el-button>
                </div>
            </div> -->
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
                        <span>档案编号：</span>
                        <el-input class="inputsty" v-model="number" placeholder="请填写档案编号"></el-input>

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
                            @click.stop="selectRecord"
                            style="margin-left: 18px"
                        > 查询 </el-button>
                        <el-button
                            type="primary"
                            size="small"
                            @click.stop="downloadFile"
                        > 下载 </el-button>

                    </div>
                    <!-- <div>
                        <el-button
                            type="primary"
                            size="small"
                            @click.stop="design"
                        > 应拨金额的计算公式 </el-button>
                    </div> -->
                </div>
            </div>
            <div class="content">
                <div class="content-head">

                    <span class="head">
                        <th colspan="17"> {{ userInfo.regionIdMap.name + '科技服务台账' }} </th>
                    </span>

                </div>
                <!-- <tbody>
                        <div class="cot">
                            <tr
                                v-for="(item, index) in tableData"
                                :key="index"
                            >
                                <th
                                    v-for="(it, id) in tableData[index]"
                                    :key="id"
                                >
                                    <span v-if="it != null && it != undefined && it != ''"> {{ it }} </span>
                                    <span v-else> - </span>
                                </th>
                            </tr>
                        </div>
                    </tbody> -->
                <div style="height:calc(100% - 103px)">
                    <el-table :data="tableData" border style="width: 100%" height="580" v-loading="loading">
                        <el-table-column label="序号" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.xuhao != null && scope.row.xuhao != ''">{{ scope.row.xuhao }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="甲方单位" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.jiafangfanwei != null && scope.row.jiafangfanwei != ''">{{
                                    scope.row.jiafangfanwei }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="项目名称" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.xiangmumingcheng != null && scope.row.xiangmumingcheng != ''">{{
                                    scope.row.xiangmumingcheng }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="检测报告档案号" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.danganbianhao != null && scope.row.danganbianhao != ''">{{
                                    scope.row.danganbianhao }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="合同编号" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.hetongbianhao != null && scope.row.hetongbianhao != ''">{{
                                    scope.row.hetongbianhao }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="合同金额" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.hetongjine != null && scope.row.hetongjine != ''">{{
                                    scope.row.hetongjine
                                }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="盖章时间" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.gaizhangshijian != null && scope.row.gaizhangshijian != ''">{{
                                    scope.row.gaizhangshijian }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="合同日期" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.hetongshijian != null && scope.row.hetongshijian != ''">{{
                                    scope.row.hetongshijian }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="存档日期" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.cundangriqi != null && scope.row.cundangriqi != ''">{{
                                    scope.row.cundangriqi }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="类别（民用/危化）" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.leixing != null && scope.row.leixing != ''">{{ scope.row.leixing
                                }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="检测单位" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.jiancedanwei != null && scope.row.jiancedanwei != ''">{{
                                    scope.row.jiancedanwei }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="检测人" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.zhizuoren != null && scope.row.zhizuoren != ''">{{ scope.row.zhizuoren
                                }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="检测负责人电话" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.zhizuorendianhua != null && scope.row.zhizuorendianhua != ''">{{
                                    scope.row.zhizuorendianhua }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="检测日期" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.jianceshijian != null && scope.row.jianceshijian != ''">{{
                                    scope.row.jianceshijian }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="审核人" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.shenheren != null && scope.row.shenheren != ''">{{ scope.row.shenheren
                                }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="批准人" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.fuzeren != null && scope.row.fuzeren != ''">{{ scope.row.fuzeren
                                }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="qianfashijian" label="签发日期" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.qianfashijian != null && scope.row.qianfashijian != ''">{{
                                    scope.row.qianfashijian }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column
                        label="开票信息"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.kaipiaoxinxi!=null && scope.row.kaipiaoxinxi!=''">{{ scope.row.kaipiaoxinxi }}</span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column> -->
                        <el-table-column label="开票金额" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.kaipiaojine != null && scope.row.kaipiaojine != ''">{{
                                    scope.row.kaipiaojine }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="发票号码" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.fapiaohaoma != null && scope.row.fapiaohaoma != ''">{{
                                    scope.row.fapiaohaoma }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="开票类型" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.fapiaoleixing != null && scope.row.fapiaoleixing != ''">{{
                                    scope.row.fapiaoleixing }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="开票日期" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.kaipiaoshian != null && scope.row.kaipiaoshian != ''">{{
                                    scope.row.kaipiaoshian }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="收入到账日期" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.shourudaozhangriqi != null && scope.row.shourudaozhangriqi != ''">{{
                                    scope.row.shourudaozhangriqi }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="收入到账金额" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.shourudaozhangjine != null && scope.row.shourudaozhangjine != ''">{{
                                    scope.row.shourudaozhangjine }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="欠款金额" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.qiankuanjine != null && scope.row.qiankuanjine != ''">{{
                                    scope.row.qiankuanjine }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="预拨金额" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.yubojine != null && scope.row.yubojine != ''">{{ scope.row.yubojine
                                }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="yuboshijian" label="预拨时间" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.yuboshijian != null && scope.row.yuboshijian != ''">{{
                                    scope.row.yuboshijian }}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="附件" width="100" fixed='right' align="center">
                            <template slot-scope="scope">
                                <div style="display:flex;flex-direction: column;" v-if="scope.row.hetong != null">
                                    <el-button type="text" size="small" :disabled="scope.row.hetong == null"
                                        @click="HeTongClick(scope.row.hetong)">合同</el-button>
                                    <el-button type="text" size="small" :disabled="scope.row.jiancebaogao == null"
                                        @click="JianCeClick(scope.row.jiancebaogao)">检测报告</el-button>
                                    <el-button type="text" size="small" :disabled="scope.row.yuanshibaogao == null"
                                        @click="YuansiClick(scope.row.yuanshibaogao)">原始记录</el-button>
                                </div>
                                <div v-else>-</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <!--  </table> -->
            </div>
        </div>
    </div>
</template>

<script>
import { selectRecord, generateRecord } from "@/api/aviation.js";
import { parseTime } from "@/utils/index";
export default {
    data() {
        return {
            userInfo: JSON.parse(sessionStorage.getItem("records")),
            loading: false,
            tableData: [],
            timeValue: [new Date(), new Date()],
            invoiceTime: [],
            arrivalTime: [],
            completeTime: [],
            regionName: "",
            amountRangeStart: "",
            amountRangeEnd: "",
            number: "",
            company: "",
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
            checked: false /* 省本级条件 */,
        };
    },
    watch: {
        timeValue(val) {
            if (val == null) {
                this.timeValue = [];
                this.selectRecord();
            }
        },
    },
    computed: {
        sessionlevel() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            return records.roleIdMap.level;
        },
    },
    mounted() {
        this.selectRecord();
    },
    methods: {
        selectRecord() {
            this.loading = true;
            const regiId = JSON.parse(sessionStorage.getItem("records"));
            this.company = regiId.company == '1' ? '云南省气象灾害防御技术中心' : '云南启旭科技有限公司';
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
                startTime: formattedDate,
                endTime: formattedDate1,
                invoiceStartTime: this.invoiceTime[0],
                invoiceEndTime: this.invoiceTime[1],
                arrivalStartTime: this.arrivalTime[0],
                arrivalendTime: this.arrivalTime[1],
                completeStartTime: this.completeTime[0],
                completeEndTime: this.completeTime[1],
                regionName: this.regionName,
                amountRangeStart: this.amountRangeStart,
                amountRangeEnd: this.amountRangeEnd,
                number: this.number,
                company: regiId.company
            };
            if (this.checked) {
                parameter.justProvince = 1;
            }
            selectRecord(parameter).then((res) => {
                this.loading = false;
                if (res.data.state == 200 && res.data.stateStr == "成功") {
                    this.tableData = res.data.records;
                }
            });
        },
        downloadFile() {
            const regiId = JSON.parse(sessionStorage.getItem("records"));
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
                startTime: formattedDate,
                endTime: formattedDate1,
                regionName: this.regionName,
                number: this.number,
                company: regiId.company
            };
            if (this.checked) {
                parameter.justProvince = 1;
            }
            generateRecord(parameter).then((res) => {
                if (res.data.state == 200 && res.data.stateStr == "成功") {
                    var iframe = document.createElement("a");
                    iframe.href =
                        "http://140.249.209.176:8084/LightningDetection/Summary/" +
                        res.data.records;
                    iframe.click();
                    iframe.remove();
                }
            });
        },
        HeTongClick(hetong) {
            if (hetong != null) {
                window.open(hetong);
            } else {
                return;
            }
        },
        JianCeClick(jiancebaogao) {
            var arr = jiancebaogao.replaceAll(".docx", ".pdf");
            if (jiancebaogao != null) {
                window.open(arr);
            } else {
                return;
            }
        },
        YuansiClick(yuanshibaogao) {
            if (yuanshibaogao != null) {
                window.open(yuanshibaogao);
            } else {
                return;
            }
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
        height: calc(100% - 92px);
        overflow-y: auto;

        .content-head {
            text-align: center;
            background: #e8f3ff;
            border: 1px solid #a8d3f1;

            .head {
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

        ::v-deep.el-table {
            border: 1px solid #a8d3f1;
        }
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