<template>
    <div
        class="app-container"
        style="height:100%"
    >
        <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
        >
            <div>
                环节配置
            </div>
            <div>
                <!-- <el-form-item
                    label="市级："
                    prop="regionId"
                >
                    <el-select
                        v-model="formInline.flag"
                        clearable
                        placeholder="查询指定行政区划"
                        @change="changeShiOne"
                    >
                        <el-option
                            v-for="item in regionIdlevelxianOne"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                        >
                            <span>{{ item.name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="县级："
                    prop="regionId"
                >
                    </el-select>
                    <el-select
                        v-model="formInline.regionId"
                        clearable
                        placeholder="查询指定行政区划"
                    >
                        <el-option
                            v-for="item in regionIdlevelListxianOne"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                            <span>{{ item.name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        size="small"
                        @click="onblur()"
                    >查询</el-button>
                </el-form-item> -->
                <el-form-item>
                    <el-button
                        type="primary"
                        size="small"
                        @click="dialog.innerVisible = true"
                    >添加</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="content">
            <el-table
                v-loading="listLoading"
                :data="list"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
            >
                <el-table-column
                    align="center"
                    label="ID"
                    width="95"
                    type="index"
                >
                </el-table-column>
                <el-table-column
                    label="已配置区县"
                    align="center"
                >
                    <template slot-scope="scope">
                        <div style="width: 85%">
                            {{ scope.row.regionInfo.name }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="created_at"
                    label="编辑"
                    width="300"
                >
                    <template slot-scope="scope">
                        <!--  <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button> -->
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)"
                        >删除</el-button>
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
        <!-- 添加弹框 -->
        <el-dialog
            width="30%"
            title="添加配置"
            :visible.sync="dialog.innerVisible"
            append-to-body
            @close='closeBox'
        >
            <el-form
                :label-position="labelPosition"
                label-width="60px"
                :model="formLabelAlign"
                ref="ruleForm"
            >
                <el-form-item
                    label="市级："
                    prop="regionId"
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
                    label="县级："
                    prop="regionId"
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
                <el-form-item style="display: flex;justify-content: flex-end;margin-top: 22px;margin-bottom: 0;">
                    <el-button
                        size="small"
                        @click="dialog.innerVisible = false"
                    >取消</el-button>
                    <el-button
                        type="primary"
                        @click="onSubmit"
                        size="small"
                    >确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {
    settingConfig,
    settingDelete,
    settingSaveOrUpdate,
    settingGetByRegionId,
} from "@/api/config";
import { getInfoByParentCode } from "@/api/user";
import Page from "@/components/page/index.vue";
export default {
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: "success",
                draft: "gray",
                deleted: "danger",
            };
            return statusMap[status];
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
            regionId: "",
            formInline: {
                flag: "",
                regionId: "",
            },
            formLabelAlign: {
                flag: "",
                regionId: "",
            },
            regionIdlevelxianOne: [],
            regionIdlevelListxianOne: [],
            regionIdlevelxian: [],
            regionIdlevelListxian: [],
            labelPosition: "left",
            dialog: {
                innerVisible: false,
            },
        };
    },
    components: {
        Page,
    },
    created() {
        this.fetchData();
    },
    mounted() {
        const params = JSON.parse(sessionStorage.getItem("records"));
        console.log(params);
        
        this.getInfoByParentCode(params.regionIdMap.code);
    },
    methods: {
        fetchData() {
            const params = JSON.parse(sessionStorage.getItem("records"));
            this.listLoading = true;
            settingConfig({
                size: this.size,
                current: this.current,
                company:params.company
            }).then((response) => {
                this.list = response.data.records;
                this.total = response.data.total;
                this.listLoading = false;
            });
        },
        onblur() {
            const params = JSON.parse(sessionStorage.getItem("records"));
            settingGetByRegionId({
                regionId: this.formInline.regionId,
                company:params.company
            }).then((res) => {
               /*  console.log(res, "查询成功"); */
            });
        },
        pageChange(page) {
            this.size = page._pageSize;
            this.current = page._currentPage;
            this.fetchData();
        },
        /* 删除信息 */
        handleDelete(row) {
            this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    settingDelete({
                        settingId: row.id,
                    }).then((res) => {
                        if (
                            res.data.state == 200 &&
                            res.data.stateStr == "成功"
                        ) {
                            this.$message.success("删除成功");
                            this.fetchData();
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
        // 根据上一级编号查询下级全部区划信息
        getInfoByParentCode(code) {
            getInfoByParentCode({
                parentcode: code,
            }).then((res) => {
                this.regionIdlevelxian = res.data.records;
                this.regionIdlevelxianOne = res.data.records;
            });
        },
        /* 添加 */
        onSubmit() {
            const params = JSON.parse(sessionStorage.getItem("records"));
            settingSaveOrUpdate({
                regionId: this.formLabelAlign.regionId,
                company:params.company
            }).then((res) => {
                if (res.data.state == 200) {
                    this.$message.success("添加成功");
                    this.fetchData();
                } else {
                    this.$message.error(res.data.message);
                }
                this.dialog.innerVisible = false;
            });
        },
        closeBox() {
            this.formLabelAlign = {};
            this.regionIdlevelListxian = []
        },
        changeShiOne() {
            getInfoByParentCode({
                parentcode: this.formInline.flag,
            }).then((res) => {
                this.regionIdlevelListxianOne = res.data.records;
            });
        },
        changeShi() {
            getInfoByParentCode({
                parentcode: this.formLabelAlign.flag,
            }).then((res) => {
                this.regionIdlevelListxian = res.data.records;
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.demo-form-inline {
    padding: 0.75rem 1.5rem;
    background: #fff;
    margin-bottom: 0.4375rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.125rem;
    .el-form-item {
        margin-bottom: 0;
    }
}
.content {
    background: #fff;
    padding: 1.5rem;
    height: calc(100% - 4.375rem);
    ::v-deep .el-table th {
        color: #666666;
        font-size: 0.9375rem;
        font-weight: 600;
    }
    .textarea {
        display: inline-block;
        height: 2.125rem;
        overflow: hidden;
        font-size: 0.75rem;
        line-height: 0.75rem;
    }
    .el-table {
        height: calc(100% - 4.5rem);
    }
}
.el-switch {
    height: 1.6875rem;
}
.el-table td div {
    white-space: nowrap;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
}
::-webkit-scrollbar {
    width: 0.3125rem;
    height: 0.625rem;
}
::-webkit-scrollbar-thumb {
    //滑块部分
    border-radius: 0.3125rem;
    background-color: rgb(206, 184, 219);
}
::-webkit-scrollbar-track {
    //轨道部分
    box-shadow: inset 0 0 0.3125rem rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 0.3125rem;
}
::v-deep .el-select {
    width: 100%;
}
</style>
