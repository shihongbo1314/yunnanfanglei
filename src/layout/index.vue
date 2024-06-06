<template>
    <div
        :class="classObj"
        class="app-wrapper"
    >
        <div class="header">
            <div class="logo">
                <img
                    src="../assets/logo2.png"
                    alt=""
                >
            </div>
            <h3 class="title">雷电防护装置检测业务管理服务平台</h3>
            <div :class="{'fixed-header':fixedHeader}">
                <navbar />
            </div>
            <div
                class="cutList"
            >
                <el-tag
                    v-for="item in options"
                    :key="item.roleIdMap.id"
                    @click.native="changeGateway(item)"
                    :label="item.roleIdMap.name"
                    :value="item.roleIdMap.id"
                    class="el-tag-sty"
                    :class="active == item.roleIdMap.id ? 'active':''"
                >
                    {{item.roleIdMap.name}}
                </el-tag>
            </div>
        </div>
        <div
            v-if="device==='mobile'&&sidebar.opened"
            class="drawer-bg"
            @click="handleClickOutside"
        />
        <sidebar class="sidebar-container" />
        <div
            class="main-container"
            :class="{'isshow':!this.$store.state.app.trunoff}"
        >
            <app-main />
        </div>
        <div class="footer-footer">版权所有：云南省气象灾害防御技术中心</div>
    </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { multirole } from "@/api/user";
export default {
    name: "Layout",
    data() {
        return {
            options: [],
            active: null,
        };
    },
    components: {
        Navbar,
        Sidebar,
        AppMain,
    },
    created() {
        this.multirole();
    },
    mounted() {
        const records = JSON.parse(sessionStorage.getItem("records"));
        this.active = records.roleIdMap.id;
    },
    mixins: [ResizeMixin],
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar;
        },
        device() {
            return this.$store.state.app.device;
        },
        fixedHeader() {
            return this.$store.state.settings.fixedHeader;
        },
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === "mobile",
            };
        },
    },
    methods: {
        handleClickOutside() {
            this.$store.dispatch("app/closeSideBar", {
                withoutAnimation: false,
            });
        },
        multirole() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            multirole({
                userId: records.id,
            }).then((res) => {
                this.options = res.data.records;
               /*  console.log(this.options); */
            });
        },
        changeGateway(item) {
            this.active = item.roleIdMap.id;
            const records = JSON.parse(sessionStorage.getItem("records"));
            const obj = records.roleIdMap;
            obj.id = item.roleIdMap.id;
            obj.level = item.roleIdMap.level;
            obj.name = item.roleIdMap.name;
            obj.other = item.roleIdMap.other;
            obj.sign_state = item.roleIdMap.sign_state;
            sessionStorage.setItem("records", JSON.stringify(records));
            this.$message.success({
                offset:80,
                message:"切换角色成功"
            });
            setTimeout(() => {
                location.reload();
            }, 1000);
            this.$router.replace("/HomePage");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
    .header {
        width: 100%;
        height: 70px;
        background-color: rgb(0, 140, 219);
        .logo {
            width: 200px;
            height: 70px;
            background: url(../assets/logo_bg.png) no-repeat;
            text-align: center;
            background-size: 103% 105%;
            img {
                margin-top: 4px;
                margin-right: 40px;
                width: 60px;
                height: 60px;
            }
        }
        h3 {
            margin: 0;
        }
        .title {
            top: 20px;
            left: 214px;
            font-weight: 500;
            position: absolute;
            font-size: 26px;
            color: #fff;
        }
        .cutList {
            position: absolute;
            top: 10px;
            left: 35%;
            .el-tag-sty {
                margin-right: 10px;
                cursor: pointer;
                height: 50px;
                line-height: 50px;
            }
        }
    }
    .sidebar-container {
        position: fixed;
        top: 70px;
        left: 0;
    }
    .footer-footer {
        bottom: 0;
        left: 0;
        height: 30px;
        position: absolute;
        background-color: rgb(0, 140, 219);
        line-height: 30px;
        color: #fff;
        text-align: center;
        width: 100%;
        z-index: 9999;
    }
}
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px);
}

.mobile .fixed-header {
    width: 100%;
}
.isshow {
    margin-left: 0px !important;
}
.active {
    background-color: #fef0f0;
    border-color: #fde2e2;
    color: #f56c6c;
}
</style>
