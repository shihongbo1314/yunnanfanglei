<!-- 富文本编辑器 -->
<template>
    <div>
        <vue-editor v-model="editorContent_"></vue-editor>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    data() {
        return {
            curEditorContent: "",
        };
    },
    props: ["editorContent"],
    watch: {
        editorContent(val) {
            this.curEditorContent = val;
        },
    },
    computed: {
        editorContent_: {
            get() {
                return this.editorContent;
            },
            set(val) {
                this.$emit("hangdleEditor", val);
            },
        },
    },
    components: {
        VueEditor,
    },
};
</script>

<style lang="less" scoped>
</style>