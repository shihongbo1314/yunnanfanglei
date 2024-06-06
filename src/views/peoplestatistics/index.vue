<template>
    <div
        class="app-container"
        style="height:100%"
    >
        <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            style="background:#FFF;padding: 20px 0 0 20px;margin-bottom:7px"
        >
            <el-form-item label="真实姓名">
                <el-input
                    v-model="formInline.name"
                    placeholder="真实姓名"
                ></el-input>
            </el-form-item>
            <el-form-item label="行政区划">
                <el-input
                    v-model="formInline.regionName"
                    placeholder="行政区划"
                ></el-input>
            </el-form-item>
            <el-form-item label="人员归属">
                <!-- <el-input v-model="formInline.regionName" placeholder="人员归属"></el-input> -->
                <el-select v-model="formInline.company" placeholder="请选择" clearable>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="onblur(1)"
                >查询</el-button>
            </el-form-item>
            <el-form-item v-if="sessionlevel!='3' && sessionName == '管理员'">
                <el-button
                    type="primary"
                    @click="Addproject"
                >添加</el-button>
            </el-form-item>
        </el-form>
        <div style="background:#FFF;height: calc(100% - 88px);">
            <el-table
                v-loading="listLoading"
                :data="list"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
                height="70vh"
            >
                <el-table-column
                    align="center"
                    label="序号"
                    width="95"
                >
                    <template slot-scope="scope">
                        {{ scope.row.id }}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="行政区划"
                >
                    <template slot-scope="scope">
                        {{ scope.row.regionIdMap.name }}
                    </template>
                    <!--  <el-table-column
                        label="州市"
                        align="center"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.regionIdMap.name }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="县区"
                        align="center"
                    >
                        <template slot-scope="scope">
                            {{ scope.row.regionIdMap.name }}
                        </template>
                    </el-table-column> -->
                </el-table-column>
                <el-table-column
                    label="真实姓名"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{ scope.row.trueName }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="性别"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex  | statusFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="联系电话"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.phone ?  scope.row.phone :'未上传'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="检测资格证号"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.qualifications ?  scope.row.qualifications :'未上传'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="工作证职务"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{ scope.row.job ? scope.row.job:'-' }}
                    </template>
                </el-table-column>
                <el-table-column
                    class-name="status-col"
                    label="工作服配备情况"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{ scope.row.coverall ? scope.row.coverall:'-' }}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="created_at"
                    label="操作"
                    width="300"
                >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
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
        <div
            v-show="imgShow"
            class="imgShow"
        >
            <el-carousel
                :autoplay="false"
                height="1030px"
            >
                <el-carousel-item
                    v-for="item in imgList"
                    :key="item"
                >
                    <img :src="item">
                </el-carousel-item>
            </el-carousel>
            <div
                class="closer"
                @click.stop="imgShow = false"
            > × </div>
        </div>
        <!-- 添加弹框 -->
        <el-dialog
            width="30%"
            title="添加用户"
            :visible.sync="dialog.innerVisible"
            append-to-body
        >
            <el-form
                :label-position="labelPosition"
                label-width="100px"
                :model="formLabelAlign"
                ref="ruleForm"
            >
                <el-form-item
                    label="用户名"
                    prop="name"
                >
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="密码"
                    prop="password"
                >
                    <el-input v-model="formLabelAlign.password"></el-input>
                </el-form-item>
                <el-form-item
                    label="真实姓名"
                    prop="true_name"
                >
                    <el-input v-model="formLabelAlign.trueName"></el-input>
                </el-form-item>
                <el-form-item
                    label="手机号"
                    prop="phone"
                >
                    <el-input v-model="formLabelAlign.phone"></el-input>
                </el-form-item>
                <el-form-item
                    label="用户资格证号"
                    prop="qualifications"
                >
                    <el-input v-model="formLabelAlign.qualifications"></el-input>
                </el-form-item>
                <el-form-item label="人员归属" prop="company">
                    <el-select v-model="formLabelAlign.company" placeholder="请选择" clearable :disabled="formLabelAlign.flag">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="性别"
                    prop="sex"
                >
                    <el-radio-group v-model="formLabelAlign.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    label="工作证职务"
                    prop="job"
                >
                    <el-input v-model="formLabelAlign.job"></el-input>
                </el-form-item>
                <el-form-item
                    label="工作服配置"
                    prop="coverall"
                >
                    <el-input v-model="formLabelAlign.coverall"></el-input>
                </el-form-item>
                <!-- <el-form-item
                    label="用户签名图片"
                    prop="file"
                >
                    <el-upload
                        action=""
                        ref="upload"
                        accept=".jpg,.jpeg,.png"
                        :limit="1"
                        :before-upload="uploadHttpimg"
                    >
                        <el-button
                            size="mini"
                            type="primary"
                        >上传签名</el-button>
                    </el-upload>
                </el-form-item> -->
                <el-form-item label="行政区域">
                    <el-radio-group
                        v-model="formLabelAlign.radio"
                        @change="changeBox"
                    >
                        <el-radio :label="3">县级</el-radio>
                        <el-radio :label="6">市级</el-radio>
                        <el-radio
                            :label="9"
                            v-if="sessionlevel == '1'"
                        >省级</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    label="市级"
                    prop="regionId"
                    v-if="formLabelAlign.radio == 6"
                >
                    <el-select
                        v-model="formLabelAlign.regionId"
                        clearable
                        placeholder="行政区域"
                    >
                        <el-option
                            v-for="item in regionIdlevelList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                            <span>{{ item.name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="省级"
                    prop="regionId"
                    v-if="formLabelAlign.radio == 9"
                >
                    <el-select
                        v-model="formLabelAlign.regionId"
                        clearable
                        placeholder="行政区域"
                    >
                        <el-option
                            v-for="item in regionIdlevelListsheng"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                            <span>{{ item.name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="市级"
                    prop="regionId"
                    v-if="formLabelAlign.radio == 3 && sessionlevel == '1'"
                >
                    <el-select
                        v-model="formLabelAlign.flag"
                        clearable
                        placeholder="行政区域"
                        @change="changeShi"
                    >
                        <el-option
                            v-for="item in regionIdlevelxian"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                        >
                            <span>{{ item.name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="县级"
                    prop="regionId"
                    v-if="formLabelAlign.radio == 3"
                >
                    </el-select>
                    <el-select
                        v-model="formLabelAlign.regionId"
                        clearable
                        placeholder="行政区域"
                    >
                        <el-option
                            v-for="item in regionIdlevelListxian"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                            <span>{{ item.name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item
                    label="角色"
                    prop="roleId"
                >
                    <el-select
                        v-model="formLabelAlign.roleId"
                        clearable
                        placeholder="角色编号"
                    >
                        <el-option
                            v-for="item in regionIdList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                            <span>{{ item.name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--  <el-form-item
                    label="用户签名图片"
                    prop="file"
                >
                    <el-input v-model="formLabelAlign.file"></el-input>
                </el-form-item> -->
                <el-form-item style="display: flex;justify-content: flex-end;">
                    <el-button
                        type="primary"
                        @click="submitForm('ruleForm')"
                    >保存</el-button>
                    <el-button @click="unfollow">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 编辑弹框 -->
        <el-dialog
            width="30%"
            title="编辑用户"
            :visible.sync="dialogone.innerVisible"
            append-to-body
        >
            <el-form
                :label-position="labelPosition"
                label-width="100px"
                :model="formLabel"
                ref="ruleForm"
            >
                <el-form-item
                    label="真实姓名"
                    prop="true_name"
                >
                    <el-input v-model="formLabel.trueName"></el-input>
                </el-form-item>
                <el-form-item
                    label="性别"
                    prop="sex"
                >
                    <el-radio-group v-model="formLabel.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    label="联系电话"
                    prop="phone"
                >
                    <el-input v-model="formLabel.phone"></el-input>
                </el-form-item>
                <!-- <el-form-item
                    label="行政区域"
                    prop="regionId"
                >
                    <el-select
                        v-model="formLabel.regionId"
                        clearable
                        placeholder="行政区域"
                    >
                        <el-option
                            v-for="item in regionIdlevelList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                            <span>{{ item.name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item> -->
               <!--  <el-form-item
                    label="角色"
                    prop="roleId"
                >
                    <el-select
                        v-model="formLabel.roleId"
                        clearable
                        placeholder="角色编号"
                    >
                        <el-option
                            v-for="item in regionIdList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                            <span>{{ item.name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <!-- <el-form-item
                    label="用户签名图片"
                    prop="file"
                >
                    <el-input v-model="formLabel.file"></el-input>
                </el-form-item> -->
                <el-form-item
                    label="用户资格证号"
                    prop="qualifications"
                >
                    <el-input v-model="formLabel.qualifications"></el-input>
                </el-form-item>
                <el-form-item label="人员归属" prop="company">
                    <el-select v-model="formLabel.company" placeholder="请选择" clearable :disabled="formLabel.flag">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="工作证职务"
                    prop="job"
                >
                    <el-input v-model="formLabel.job"></el-input>
                </el-form-item>
                <el-form-item
                    label="工作服配备"
                    prop="coverall"
                >
                    <el-radio-group v-model="formLabel.coverall">
                        <el-radio label="是">是</el-radio>
                        <el-radio label="否">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="display: flex;justify-content: flex-end;">
                    <el-button
                        type="primary"
                        @click="compile()"
                    >保存</el-button>
                    <el-button @click="dialogone.innerVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 二级角色设置 -->
        <el-dialog
            width="30%"
            title="二级角色设置"
            :visible.sync="dialogtwo.innerVisible"
            append-to-body
        >
            <el-form
                :label-position="labelPosition"
                label-width="100px"
                :model="formLabel"
                ref="ruleForm"
            >

                <el-form-item
                    label="角色编号"
                    prop="roleId"
                >
                    <el-select
                        v-model="formLabeltwo"
                        clearable
                        multiple
                        placeholder="角色编号"
                    >
                        <el-option
                            v-for="item in regionIdList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                            <span>{{ item.name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item style="display: flex;justify-content: flex-end;">
                    <el-button
                        type="primary"
                        @click="compiletwo()"
                    >保存</el-button>
                    <el-button @click="resettwoForm('ruleForm')">清空</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>

</template>

<script>
import {
    getList,
    PostList,
    GetroleList,
    compiletwo,
    getInfoByParentCode,
    RemoveUser,
} from "@/api/user";
import Page from "@/components/page/index.vue";
export default {
    filters: {
        statusFilter(status) {
            if (status == "1" || status == "2") {
                const statusMap = {
                    1: "男",
                    2: "女",
                };
                return statusMap[status];
            } else {
                return "-";
            }
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
            trueName: "shengguanli",
            regionId: "",
            roleId: "",
            state: "",
            formInline: {
                name: "",
                company:"",
            },
            formLabelAlign: {
                name: "",
                password: "",
                trueName: "",
                regionId: "",
                roleId: "",
                phone: "",
                file: "",
                radio: 3,
                flag: "",
                qualifications: "",
                sex: 1,
                job: "",
                coverall: "",
                file: "",
            },
            formLabel: {
                name: "",
                password: "",
                trueName: "",
                regionId: "",
                roleId: "",
                file: "",
                id: "",
                qualifications: "",
                phone:'',
                sex: '',
                job: "",
                coverall: "",
                file: "",
            },
            labelPosition: "left",
            dialog: {
                innerVisible: false,
            },
            dialogone: {
                innerVisible: false,
            },
            dialogtwo: {
                innerVisible: false,
            },
            regionIdList: [],
            regionIdlevelxian: [],
            regionIdlevelList: [],
            regionIdlevelListsheng: [],
            regionIdlevelListxian: [],
            imgList: [],
            imgShow: false,
            formLabeltwo: [],
            roleIdMap: "",
            roleIdMapName: "",
            options: [
                {
                    value: "1",
                    label: "云南省气象灾害防御技术中心"
                },
                {
                    value: "2",
                    label: "云南启旭科技有限公司"
                }
            ]
        };
    },
    components: {
        Page,
    },
    created() {
        this.getcompany()
        this.fetchData();
        this.changeBox();
        const params = JSON.parse(sessionStorage.getItem("records"));
        if (params.regionIdMap.level == "3") {
            this.formLabelAlign.radio = 3;
        } else if (params.regionIdMap.level == "2") {
            this.formLabelAlign.radio = 6;
            this.regionIdlevelList.push({
                name: params.regionIdMap.name,
                id: params.regionIdMap.id,
            });
        } else if (params.regionIdMap.level == "1") {
            this.formLabelAlign.radio = 9;
            this.regionIdlevelListsheng.push({
                name: params.regionIdMap.name,
                id: params.regionIdMap.id,
            });
        }
    },
    computed: {
        sessionlevel() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            return records.roleIdMap.level;
        },
        sessionName() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            return records.roleIdMap.name;
        },
    },
    methods: {
        getcompany() {
            const params = JSON.parse(sessionStorage.getItem("records"));
            /* console.log(params.company,'人员归属') */
            this.formInline.company = params.company == '1' ? '云南省气象灾害防御技术中心' : '云南启旭科技有限公司';
        },
        fetchData() {
            this.listLoading = true;
            const params = JSON.parse(sessionStorage.getItem("records"));
            getList({
                size: this.size,
                current: this.current,
                regionId: params.regionIdMap.id,
                statisticalStatus:'1',
                state:'1',
                company: this.formInline.company == '云南省气象灾害防御技术中心' ? '1' : '2',
            }).then((response) => {
                /* console.log(response.data.records); */
                this.list = response.data.records;
                this.total = response.data.total;
                this.listLoading = false;
            });
        },
        changeShi() {
            this.formLabelAlign.regionId = "";
            getInfoByParentCode({
                parentcode: this.formLabelAlign.flag,
            }).then((res) => {
                this.regionIdlevelListxian = res.data.records;
            });
        },
        changeBox() {
            if (this.formLabelAlign.radio == 3) {
                this.GetroleList(3);
            } else if (this.formLabelAlign.radio == 6) {
                this.GetroleList(2);
            } else if (this.formLabelAlign.radio == 9) {
                this.GetroleList(1);
            }
            this.formLabelAlign.regionId = "";
            this.formLabelAlign.roleId = "";
        },
        onblur(current) {
            const params = JSON.parse(sessionStorage.getItem("records"));
            getList({
                size: this.size,
                current: current,
                trueName: this.formInline.name,
                regionId: params.regionIdMap.id,
                roleId: params.roleId,
                state: params.state,
                regionName: this.formInline.regionName,
                statisticalStatus:'1',
                company: this.formInline.company,
            }).then((response) => {
                this.list = response.data.records;
                this.total = response.data.total;
                this.listLoading = false;
            });
        },
        imgCom(row) {
            let arr = row.split(",");
            if (arr.length > 0) {
                return arr[0];
            } else {
                return arr;
            }
        },
        imgShowList(row) {
            let arr = row.split(",");
            this.imgList = arr
                .map((item) => {
                    return (
                        "http://140.249.209.176:8084/LightningDetection/UserSign/" +
                        item
                    );
                })
                .join(",")
                .split(",");
            setTimeout(() => {
                this.imgShow = true;
            }, 100);
        },
        pageChange(page) {
            this.size = page._pageSize;
            this.current = page._currentPage;
            this.onblur(this.current);
        },
        /* 编辑用户 */
        handleEdit(index, row) {
            const params = JSON.parse(sessionStorage.getItem("records"));
            if(params.company =='2'){
                this.formLabel.company = '2';
                this.formLabel.flag =true;
            }else{
                this.formLabel.flag =false;
            }
            this.dialogone.innerVisible = true;
            this.formLabel.name = row.userName;
            this.formLabel.password = row.password;
            this.formLabel.sex = row.sex=='1'? 1:2;
            this.formLabel.phone = row.phone;
            this.formLabel.trueName = row.trueName;
            this.formLabel.regionId = row.regionIdMap.id;
            this.formLabel.roleId = row.roleIdMap.id;
            this.formLabel.qualifications = row.qualifications;
            this.formLabel.job = row.job;
            this.formLabel.coverall = row.coverall;
            this.formLabel.id = row.id;
            this.formLabel.company = row.company;
            this.GetroleList(row.roleIdMap.level);
            this.getInfoByParentCode(row.regionIdMap.code);
        },
        /* 二级用户设置 */
        handleEdittwo(row) {
            this.roleIdMap = row.id;
            this.roleIdMapName = row.roleIdMap.name;
            this.dialogtwo.innerVisible = true;
            this.GetroleList(row.roleIdMap.level);
        },
        /* 提交 */
        compile() {
            PostList({
                userName: this.formLabel.name,
                password: this.formLabel.password,
                trueName: this.formLabel.trueName,
                regionId: this.formLabel.regionId,
                roleId: this.formLabel.roleId,
                id: this.formLabel.id,
                qualifications: this.formLabel.qualifications,
                job:this.formLabel.job,
                coverall:this.formLabel.coverall,
                sex:this.formLabel.sex,
                phone:this.formLabel.phone,
                company:this.formLabel.company,
            }).then((res) => {
                this.$message.success(res.data.stateStr);
                if (res.data.stateStr == "成功") {
                    this.$message.success("修改成功");
                    this.dialogone.innerVisible = false;
                    this.fetchData();
                } else {
                    this.$message.error("修改失败");
                }
            });
        },
        /* 添加用户 */
        Addproject() {
            const params = JSON.parse(sessionStorage.getItem("records"));
            if (params.regionIdMap.level == "3") {
                this.formLabelAlign.radio = 3;
            } else if (params.regionIdMap.level == "2") {
                this.formLabelAlign.radio = 6;
            } else if (params.regionIdMap.level == "1") {
                this.formLabelAlign.radio = 9;
                this.regionIdlevelListsheng = [];
                this.regionIdlevelListsheng.push({
                    name: params.regionIdMap.name,
                    id: params.regionIdMap.id,
                });
            }
            if(params.company =='2'){
                this.formLabelAlign.company = '2';
                this.formLabelAlign.flag =true;
            }else{
                this.formLabelAlign.flag =false;
            }
            this.dialog.innerVisible = true;
            this.GetroleList(params.roleIdMap.level);
            this.getInfoByParentCode(params.regionIdMap.code);
        },
        // 保存用户信息
        submitForm() {
            PostList({
                userName: this.formLabelAlign.name,
                password: this.formLabelAlign.password,
                trueName: this.formLabelAlign.trueName,
                regionId: this.formLabelAlign.regionId,
                roleId: this.formLabelAlign.roleId,
                phone: this.formLabelAlign.phone,
                qualifications: this.formLabelAlign.qualifications,
                sex: this.formLabelAlign.sex,
                job: this.formLabelAlign.job,
                coverall: this.formLabelAlign.coverall,
                file: this.formLabelAlign.file,
                company:this.formLabelAlign.company,
            }).then((res) => {
                if (res.data.state == 200) {
                    this.fetchData();
                    this.$message.success("添加成功");
                    this.dialog.innerVisible = false;
                    this.formLabelAlign = {};
                } else {
                    this.$message.error("添加失败");
                    this.dialog.innerVisible = false;
                    this.formLabelAlign = {};
                }
            });
        },
        // 保存二级角色
        compiletwo() {
            const arr = this.formLabeltwo.toString(",");
            compiletwo({
                userId: this.roleIdMap,
                roleIds: arr,
            }).then((res) => {
                if (res.data.state == 200) {
                    this.$message.success("保存二级角色成功");
                    this.dialogtwo.innerVisible = false;
                    this.fetchData();
                    this.resettwoForm();
                } else {
                    this.dialogtwo.innerVisible = false;
                    this.$message.error("保存二级角色失败");
                    this.resettwoForm();
                }
            });
        },
        // 清空二级信息
        resettwoForm() {
            this.formLabeltwo = [];
        },
        unfollow() {
            this.dialog.innerVisible = false;
            this.formLabelAlign.regionId = "";
        },
        // 查询角色列表
        GetroleList(records) {
            this.regionIdList = [];
            GetroleList({
                level: records,
            }).then((res) => {
                res.data.records.map((item) => {
                    if (this.roleIdMapName == item.name) {
                        return;
                    } else {
                        this.regionIdList.push(item);
                    }
                });
            });
        },
        // 根据上一级编号查询下级全部区划信息
        getInfoByParentCode(code) {
            getInfoByParentCode({
                parentcode: code,
            }).then((res) => {
                if (this.sessionlevel == "1") {
                    this.regionIdlevelList = res.data.records;
                    this.regionIdlevelxian = res.data.records;
                } else if (this.sessionlevel == "2") {
                    this.regionIdlevelListxian = res.data.records;
                }
            });
        },
        /* 删除用户 */
        handleDetele(row) {
            this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    RemoveUser({ userId: row.id }).then((res) => {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        this.fetchData();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        uploadHttpimg(data) {},
    },
};
</script>
<style lang="scss" scoped>
.imgShow {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.1);
    img {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 50%;
        transform: translate(-50%, -100%);
    }
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
    margin-bottom: 5vh;
}
::v-deep .el-select {
    width: 100%;
}
</style>
