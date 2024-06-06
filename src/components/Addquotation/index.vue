<template>
    <div>
        <div
            id="ywlbAdd"
            v-loading="loading"
        >

            <div class="ywlbTab">
                <table style="width:100%">
                    <tr>
                        <th class="st">填写报价单信息</th>
                    </tr>
                    <tr class="hang">
                        <th class="trs">
                            <el-form
                                ref="formInline"
                                :model="formInline"
                                label-width="120px"
                                :rules="rules"
                                size="mini"
                            >
                                <el-form-item
                                    label="项目名称："
                                    prop="number"
                                >
                                    <el-input v-model="formInline.number"></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="报价："
                                    prop="money"
                                >
                                    <el-input v-model="formInline.money" type="number"></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="联系人："
                                    prop="contacts"
                                >
                                    <el-input v-model="formInline.contacts"></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="联系电话："
                                    prop="phone"
                                >
                                    <el-input v-model="formInline.phone" type="number"></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="委托方："
                                    prop="compy"
                                >
                                    <el-input v-model="formInline.compy" ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="报价单归属："
                                    prop="company"
                                >
                                    <el-input v-model="formInline.company" disabled></el-input>
                                </el-form-item>
                            </el-form>
                        </th>
                    </tr>
                    <tr class="hang">
                        <th class="trrr">
                            <el-button
                                type="success"
                                size="medium"
                                @click="saveOrUpdate"
                            >保存</el-button>
                            <el-button
                                type="info"
                                size="medium"
                                @click="goback"
                            >返回</el-button>
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
import { saveOrUpdate } from "@/api/aviation";
export default {
    name: "XXX",
    data() {
        return {
            formInline: {
                number: "" /* 项目名称 */,
                money: "" /* 报价 */,
                contacts: "" /* 联系人 */,
                phone: "" /* 联系电话 */,
                compy:""/* 委托方 */,
                company:"",/* 报价单人员归属 */
            },
            rules: {
                number: [
                    {
                        required: true,
                        message: "此处为必填项",
                        trigger: "blur",
                    },
                ],
                money: [
                    {
                        required: true,
                        message: "此处为必填项",
                        trigger: "blur",
                    },
                ],
                contacts: [
                    {
                        required: true,
                        message: "此处为必填项",
                        trigger: "blur",
                    },
                ],
                phone: [
                    {
                        required: true,
                        message: "此处为必填项",
                        trigger: "blur",
                    },
                ],
                compy: [
                    {
                        required: true,
                        message: "此处为必填项",
                        trigger: "blur",
                    },
                ],
                
            },
            loading: false,
        };
    },
    computed: {
        sessionlevel() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            return records.roleIdMap.level;
        },
    },
    mounted() {
        const params = JSON.parse(sessionStorage.getItem("records"));
        this.formInline.company = params.company=='1' ? '云南省气象灾害防御技术中心':'云南启旭科技有限公司';
        this.formInline.userid = params.id;
        this.formInline.regionid = params.regionIdMap.id;
    },
    methods: {
        goback() {
            this.$emit("goback", false);
        },
        /* 项目备案 */
        saveOrUpdate() {
            this.$refs.formInline.validate((valid) => {
                let paramsData = {
                   number:this.formInline.number,
                   money:this.formInline.money,
                   contacts:this.formInline.contacts,
                   phone:this.formInline.phone,
                   regionid:this.formInline.regionid,
                   userid:this.formInline.userid,
                   compy:this.formInline.compy,
                   company:this.formInline.company == '云南省气象灾害防御技术中心' ? '1':'2',
                }
                if (valid) {
                    this.loading = true;
                    saveOrUpdate(paramsData).then((res) => {
                        if (res.data.state == 200) {
                            this.$message.success("报价单创建成功");
                            this.loading = false;
                            this.goback();
                        } else {
                            this.$message.error("报价单创建失败");
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
#ywlbAdd {
    background: #fff;
    padding: 7px;
    height: 88vh;
    ::v-deep.el-tabs__header {
        margin: 0;
    }
    .st {
        width: 100%;
        line-height: 35px;
        padding-left: 10px;
        text-align: left;
        background: rgb(231, 231, 231);
        border: 1px solid #ddd;
    }
    .hang {
        display: flex;
    }
    .tr {
        flex: 1;
        border: 1px solid #ddd;
        line-height: 180px;
        border-right: none;
        border-bottom: none;
        font-size: 14px;
        color: gray;
    }
    .trs {
        flex: 8;
        border: 1px solid #ddd;
        border-bottom: none;
        padding: 25px 0;
        .el-form {
            padding-left: 20px;
        }
        .el-form-item {
            margin-bottom: 0px;
            width: 25%;
            ::v-deep .el-form-item__label {
                padding-top: 3px;
            }
        }
        .el-form-item__content {
            line-height: 34px;
        }
        .el-select {
            width: 100%;
        }
        .el-input__inner {
            padding: 0 0 0 15px;
        }
    }
    .tr_s {
        flex: 8;
        border: 1px solid #ddd;
        border-bottom: none;
        ::v-deep.el-input-group__append {
            cursor: pointer;
        }
        ::v-deep.el-input-group__append:hover {
            background: rgb(128, 128, 197);
            color: #fff;
        }
        .el-form {
            padding: 20px;
        }
        .el-form-item {
            margin-bottom: 0px;
            ::v-deep .el-form-item__label {
                padding-top: 3px;
            }
        }
        .el-form-item__content {
            line-height: 34px;
        }
        .el-select {
            width: 100%;
        }
        ::v-deep .el-input__inner {
            padding: 0 0 0 15px;
        }
    }
    .trr {
        flex: 1;
        border: 1px solid #ddd;
        line-height: 180px;
        border-right: none;
        font-size: 14px;
        color: gray;
    }
    .trrr {
        flex: 1;
        border: 1px solid #ddd;
        line-height: 60px;
        border-top: none;
        font-size: 14px;
        color: gray;
    }
    .trss {
        flex: 8;
        border: 1px solid #ddd;
        .el-textarea {
            width: 50%;
            display: block;
            top: 10px;
            left: 10px;
            margin-bottom: 20px;
        }
    }
    .time {
        ::v-deep .el-input__inner {
            padding: 0 0 0 30px;
        }
    }
    ::v-deep .el-form-item__content {
        text-align: left;
    }
    ::v-deep .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 100%;
    }
}
</style>