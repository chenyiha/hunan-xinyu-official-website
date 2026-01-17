<template>
    <div class="popup">
        <el-dialog v-model="_value" :title="title" :before-close="cancel" :draggable="draggable"
            :fullscreen="params.fullScreen" :close-on-click-modal="false" :width="width" @close="cancel"
            :destroy-on-close="false" :top="top">
            <!-- 标题 -->
            <template #header>
                <div class="title">
                    <div>
                        {{ title }}
                    </div>
                    <div class="full" @click="openFull">
                        <el-icon>
                            <FullScreen />
                        </el-icon>
                    </div>
                </div>
            </template>

            <!-- 内容 -->
            <template #default>
                <div>
                    <div>
                        <slot></slot>
                    </div>
                    <div class="empty">
                    </div>
                </div>
            </template>

            <!-- 底部 -->
            <template #footer>
                <div class="foot">
                    <el-button @click="cancel" v-if="showCancel">取消</el-button>
                    <el-button type="primary" @click="submit" v-if="showSubmit" :disabled="loading">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import {useProps} from "/@/hooks/tool/index";

const emit = defineEmits(["cancel","submit","update:show"]);
const props = defineProps({
    // 显示状态
    show: {
        type: Boolean,
        default: false
    },
    // 宽度
    width: {
        type: String,
        default: "1000px"
    },
    // 标题
    title: {
        type: String,
        default: "标题"
    },
    // 显示状态
    draggable: {
        type: Boolean,
        default: true
    },
    // 显示取消
    showCancel: {
        type: Boolean,
        default: true
    },
    //显示确认
    showSubmit: {
        type: Boolean,
        default: true
    },
    //自动取消
    autoCancel: {
        type: Boolean,
        default: true
    },
    //高度
    height: {
        type: String,
        default: "80vh"
    },
    //加载中
    loading: {
        type: Boolean,
        default: false
    },
    //高度
    top: {
        type: String,
        default: "5vh"
    }
})

const {_value }=useProps(props,emit,"show");

//参数
const params = reactive({
    fullScreen: false
})


//取消
function cancel() {
    emit("cancel")
    if (props.autoCancel) {
        emit("update:show", false)
    }
}

//提交
function submit() {
    emit("submit")
}

//打开全屏
function openFull() {
    params.fullScreen = !params.fullScreen
}


</script>
<style lang="scss" scoped>
.popup {
    position: relative;
    overflow: hidden;

}

.empty {
    height: 50px;
}

.title {
    width: 100%;
    height: 48px;
    line-height: 48px;
    position: relative;

    .full {
        position: absolute;
        transform: translateY(-50%);
        top: 52%;
        right: 30px;
        font-size: var(--el-message-close-size, 22px);
        line-height: 100%;
        color: gray;
        cursor: pointer;

        &:hover {
            color: #409EFF;
        }
    }
}

.foot {
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
