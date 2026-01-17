<!--
    单个时间选择
-->
<template>
    <el-date-picker
            v-model="temp"
            :type="type"
            :placeholder="placeholder"
            :shortcuts="shortcuts"
            :format="dataFormat"
            :value-format="dataFormat"
            @change="change"
            v-if="type!='time'"
    />

    <el-time-picker v-model="temp"   arrow-control :placeholder="placeholder"    v-if="type=='time'"     @change="change"   :format="dataFormat" :value-format="dataFormat"
    :is-range="false"/>
</template>

<script lang="ts" setup>

const emit = defineEmits();
const temp = ref(null)

const shortcuts = [
    {
        text: '今天',
        value: new Date(),
    },
    {
        text: '昨天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
        },
    },
    {
        text: '上一周',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
        },
    },
]

const props = defineProps({
    modelValue: {
        type: String,
        default: null,
    },
    placeholder: {
        type: String,
        default: "请选择时间",
    },
    // 'year' | 'month' | 'date' | 'datetime'
    type: {
        type: String,
        default: "datetime",
    },
})

const dataFormat = ref("YYYY-MM-DD hh:mm:ss")

watch(() => props.modelValue, () => {
    temp.value = props.modelValue;
}, {
    immediate: true
})

watch(() => props.type, () => {
    if (props.type == 'year') {
        dataFormat.value = "YYYY";
    } else if (props.type == 'month') {
        dataFormat.value = "MM";
    } else if (props.type == 'date') {
        dataFormat.value = "YYYY-MM-DD";
    }  else if (props.type == 'datetime') {
        dataFormat.value = "YYYY-MM-DD hh:mm:ss";
    }  else if (props.type == 'time') {
        dataFormat.value = "HH:mm:ss";
    }
}, {
    immediate: true
})

function change() {
    emit("change", temp.value)
    emit("update:modelValue", temp.value)
}


</script>
