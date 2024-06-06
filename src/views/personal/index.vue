<template>
    <div
        class="app-container"
        style="height:100%"
    >
        <div class="demo-form-inline">
            个人信息
        </div>
        <div class="content">
            <el-table
                v-loading="listLoading"
                :data="list"
                element-loading-text="Loading"
                border
                style="height: 100%"
            >
                <el-table-column
                    align="center"
                    label="ID"
                    prop="id"
                    width="95"
                >
                </el-table-column>
                <el-table-column
                    label="真实姓名"
                    align="left"
                    prop="trueName"
                >
                </el-table-column>
                <el-table-column
                    label="职务"
                    align="left"
                    prop="name"
                >

                </el-table-column>
                <el-table-column
                    label="密码"
                    align="left"
                >
                    <template slot-scope="scope">
                        <span>******</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="电话"
                    align="left"
                    prop="phone"
                >

                </el-table-column>
                <el-table-column
                    align="center"
                    prop="created_at"
                    label="编辑"
                    width="300"
                >
                    <template slot-scope="scope">
                        <div style="display:flex;width:100%;justify-content: space-evenly;">
                            <div>
                                <el-button
                                    size="mini"
                                    type="success"
                                    plain
                                    @click="alter(scope.row)"
                                >修改</el-button>
                            </div>
                            <div>
                                <el-button
                                    size="mini"
                                    @click="handleEdit()"
                                >签名录入</el-button>
                            </div>
                            <div>
                                <el-upload
                                    action=""
                                    ref="upload"
                                    accept=".jpg,.jpeg,.png"
                                    :limit="10"
                                    :before-upload="uploadHttpimg"
                                    :file-list="fileList"
                                >
                                    <el-button
                                        size="mini"
                                        type="primary"
                                    >上传签名</el-button>
                                </el-upload>
                            </div>

                        </div>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 编辑弹框 -->
        <el-dialog
            title="签名模板"
            :visible.sync="dialog.innerVisible"
        >

            <vue-esign
                ref="esign"
                :width="1000"
                :height="300"
                :isCrop="isCrop"
                :lineWidth="lineWidth"
                :lineColor="lineColor"
                :bgColor.sync="bgColor"
                class="esignature"
            />
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="handleReset">清空</el-button>
                <el-button
                    type="primary"
                    @click="handleGenerate"
                >上传</el-button>
            </span>

        </el-dialog>
        <!-- 修改弹框 -->
        <el-dialog
            title="修改个人信息"
            :visible.sync="reuse"
            width="30%"
        >
            <el-form
                :model="reuseform"
                label-position="right"
                label-width="100px"
            >
                <el-form-item label="真实姓名：">
                    <el-input v-model="reuseform.trueName"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input v-model="reuseform.password"></el-input>
                </el-form-item>
                <el-form-item label="电话：">
                    <el-input v-model="reuseform.phone"></el-input>
                </el-form-item>
                <el-form-item label="资格证号：">
                    <el-input v-model="reuseform.qualifications"></el-input>
                </el-form-item>
            </el-form>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="reuse = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="multiplex"
                >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
// @ is an alias to /src
import { uploadWebSignImg, uploadSignImg } from "@/api/aviation";
import { update } from "@/api/user";
export default {
    name: "XXX",
    data() {
        return {
            lineWidth: 6,
            lineColor: "#000000",
            bgColor: "",
            resultImg: "",
            isCrop: false,
            list: [],
            listLoading: false,
            labelPosition: "right",
            dialog: {
                innerVisible: false,
            },
            reuse: false,
            fileList: [],
            reuseform: {},
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        handleReset() {
            this.$refs.esign.reset();
        },
        handleGenerate() {
            this.$refs.esign
                .generate()
                .then((res) => {
                    this.resultImg = res.split(",")[1];
                    uploadWebSignImg({
                        fileBase64String: this.resultImg,
                        userid: this.list[0].id,
                    })
                        .then((re) => {
                            if (re.data.state == 200) {
                                this.$message.success("上传成功");
                                this.dialog.innerVisible = false;
                            }
                        })
                        .catch((err) => {
                            this.$message.success("上传失败");
                            this.dialog.innerVisible = false;
                        });
                })
                .catch((err) => {
                    this.$message.error("签名不能为空");
                });
        },
        fetchData() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            this.list = [];
            this.list.push({
                trueName: records.trueName,
                id: records.id,
                name: records.roleIdMap.name,
                phone: records.phone,
                password: records.password,
                userName: records.userName,
                qualifications:records.qualifications
            });
        },
        handleEdit() {
            this.dialog.innerVisible = true;
        },
        uploadHttpimg(file) {
            const records = JSON.parse(sessionStorage.getItem("records"));
            let formData = new FormData();
            formData.append("file", file);
            formData.append("userId", records.id);
            uploadSignImg(formData).then((res) => {
                if (res.data.state == 200) {
                    this.$message.success("签名上传成功");
                } else {
                    this.$message.error("签名上传失败");
                }
            });
        },
        alter(row) {
           /*  console.log(row) */
            this.reuseform = row;
            this.reuse = true;
        },
        multiplex() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            const arr = records
            update({
                userName: this.reuseform.userName,
                password: this.reuseform.password,
                trueName: this.reuseform.trueName,
                phone: this.reuseform.phone,
                id: this.reuseform.id,
                qualifications:this.reuseform.qualifications,
            }).then((res) => {
                arr.userName = this.reuseform.userName
                arr.password = this.reuseform.password
                arr.trueName = this.reuseform.trueName
                arr.phone = this.reuseform.phone
                arr.id = this.reuseform.id
                arr.qualifications = this.reuseform.qualifications
                if (res.data.state == 200) {
                    this.$message.success("修改成功");
                    this.reuse = false;
                    window.sessionStorage.setItem("records", JSON.stringify(arr));
                } else {
                    this.reuse = false;
                    this.$message.success("修改失败");
                }
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.esignature {
    margin: 10px 0;
    border: 2px solid #ccc;
}
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
    height: calc(100% - 50px);
    ::v-deep .el-table th {
        color: #666666;
        font-size: 15px;
        font-weight: 600;
    }
}
::v-deep .el-dialog__body {
    padding-bottom: 1px;
}
::v-deep .el-select {
    width: 100%;
}
</style>