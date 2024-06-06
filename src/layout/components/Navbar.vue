<template>
    <div class="navbar">
        <div class="right-menu">
            <el-badge
                :value="this.$store.state.app.length + this.$store.state.app.lengthtwo > 0 ? this.$store.state.app.length + this.$store.state.app.lengthtwo:''"
                :max="9"
                class="item"
                style="margin-right: 25px;margin-top: 20px;"
                @click.native="badgeClick"
            >
                <img
                    src="../../assets/bell.png"
                    alt=""
                >
            </el-badge>
            <div class="avatar-wrapper">
                <el-button
                    size="small"
                    type="primary"
                >{{roleIdMapName}}</el-button>
            </div>
            <el-dropdown
                class="avatar-container"
                trigger="click"
            >
                <div class="avatar-wrapper">
                    <el-button size="small">{{name ? name : sessionName}}</el-button>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item @click.native="switchover">
                        <span style="display:block;">切换角色</span>
                    </el-dropdown-item> -->
                    <router-link to="personal">
                        <el-dropdown-item>
                            个人信息
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item
                        divided
                        @click.native="logout"
                    >
                        <span style="display:block;">退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
           
        </div>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
    components: {
        Breadcrumb,
        Hamburger,
    },
    computed: {
        ...mapGetters(["name"]),
        sessionName() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            return records.trueName;
        },
        roleIdMapName() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            return records.roleIdMap.other;
        },
    },
    data() {
        return {
            dialogVisible: false,
            rolevalue: "",
            roleIdMap: {},
        };
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch("app/toggleSideBar");
        },
        logout() {
            this.$router.push(`/login`);
            sessionStorage.clear();
        },
        badgeClick() {
            this.$router.push("/inform");
        },
       
       /*  switchover() {
            this.$store.commit('app/cutListFlag',true)
        }, */
    
    },
};
</script>

<style lang="scss" scoped>
.navbar {
    height: 70px;
    overflow: hidden;
    position: absolute;
    top: 0px;
    right: 70px;
    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        height: 100%;
        line-height: 70px;
        display: flex;
        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }
        img {
            width: 40px;
            cursor: pointer;
        }
        ::v-deep.el-badge__content.is-fixed {
            top: 0;
            right: 15px;
            cursor: pointer;
        }
        .avatar-container {
            .avatar-wrapper {
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
        .cutList{
            position:absolute;
            top: 10px;
            left: 200px;
        }
    }
}
</style>
