<template>
    <div class="app-container" style="height:100%">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <div>
                月统计报告生成
            </div>
            <div>

                <el-form-item>
                    <el-button type="primary" size="small" @click="createMonthStatistics()">生成</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="content">
            <el-table v-loading="listLoading" :data="list" element-loading-text="生成中..." border fit
                highlight-current-row height="68vh">
                <el-table-column align="center" label="报告名称">
                    <template slot-scope="scope">
                        <div style="width: 85%">
                            {{ scope.row.name }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="文件时间">

                    <template slot-scope="scope">
                        <div style="width: 85%">
                            {{ scope.row.fileTime }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="保存时间" align="center">

                    <template slot-scope="scope">
                        <div style="width: 85%">
                            {{ scope.row.saveTime }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="报告归属" align="center">

                    <template slot-scope="scope">
                        <div style="width: 85%">
                            {{ scope.row.company | Signature }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="created_at" label="编辑" width="300">

                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row.name)">查看</el-button>
                        <el-button size="mini" type='success' @click="handleDownload(scope.row.name)">下载</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Page :total="total" :pageNum="current" :pageSize="size" @pageChange="pageChange" />
        </div>
        <div v-show="pdfShow" class="pdf">
            <iframe :src="pdfSrc" frameborder="0" class="iframes"></iframe>
            <div class="close" @click.stop="pdfShow = false"> × </div>
        </div>
        <el-dialog title="生成信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>
                <el-form :inline="true" :model="formInline" class="demo-form-inlineTwo">
                    <el-form-item label="生成时间：">
                        <el-date-picker v-model="formInline.time" type="month" placeholder="选择年月" value-format="yyyyMM">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="报告归属：">
                        <el-select v-model="formInline.company" placeholder="请选择" clearable>
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel" size="small">取 消</el-button>
                <el-button type="primary" @click="Confirm" size="small">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import {
    getstatisticsmonthly,
    createMonthStatistics,
    deleteMonthStatistics
} from "@/api/user";
import Page from "@/components/page/index.vue";
export default {
    filters: {
        Signature(status) {
            switch (status) {
                case '1':
                    return '云南省气象灾害防御技术中心'
                    break;
                case '2':
                    return '云南启旭科技有限公司'
                    break;

                default:
                    break;
            }
        }
    },
    data() {
        return {
            list: null,
            listLoading: false,
            /* 用户传递参数 */
            size: 10,
            current: 1,
            total: 0,
            formInline: {
                time: "",
                company: "",
            },

            dialog: {
                innerVisible: false,
            },
            dialogone: {
                innerVisible: false,
            },
            pdfSrc: "",
            pdfShow: false,
            options: [
                {
                    value: "1",
                    label: "云南省气象灾害防御技术中心"
                },
                {
                    value: "2",
                    label: "云南启旭科技有限公司"
                }
            ],
            dialogVisible: false,
        };
    },
    components: {
        Page,
    },
    created() {
        this.getstatisticsmonthly()
    },
    methods: {
        pageChange(page) {
            this.size = page._pageSize;
            this.current = page._currentPage;
            this.getstatisticsmonthly(this.current);
        },
        /* 查看 */
        handleEdit(file) {
            file = file.replaceAll("docx", "pdf");
            file = file.replaceAll("doc", "pdf");
            this.pdfSrc =
                "http://140.249.209.176:8084/LightningDetection/monthlyOnlinePath/" +
                file;
            setTimeout(() => {
                this.pdfShow = true;
            }, 500);
        },
        /* 下载 */
        handleDownload(file) {
            const link = document.createElement('a');
            link.href = 'http://140.249.209.176:8084/LightningDetection/monthlyOnlinePath/' + file;
            link.download = 'file';
            link.click();
            link.remove();
        },
        /* 删除信息 */
        handleDelete(row) {
            this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    deleteMonthStatistics({
                        id: row.id,
                    }).then((res) => {
                        if (
                            res.data.state == 200 &&
                            res.data.stateStr == "成功"
                        ) {
                            this.$message.success("删除成功");
                            this.getstatisticsmonthly();
                        } else {
                            this.$message.error("删除失败");
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        createMonthStatistics() {
            this.dialogVisible = true;

        },
        cancel() {
            this.dialogVisible = false;
            this.formInline.time = null;
            this.formInline.company = null;
        },
        Confirm() {
            if (this.formInline.time == null || this.formInline.time == "") {
                return this.$message.info("生成时间不能为空")
            }
            if (this.formInline.company == null || this.formInline.company == "") {
                return this.$message.info("报告归属不能为空")
            }
            this.dialogVisible = false;
            this.listLoading = true;
            createMonthStatistics({
                time: this.formInline.time,
                company: this.formInline.company,
            }).then((res) => {
                if (res.data.state == 200) {
                    this.getstatisticsmonthly()
                } else {
                    this.$message.error('生成失败');
                    this.getstatisticsmonthly();
                }
                this.formInline.time = null;
                this.formInline.company = null;

            })
        },
        getstatisticsmonthly(current) {
            getstatisticsmonthly({
                size: this.size,
                current: current ? current : this.current,
            }).then((res) => {
                this.list = res.data.records;
                this.total = res.data.total;
                this.listLoading = false;
            })
        }

    },
};
</script>

<style lang="scss" scoped>
.demo-form-inline {
    padding: 12px 24px;
    background: #fff;
    margin-bottom: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;

    .el-form-item {
        margin-bottom: 0;


    }

}



.demo-form-inlineTwo {
    padding: 12px 24px;
    background: #fff;
    margin-bottom: 7px;
    display: flex;
    font-size: 18px;
    flex-direction: column;

    .el-form-item {
        margin-bottom: 10px;

        ::v-deep.el-form-item__content {
            width: calc(100% - 82px);
        }

        ::v-deep.el-date-editor.el-input,
        .el-date-editor.el-input__inner {
            width: 100%;
        }

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

.content {
    background: #fff;
    padding: 24px;
    height: calc(100% - 70px);

    ::v-deep .el-table th {
        color: #666666;
        font-size: 15px;
        font-weight: 600;
    }

    .textarea {
        display: inline-block;
        height: 34px;
        overflow: hidden;
        font-size: 12px;
        line-height: 12px;
    }
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

.el-switch {
    height: 27px;
}

.el-table td div {
    white-space: nowrap;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
}

::v-deep .el-input__inner {
    height: 32px;
    line-height: 32px;
}

::-webkit-scrollbar {
    width: 5px;
    height: 10px;
}

::-webkit-scrollbar-thumb {
    //滑块部分
    border-radius: 5px;
    background-color: rgb(206, 184, 219);
}

::-webkit-scrollbar-track {
    //轨道部分
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 5px;
}

::v-deep .el-dialog__body {
    padding-top: 10px;
    padding-bottom: 1px;
}

::v-deep .el-select {
    width: 100%;
}
</style>
