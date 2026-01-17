<template>
    <el-radio-group v-model="data.valueCopy" @change="change">
        <el-radio v-for="item in list" :key="item.value" :value="item[value]" border>{{ item[label] }}
        </el-radio>
    </el-radio-group>
</template>
<script setup lang='ts'>
const emit = defineEmits();
const props = defineProps({
    //选择的数据
    modelValue: {
        type: [String,Number],
        default: null
    },
    //数据
    list: {
        type: Array,
        default: () => []
    },
    //提示信息
    placeholder: {
        type: String,
        default: "请选择"
    },
    //label
    label: {
        type: String,
        default: "label"
    },
    //value
    value: {
        type: String,
        default: "value"
    },
})

const data = reactive<any>({
    valueCopy: ""
})

watch(() => props.modelValue, (newVal, oldVal) => {
    data.valueCopy = props.modelValue;
}, {
    immediate: true
})

function change() {
    emit("update:modelValue", data.valueCopy)
}
</script>
