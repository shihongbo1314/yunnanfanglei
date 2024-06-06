<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

// <style lang="scss">
// /* 自定义滚动条样式 */
// @charset "utf-8";
// ::-webkit-scrollbar {
//     width: 6px;
// }

// /*定义滚动条轨道 内阴影+圆角*/
// ::-webkit-scrollbar-track {
//     border-radius: 2px;
// }

// /*定义滑块 内阴影+圆角*/
// ::-webkit-scrollbar-thumb {
//     border-radius: 2px;
//     -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
// }
.el-table th.gutter{
    display: table-cell !important;
}
 </style>