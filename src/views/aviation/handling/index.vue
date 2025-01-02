<template>
        <div class="reference">
        <div
            class="All"
            v-if="!addishow"
        >
            <div
                class="addNewYewu"
                v-if="sessionName == '管理员' && sessionNamelevel=='1'"
            >
                <span @click="addClick"><i
                        class="el-icon-plus"
                        style="font-weight:900;margin-right:10px;"
                    />上传投标资料</span>
            </div>
            <div class="condition">
                <el-form
                    :inline="true"
                    :model="formInline"
                    size='mini'
                    class="demo-form-inline"
                >
                    <el-form-item label="标题：">
                        <el-input
                            v-model="formInline.title"
                            placeholder="请填写标题"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="时间筛选：">
                        <el-date-picker
                            v-model="formInline.invoiceTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="文件上传开始时间"
                            end-placeholder="文件上传结束时间"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                            style="margin-right:5px;"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            icon="el-icon-search"
                            @click="onSubmit"
                        >查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div
                class="footer-table"
                :class="(sessionName == '管理员' && sessionNamelevel == 1) ? 'all':'dan'"
            >
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    border
                    style="width: 100%;"
                    class="classsty"
                    height="calc(100% - 85px)"
                >
                    <el-table-column
                        label="标题"
                        align="center"
                    >
                        <template slot-scope="scope">{{ scope.row.title }}</template>
                    </el-table-column>
                    <el-table-column
                        label="简介"
                        align="center"
                    >
                        <template slot-scope="scope">{{ scope.row.content }}</template>
                    </el-table-column>
                    <el-table-column
                        label="保存时间"
                        align="center"
                    >
                        <template slot-scope="scope">{{ scope.row.saveTime }}</template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="projectName"
                        label="文件"
                        align="center"
                    >
                        <template slot-scope="scope">
                          <div  v-if="scope.row.fileName != null">
                            <el-image
                                style="width: 50px;height:50px;cursor: pointer;"
                                :key="index"
                                v-for="(item, index) in scope.row.fileName.split(',')"
                                fit="cover"
                                :src="'http://140.249.209.176:8084/LightningDetection/Tender/' + item"
                                @click.stop="pdfSrcShow(item)"
                            >
                          </el-image>
                          </div>
                            <span v-else> 未上传 </span>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        prop="projectName"
                        label="资料下载"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <div v-if="scope.row.fileName">
                                <el-button
                                  v-if="scope.row.fileName.indexOf(',') != -1"
                                    type="text"
                                    :key="index"
                                    v-for="(item, index) in scope.row.fileName.split(',')"
                                    @click.stop="Download(item)"
                                > 下载{{ index+1 }} </el-button>
                                <el-button
                                v-else
                                    type="text"
                                    :key="index"
                                    v-for="(item, index) in scope.row.fileName.split(',')"
                                    @click.stop="Download(item)"
                                > 下载 </el-button>

                            </div>
                            <span v-else> 未上传 </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="handle"
                        label="操作"
                        align="center"
                        width="180"
                        v-if="sessionName == '管理员' && sessionNamelevel=='1'"
                    >
                        <template slot-scope="scope">
                            <span
                                class="warning"
                                @click="updateProject(scope.row)"
                            >修改 | </span>
                            <span
                                class="delete"
                                @click="removeProject(scope.row.id)"
                            >删除</span>
                        </template>
                    </el-table-column>
                </el-table>
                <Page
                    :total="total"
                    :pageNum="current"
                    :pageSize="size"
                    @pageChange="pageChange"
                />
            </div>
        </div>
        <Addhanding
            v-if="addishow"
            @goback="goback($event)"tenderupdate
        />
        <div
            v-show="pdfShow"
            class="pdf"
        >
            <iframe
                :src="pdfSrc"
                frameborder="0"
                class="iframes"
            ></iframe>
            <div
                class="close"
                @click.stop="pdfShow = false"
            > × </div>
        </div>
        <el-dialog
            title="修改信息"
            :visible.sync="updateShow"
            width="30%"
        >
            <el-form
                ref="updateInfo"
                :model="updateInfo"
                label-width="80px"
            >
                <el-form-item label="标题">
                    <el-input v-model="updateInfo.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="updateInfo.content"></el-input>
                    </el-select>
                </el-form-item>
                <el-form-item label="文件：">
                    <el-upload
                        action=""
                        ref="upload"
                        accept=".pdf,doc,docx,png"
                        :limit="10"
                        multiple
                        :http-request="uploadHttpRequest"
                        :file-list="fileList"
                    >
                        <el-button
                            slot="trigger"
                            size="small"
                            type="primary"
                            plain
                        >点击上传文件</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="updateShow = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="tenderupdate"
                >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
// @ is an alias to /src
import Page from "@/components/page/index.vue";
import Addhanding from "@/components/Addhanding/index.vue";

import { tenderpage, tenderdelete, tenderupdate } from "@/api/aviation";
export default {
    name: "XXX",
    data() {
        return {
            formInline: {
                title: "" /* 标题： */,
                invoiceTime: [] /* 时间筛选： */,
            },
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
            addishow: false,
            total: 7,
            current: 1,
            size: 5,
            tableData: [],
            loading: false,
            editDilong: false,
            pdfShow: false,
            pdfSrc: "",
            enquire: {
                number: "",
                money: "",
                contacts: "",
                phone: "",
                id: "",
                compy: "",
            },
            dialogVisible: false,
            duijierenID: null,
            options: [],
            userInfo: {
                regionid: null,
                submitter: null,
                quotationId: null,
                review: null,
            },
            dilongList: [],
            TimeLineShow: false,
            updateInfo: {},
            updateShow: false,
            fileList: [],
            formData: new FormData(),
            nullFile: null,
        };
    },
    components: {
        Page,
        Addhanding,
    },
    computed: {
        sessionName() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            return records.roleIdMap.name;
        },
        sessionNameid() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            return records.id;
        },
        sessionNamelevel() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            return records.roleIdMap.level;
        },
        regionId() {
            let regionId = JSON.parse(sessionStorage.getItem("records"));
            return regionId.regionIdMap.id;
        },
        refresh4() {
            return this.$store.state.app.refresh4;
        },
    },
    watch: {
        addishow(val) {
            if (!val) {
                this.tenderpage();
            }
        },
        refresh4(newVal) {
            if (newVal) {
                /*  alert("已刷新"); */
                this.tenderpage();
            }
        },
    },
    created() {
        this.tenderpage();
        const regionId = JSON.parse(sessionStorage.getItem("records"));
    },
    methods: {
        addClick() {
            this.addishow = true;
        },
        tenderpage() {
            let parameter = {
                size: this.size,
                current: this.current,
                title: this.formInline.title,
                startTime: this.formInline.invoiceTime[0],
                endTime: this.formInline.invoiceTime[1],
            };
            tenderpage(parameter).then((res) => {
                this.tableData = res.data.records;
                this.total = res.data.total;
            });
        },
        goback(e) {
            this.addishow = e;
        },
        onSubmit() {
            this.tenderpage();
        },
        pageChange(page) {
            this.size = page._pageSize;
            this.current = page._currentPage;
            this.tenderpage();
        },
        pdfSrcShow(file) {
            file = file.replaceAll("docx", "pdf");
            file = file.replaceAll("doc", "pdf");
            this.pdfSrc =
                "http://140.249.209.176:8084/LightningDetection/Tender/" + file;
            setTimeout(() => {
                this.pdfShow = true;
            }, 1500);
            console.log(this.pdfSrc);
        },
        Download(fileName) {
            fileName = fileName.replaceAll("docx", "pdf");
            fileName = fileName.replaceAll("doc", "pdf");
            window.open(
                "http://140.249.209.176:8084/LightningDetection/Tender/" +
                    fileName
            );
        },
        imgCom(row) {
            let arr = row.split(",");
            if (arr.length > 0) {
                return arr[0];
            } else {
                return arr;
            }
        },
        /* 删除 */
        removeProject(id) {
            this.$confirm("此操作将删除该项目, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    tenderdelete({ id: id }).then((res) => {
                        /*   console.log(res); */
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        this.tenderpage();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        /* 修改 */
        updateProject(row) {
            console.log(row);
            this.updateInfo = row;
            this.updateShow = true;
        },
        TimeLineShowlose(val) {
            this.TimeLineShow = val;
        },
        uploadHttpRequest(data) {
            var fileType = data.file.name.split(".")[1];
            const extension =
                fileType.toLowerCase() == "jpg" ||
                fileType.toLowerCase() == "doc" ||
                fileType.toLowerCase() == "pdf" ||
                fileType.toLowerCase() == "docx" ||
                fileType.toLowerCase() == "zip" ||
                fileType.toLowerCase() == "png";
            if (!extension) {
                this.$message.error("投标资料必须为jpg,doc,docx,pdf,png,zip格式");
                this.fileList = [];
            } else {
                this.formData.append("files", data.file);
            }
        },
        tenderupdate() {
            this.$refs.updateInfo.validate((valid) => {
                this.formData.append("id", this.updateInfo.id);
                this.formData.append("title", this.updateInfo.title);
                this.formData.append("content", this.updateInfo.content);
                if (valid) {
                    this.loading = true;
                    tenderupdate(this.formData).then((res) => {
                        if (res.data.state == 200) {
                            this.$message.success("上传资料成功");
                            this.loading = false;
                            this.updateShow = false;
                            this.formData = new FormData();
                            this.tenderpage();
                        } else {
                            this.$message.error("上传资料失败");
                            this.formData = new FormData();
                            this.updateShow = false;
                            this.loading = false;
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>
<style lang="scss" scoped>
::v-deep .My_el-dialog .el-dialog__body {
    padding-top: 0;
}
.reference {
    height: 100%;
    overflow-y: auto;
}
.All {
    height: 100%;
    .addNewYewu {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        cursor: pointer;
        color: #4ca72c;
        background: #fff;
        padding: 0 1%;
        margin-bottom: 7px;
    }
    .condition {
        /*  height: 82px; */
        line-height: 40px;
        font-size: 16px;
        background: #fff;
        padding: 0 1%;
        margin-bottom: 7px;
        .el-form {
            width: 100%;
            .el-form-item {
                margin-bottom: 0;
            }
            ::v-deep .el-form-item__content {
                line-height: 40px;
            }
        }
    }
    .footer-table {
        background: #fff;
        /*   height: calc(100% - 137px); */

        .el-table {
            overflow-y: auto;
        }
        .classsty {
            height: calc(100% - 85px);
        }
        .footer {
            padding: 20px;
            border-bottom: 1px solid rgb(235, 238, 245);
        }
        .edit {
            color: #337ab7;
            cursor: pointer;
        }
        .submit {
            color: #8ed65d;
            cursor: pointer;
        }
        .delete {
            color: red;
            cursor: pointer;
        }
        .warning {
            color: rgb(255, 196, 0);
            cursor: pointer;
        }
        .audit {
            cursor: pointer;
        }
        .submit:hover {
            text-decoration: underline;
        }
        .edit:hover {
            text-decoration: underline;
        }
        .delete:hover {
            text-decoration: underline;
        }
        .audit:hover {
            text-decoration: underline;
        }
        ::v-deep .el-table__expanded-cell {
            padding: 10px 24px 10px 100px;
            line-height: 24px;
            background: #fff;
            position: relative;
            top: 0px;
        }
        .hide {
            width: 100%;
            height: 20px;
            display: flex;
            margin-bottom: 20px;
        }
        .hides {
            display: flex;
            flex-direction: column;
            div {
                height: 40px;
            }
        }
        ::v-deep .el-form--inline .el-form-item {
            margin-right: 48px;
            color: #2788ee;
            font-weight: 400;
        }
        ::v-deep .el-form-item__label {
            color: #2788ee;
            font-weight: bolder;
            margin-right: -15px;
        }
    }
    .all {
        height: calc(100% - 85px);
    }
    .dan {
        height: calc(100% - 30px);
    }
}
.imgShow {
    img {
        width: 50%;
        left: 50%;
        position: relative;
        transform: translate(-50%, -50%);
        top: 50%;
    }
}
.pdf {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.iframes {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9998;
}
.close {
    width: 30px;
    height: 30px;
    background: #323639;
    position: absolute;
    right: 12%;
    top: 9px;
    cursor: pointer;
    font-size: 34px;
    color: #fff;
    z-index: 9999;
}

.imgShow {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 66;
    background: #0000005e;
}
.closer {
    width: 30px;
    height: 30px;
    background: #0000005e;
    position: absolute;
    right: 12%;
    top: 9px;
    cursor: pointer;
    font-size: 34px;
    color: #fff;
    z-index: 9999;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
}
/* 修改信息 */
.editCont {
    ::v-deep .el-input__inner {
        height: 32px;
        line-height: 32px;
    }
    p {
        margin: 0;
        .item {
            ::v-deep.el-form-item__label {
                padding-right: 0 !important;
            }
        }
    }
    .el-form-item {
        padding: 0;
        margin-bottom: 10px;
    }
}
.fontsty {
    color: red;
    font-size: 15px;
}
.fontsty:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>
