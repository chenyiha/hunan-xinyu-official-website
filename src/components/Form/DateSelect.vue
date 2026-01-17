<template>
    <el-date-picker v-model="value" type="datetimerange" :shortcuts="defaultShortcuts" range-separator="-"
                    start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD HH:mm:ss"
                    :default-time="defaultTime"
                    @change="change"/>
</template>

<script setup>
import {ref, watch} from 'vue';
import {isEmpty} from "/@/utils/baseUtil";
import {formatDate, offsetMonth, beginOfMonth, endOfMonth,defaultShortcuts} from "/@/utils/timeUtil";

const emit = defineEmits();
const value = ref("");
const defaultTime = [
    new Date(2000, 1, 1, 0, 0, 0),
    new Date(2000, 2, 1, 23, 59, 59),
];

const props = defineProps({
    //开始时间
    begin: {
        type: String,
        default: null
    },
    //结束时间
    end: {
        type: String,
        default: null
    },
    //是否有默认值
    default:{
        type: Boolean,
        default: true
    }
});

watch( [() =>props.begin, () =>props.end], (newVal, oldVal) => {
    if (!isEmpty(props.begin) && !isEmpty(props.end)) {
        value.value = [props.begin, props.end];
    } else {
        value.value = null;
    }
}, {
    immediate: false
})

/**
 * 改变
 */
function change() {
    if (Array.isArray(value.value) && value.value.length === 2 && !isEmpty(value.value[0]) && !isEmpty(value.value[1])) {
        emit("update:begin", value.value[0]);
        emit("update:end", value.value[1]);
    } else {
        emit("update:begin", null);
        emit("update:end", null);
    }
}

function setDefault() {
    if (props.default) {
        emit("update:begin", formatDate(beginOfMonth(offsetMonth(new Date(), -2))));
        emit("update:end", formatDate(endOfMonth(new Date())));
        emit("query");
    }else{
        if (!isEmpty(props.begin) && !isEmpty(props.end)) {
            value.value = [props.begin, props.end];
        } else {
            value.value = null;
        }
    }

}

setDefault();
</script>
<style scoped></style>
