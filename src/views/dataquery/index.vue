<template>
    <div class="app-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <div>
                公章管理列表 {{ total }} 条
            </div>
            <div>
                <el-form-item>
                    <el-input v-model="formInline.name" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="fetchData">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="dialog.innerVisible = true">添加</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="content">
            <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row height="68vh">
                <el-table-column align="center" label="ID" width="95" type="index">
                </el-table-column>
                <el-table-column label="标题" align="center">
                    <template slot-scope="scope">
                        <div style="width: 85%">
                            {{ scope.row.title }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="公章图片" align="center">
                    <template slot-scope="scope">
                        <el-image style="width: 50px;height:50px;cursor: pointer;" fit="cover" :src="'http://140.249.209.176:8084/LightningDetection/Seal/' + scope.row.filename"
                            @click.stop="imgShowList(scope.row.filename)" v-if="scope.row.filename">
                        </el-image>
                        <span v-else> - </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="是否启用" width="200px">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.enable" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0" @change="getChange(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column> -->
                <el-table-column align="center" prop="created_at" label="编辑" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Page :total="total" :pageNum="current" :pageSize="size" @pageChange="pageChange" />
        </div>
        <!-- 添加弹框 -->
        <el-dialog width="1080px" title="添加公告信息" :visible.sync="dialog.innerVisible" append-to-body @close="closeBox">
            <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" ref="ruleForm">
                <el-form-item label="标题：" prop="name">
                    <el-input v-model="formLabelAlign.title"></el-input>
                </el-form-item>
                <el-form-item label="图片上传：">
                    <el-upload action="" ref="upload" accept=".jpg,.jpeg,.png" :http-request="uploadHttpimg" :file-list="fileList">
                        <el-button slot="trigger" size="small" type="primary" plain>点击上传图片</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button type="primary" size="small" @click="resetForm">取消</el-button>
                    <el-button size="small" @click="submitForm">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 编辑弹框 -->
        <el-dialog width="1080px" title="编辑公告信息" :visible.sync="dialogone.innerVisible" append-to-body @close="closeBox">
            <el-form :label-position="labelPosition" label-width="100px" :model="formLabel" ref="ruleForm">
                <el-form-item label="标题：" prop="name">
                    <el-input v-model="formLabel.title"></el-input>
                </el-form-item>
                <el-form-item label="图片上传：" prop="password">
                    <el-upload action="" ref="upload" accept=".jpg,.jpeg,.png" :http-request="uploadHttp" :file-list="fileList">
                        <el-button slot="trigger" size="small" type="primary" plain>点击上传图片</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button size="small" type="primary" @click="compile()">保存</el-button>
                    <el-button size="small" @click="resetForm('ruleForm')">清空</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 轮播图 -->
        <div v-show="imgShow" class="imgShow">
            <el-carousel :autoplay="false" height="1030px">
                <img :src="imgList" style="width: 50%;left: 50%;position: relative;top: 50%;transform: translate(-50%, -50%);">
            </el-carousel>
            <div class="closer" @click.stop="imgShow = false"> × </div>
        </div>
    </div>
</template>

<script>
import { queryStamp, addStamp, removeStamp, editStamp } from '@/api/user'
import Page from '@/components/page/index.vue'
export default {
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: 'success',
                draft: 'gray',
                deleted: 'danger',
            }
            return statusMap[status]
        },
    },
    data() {
        return {
            list: null,
            listLoading: true,
            /* 用户传递参数 */
            size: 10,
            current: 1,
            total: 0,
            trueName: 'shengguanli',
            regionId: '',
            roleId: '',
            state: '',
            formInline: {
                name: '',
            },
            formLabelAlign: {
                title: '',
                content: '',
            },
            formLabel: {
                title: '',
                content: '',
            },
            labelPosition: 'right',
            dialog: {
                innerVisible: false,
            },
            dialogone: {
                innerVisible: false,
            },
            regionIdList: [],
            fileList: [],
            formData: new FormData(),
            ftwoData: new FormData(),
            imgShow: false,
            imgList: '',
        }
    },
    components: {
        Page,
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.listLoading = true
            queryStamp({
                size: this.size,
                current: this.current,
            }).then((response) => {
                this.list = response.data.records
                this.total = response.data.total
                this.listLoading = false
            })
        },
        hangdleEditor(val) {
            this.formLabelAlign.content = val
        },
        pageChange(page) {
            this.size = page._pageSize
            this.current = page._currentPage
            this.fetchData()
        },
        /* 编辑用户 */
        handleEdit(index, row) {
            this.dialogone.innerVisible = true
            this.formLabel = row
            this.formLabel.content = row.content
        },
        /* 提交 */
        compile() {
            this.ftwoData.set("id", this.formLabel.id)
            this.ftwoData.set("title", this.formLabel.title)
            addStamp(this.ftwoData).then((res) => {
                if (res.data.stateStr == '成功') {
                    this.$message.success('修改成功')
                    this.dialogone.innerVisible = false
                    this.fetchData()
                    this.formData = new FormData()
                } else {
                    this.$message.error('修改失败')
                }
            })
        },
        /* 删除信息 */
        handleDelete(row) {
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    removeStamp({
                        id: row.id,
                    }).then((res) => {
                        if (
                            res.data.state == 200 &&
                            res.data.stateStr == '成功'
                        ) {
                            this.$message.success('删除成功')
                            this.fetchData()
                        } else {
                            this.$message.error('删除失败')
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    })
                })
        },
        // 关闭dialog
        closeBox() {
            this.dialog.innerVisible = false
        },
        /* 添加公告信息 */
        submitForm() {
            this.formData.append('title', this.formLabelAlign.title)
            addStamp(this.formData).then((res) => {
                if (res.data.stateStr == '成功') {
                    this.$message.success('添加成功')
                    this.closeBox()
                    this.fetchData()
                    this.formData = new FormData()
                }
            })
        },
        // 清空用户信息
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        uploadHttpimg(data) {
            this.formData.append('file', data.file)
        },
        uploadHttp(data) {
            this.ftwoData.set("file", data.file)
        },
        imgShowList(row) {
            this.imgList =
                'http://140.249.209.176:8084/LightningDetection/Seal/' + row
            setTimeout(() => {
                this.imgShow = true
            }, 1500)
        },
        getChange(row) {
            editStamp({
                enable: row.enable,
                id: row.id,
            }).then((res) => {
                this.$message.success('修改成功')
                this.fetchData()
            })
        },
    },
}
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
.content {
    background: #fff;
    padding: 24px;
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
    padding-bottom: 1px;
}
::v-deep .el-select {
    width: 100%;
}
</style>
