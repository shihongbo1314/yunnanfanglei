<template>
    <div class="message">
        <div class="message-header">
            <div>消息中心</div>
            <el-tooltip
                content="一键已读"
                placement="bottom"
                effect="light"
            >
                <el-button
                    circle
                    style="margin-right: 10px;"
                    @click="Aread"
                >
                    <svg-icon icon-class="saoba" />
                </el-button>
            </el-tooltip>
        </div>
        <el-tabs v-model="activeName">
            <el-tab-pane name="first">
                <span slot="label">项目通知<el-badge
                        :value="this.$store.state.app.length"
                        v-if="this.$store.state.app.length > 0"
                        :max="9"
                    ></el-badge></span>
                <div class="message-body">
                    <div class="boxs">
                        <el-card
                            class="box-card"
                            v-for="(item,index) in messageList"
                            :key="index"
                        >
                            <el-badge
                                :is-dot="item.read=='0' ? true : false"
                                class="item"
                                style="width:100%"
                            >
                                <div>
                                    <div class="box-card-box">
                                        <div class="card_box">{{item.id}}. 审核通知</div>

                                        <div class="card_box2">{{item.saveTime}}</div>
                                    </div>
                                    <div class="box-card-box2">
                                        <div style="line-height: 28px;">{{item.msg}}</div>
                                        <div>
                                            <el-button
                                                size="mini"
                                                :disabled='item.projectMap.original_record_path==null'
                                                @click="original(item.projectMap)"
                                            >详细信息</el-button>
                                            <el-button
                                                size="mini"
                                                :disabled='item.projectMap.test_img==null'
                                                v-if="sessionName == '备案人' || sessionName == '管理员'|| sessionName == '编制人'|| sessionName == '编印人'"
                                                @click="detection(item.projectMap.test_img)"
                                            >检测报告下载</el-button>
                                            <el-button
                                                size="mini"
                                                :disabled='item.projectMap.contract_file==null'
                                                v-if="sessionName == '备案人' || sessionName == '管理员'"
                                                @click="contract(item.projectMap.contract_file)"
                                            >合同下载</el-button>
                                        </div>
                                    </div>
                                </div>
                            </el-badge>
                        </el-card>
                    </div>
                    <Page
                        :total="total"
                        :pageNum="current"
                        :pageSize="size"
                        @pageChange="pageChange"
                    />
                </div>
            </el-tab-pane>
            <el-tab-pane name="second">
                <span slot="label">留言信息
                    <el-badge
                        :value="notice"
                        :max="9"
                        v-if="notice > 0"
                    ></el-badge>
                </span>
                <div class="messageBox">
                    <el-card
                        class="box-card"
                        v-for="(item,index) in message_List"
                        :key="index"
                    >
                        <el-badge
                            :is-dot="item.isread=='0' ? true : false"
                            class="item"
                            style="width:100%"
                        >
                            <div>
                                <div class="box-card-box">
                                    <div class="card_box">{{index + 1}}.{{item.number}} </div>

                                    <div class="card_box2">{{item.saveTime}}</div>
                                </div>
                                <div class="box-card-box2">
                                    <div style="line-height: 28px;">{{item.senderUserMap.trueName}}：{{item.content}}</div>
                                    <i
                                        class="el-icon-chat-dot-round"
                                        @click="BtnClick(item)"
                                    />

                                </div>
                            </div>
                        </el-badge>
                    </el-card>
                </div>
                <div
                    class="jiaBox"
                    v-drag
                    v-if="ishow"
                >
                    <div class="header">留言栏<i
                            class="el-icon-close"
                            @click="close"
                        ></i></div>
                    <div
                        class="messbox"
                        ref="messbox"
                    >
                        <div
                            class="boxs"
                            v-for="send in jiaBoxList"
                        >
                            <div
                                class="leftbox"
                                v-if="send.senderUserMap.id != regionId.id"
                            >
                                <span>{{send.senderUserMap.userName}}</span>
                                <span style="display:block">{{send.saveTime}}</span>
                                <div class="mess_box">
                                    {{send.content}}
                                </div>
                            </div>
                            <div
                                class="rightbox"
                                v-else
                            >
                                <span>{{send.senderUserMap.userName}}</span>
                                <span style="display:block">{{send.saveTime}}</span>
                                <div class="mess_box">
                                    {{send.content}}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="leaveMess">
                        <el-input
                            v-model="textarea"
                            size='small'
                            placeholder="请输入内容"
                        ></el-input>
                        <el-button
                            type="primary"
                            size="small"
                            @click="postMessList"
                        >发送</el-button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>
<script>
// @ is an alias to /src
import {
    projectmsg,
    AllRead,
    getMsgCount,
    getMessList,
    postMessList,
    allreadMess,
} from "@/api/user";
import Page from "@/components/page/index.vue";
export default {
    name: "XXX",
    data() {
        return {
            total: 0,
            current: 1,
            size: 10,
            messageList: [],
            activeName: "first",
            message_List: [],
            senderUserList: [],
            jiaBoxList: [],
            textarea: "",
            regionId: null,
            ishow: false,
            receiveUserid: "",
            examineId: "",
            notice: "" /* 项目通知 */,
        };
    },
    components: {
        Page,
    },
    mounted() {
        this.regionId = JSON.parse(sessionStorage.getItem("records"));
        this.getMessList();
        this.getMessListread();
    },
    created() {
        const records = JSON.parse(sessionStorage.getItem("records"));
        this.projectmsg(records);
        this.getMsgCount(records);
    },
    computed: {
        sessionName() {
            const records = JSON.parse(sessionStorage.getItem("records"));
            return records.roleIdMap.name;
        },
    },
    methods: {
        projectmsg(records) {
            projectmsg({
                current: this.current,
                size: this.size,
                userId: records.id,
                roleId: records.roleIdMap.id,
            }).then((res) => {
                this.messageList = res.data.records;
                this.total = res.data.total;
            });
        },
        pageChange(page) {
            const records = JSON.parse(sessionStorage.getItem("records"));
            this.size = page._pageSize;
            this.current = page._currentPage;
            this.projectmsg(records);
        },
        original(item) {
            if (
                this.sessionName == "对接人" ||
                this.sessionName == "审核人" ||
                this.sessionName == "终审人" ||
                this.sessionName == "编印人"
            ) {
                this.$router.push({
                    path: "/aviation/information",
                    query: { number: item.number },
                });
            } else {
                this.$router.push({
                    path: "/aviation/reference",
                    query: { number: item.number },
                });
            }
        },
        detection(file) {
            var arr = file.replaceAll("docx", "pdf");
            if (arr != null) {
                window.open(
                    "http://140.249.209.176:8084/LightningDetection/ProjectTestRecord/" +
                        arr
                );
            } else {
                return;
            }
        },
        contract(file) {
            if (file != null) {
                window.open(
                    "http://140.249.209.176:8084/LightningDetection/Contract/" +
                        file
                );
            } else {
                return;
            }
        },
        Aread() {
            let params = JSON.parse(sessionStorage.getItem("records"));
            AllRead({
                userId: params.id,
                roleId: params.roleIdMap.id,
            }).then((res) => {
                if (res.data.stateStr == "成功") {
                    this.$store.commit("app/ALLREAD", false);
                    this.getMsgCount(params);
                    this.projectmsg(params);
                } else {
                    this.$message.error("已读失败");
                }
            });
        },
        /* 获得未读消息数量 */
        getMsgCount(regionId) {
            getMsgCount({
                userId: regionId.id,
                roleId: regionId.roleIdMap.id,
            }).then((res) => {
                this.$store.commit("app/MESSAGELIST", res.data.records);
            });
        },
        /* 获得留言信息 */
        getMessList(readOder) {
            let params = JSON.parse(sessionStorage.getItem("records"));
            const arrAll = {
                receiveUserid: params.id,
            };
            readOder ? "" : (arrAll.readOder = 1);
            getMessList(arrAll).then((res) => {
                if (res.data.state == 200) {
                    this.message_List = res.data.records;
                    this.senderUserList = res.data.records;
                } else {
                    this.message_List = [];
                }
            });
        },
        getMessListread() {
            let params = JSON.parse(sessionStorage.getItem("records"));
            const arrAll = {
                receiveUserid: params.id,
                isread: 0,
            };
            getMessList(arrAll).then((res) => {
                if (res.data.state == 200) {
                    this.notice = res.data.records.length;
                    this.$store.commit("app/MESSAGELISTTwo", this.notice);
                } else {
                    this.notice = 0;
                    this.$store.commit("app/MESSAGELISTTwo", this.notice);
                }
            });
        },
        getMessLists(examineMap, senderUserMap) {
            let params = JSON.parse(sessionStorage.getItem("records"));
            const arrAll = {
                receiveUserid: params.id,
                examineId: examineMap,
                senderUserid: senderUserMap,
            };
            getMessList(arrAll).then((res) => {
                if (res.data.state == 200) {
                    this.jiaBoxList = res.data.records;
                }
            });
        },
        postMessList() {
            const regionId = JSON.parse(sessionStorage.getItem("records"));
            postMessList({
                senderUserid: regionId.id,
                receiveUserid: this.receiveUserid,
                examineId: this.examineId,
                content: this.textarea,
            }).then((res) => {
                if (res.data.state == 200) {
                    this.getMessLists(this.examineId, this.receiveUserid);
                     this.getMessList(true);
                    this.textarea = "";
                    setTimeout(() => {
                        this.$refs.messbox.scrollTop =
                            this.$refs.messbox.scrollHeight;
                    }, 500);
                }
            });
        },
        BtnClick(item) {
            this.ishow = true;
            this.receiveUserid = item.senderUserMap.id;
            this.examineId = item.examineMap.id;
            const regionId = JSON.parse(sessionStorage.getItem("records"));
            setTimeout(() => {
                this.$refs.messbox.scrollTop = this.$refs.messbox.scrollHeight;
            }, 500);
            allreadMess({
                examineId: item.examineMap.id,
                receiveUserid: regionId.id,
            }).then((res) => {
                this.getMessLists(item.examineMap.id, item.senderUserMap.id);
                this.getMessList(true);
                this.getMessListread()
            });
        },
        close() {
            this.ishow = false;
        },
    },
    // 自定义之令
    directives: {
        clickoutside: {
            bind(el, binding, vnode) {
                /*  console.log(el, binding); */
                function documentHandler(e) {
                    if (el.contains(e.target)) {
                        return false;
                    }
                    if (binding.expression) {
                        binding.value(e);
                    }
                }

                function KeyUp(e) {
                    if (e.keyCode == 27) {
                        if (binding.expression) {
                            binding.value(e);
                        }
                    }
                }
                el.__vueClickOutSize__ = documentHandler;
                el.__vueKeyup__ = KeyUp;

                document.addEventListener("keyup", KeyUp);
                document.addEventListener("click", documentHandler);
            },
            unbind(el, binding) {
                document.removeEventListener("click", el.__vueClickOutSize__);
                delete el.__vueClickOutSize__;

                document.removeEventListener("keyup", el.__vueKeyup__);
                delete el.__vueKeyup__;
            },
        },
        //拖拽div
        drag(el, bindings) {
            el.onmousedown = function (e) {
                var disx = e.pageX - el.offsetLeft;
                var disy = e.pageY - el.offsetTop;
                document.onmousemove = function (e) {
                    el.style.left = e.pageX - disx + "px";
                    el.style.top = e.pageY - disy + "px";
                };
                document.onmouseup = function () {
                    document.onmousemove = document.onmouseup = null;
                };
            };
        },
    },
};
</script>
<style lang="scss">
.el-popover.messageBox {
    margin-left: 50px;
    margin-bottom: 40px;
    background-color: #f7f7f7;
}
.messbox {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    height: 370px;
    overflow: auto;
    .boxs {
        margin-top: 10px;
        .leftbox {
            width: 50%;
            .mess_box {
                width: 100%;
                border-radius: 5px;
                border: 1px solid #ccc;
                padding: 5px;
                background-color: #feffff;
                min-height: 40px;
            }
        }

        .rightbox:nth-child(1) {
            margin-top: 0px;
        }
        .rightbox {
            width: 50%;
            margin-top: 20px;
            margin-left: 160px;

            .mess_box {
                width: 100%;
                border-radius: 5px;
                border: 1px solid #ccc;
                padding: 5px;
                background-color: #feffff;
                background: rgb(164, 240, 118);
                min-height: 40px;
            }
        }
    }
    div:nth-child(1) {
        margin-top: 0px;
    }
}
.leaveMess {
    display: flex;
}
</style>
<style lang="scss" scoped>
.message {
    height: 100%;
    .message-header {
        height: 60px;
        line-height: 40px;
        padding: 10px;
        padding-left: 20px;
        background: #fff;
        display: flex;
        justify-content: space-between;
    }
    ::v-deep.el-tabs {
        height: calc(100% - 60px);
    }
    ::v-deep.el-tabs__content {
        height: calc(100% - 50px);
    }
    ::v-deep#pane-first {
        height: 100%;
    }
    ::v-deep#pane-second {
        height: 100%;
    }
    ::v-deep.el-tabs__nav-scroll {
        margin-top: 10px;
        padding-left: 20px;
        background: #fff;
    }
    ::v-deep.el-tabs__header {
        margin: 0;
    }
    .message-body {
        height: 100%;
        background: #fff;
        overflow: hidden;
        .boxs {
            margin: 30px;
            height: calc(100% - 140px);
            overflow-y: auto;
            position: relative;
            .pagination {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%);
            }
        }
        .el-card.is-always-shadow {
            box-shadow: none;
            margin: 10px;
        }
        ::v-deep.el-card__body {
            padding: 15px;
        }
        .box-card-box {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .card_box {
                padding-left: 15px;
            }
            .card_box2 {
                padding-right: 15px;
            }
        }
        .box-card-box2 {
            padding-left: 15px;
            display: flex;
            justify-content: space-between;
        }
        .box-card-box2:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .messageBox {
        padding: 20px;
        background: #fff;
        height: 100%;
        overflow: auto;
        .el-card.is-always-shadow {
            box-shadow: none;
            margin: 10px;
            width: 70%;
        }
        ::v-deep.el-card__body {
            padding: 15px;
        }
        .box-card-box {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .card_box {
                padding-left: 15px;
            }
            .card_box2 {
                padding-right: 15px;
            }
        }
        .box-card-box2 {
            padding-left: 15px;
            display: flex;
            justify-content: space-between;
            ::v-deep.el-icon-chat-dot-round {
                font-size: 27px;
                margin-right: 20px;
            }
        }
        .box-card-box2:hover {
            text-decoration: underline;
            cursor: pointer;
        }
        ::v-deep.el-icon-chat-dot-round:hover {
            color: red;
            cursor: pointer;
        }
    }
    .jiaBox {
        position: absolute;
        top: 200px;
        right: 100px;
        padding: 12px;
        text-align: justify;
        font-size: 14px;
        background-color: #f7f7f7;
        width: 400px;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        border: 1px solid #ebeef5;
        word-break: break-all;
        transform-origin: left center;
        z-index: 2019;
        .header {
            margin-bottom: 12px;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            .el-icon-close {
                font-weight: 900;
                cursor: pointer;
            }
        }
    }
}
</style>