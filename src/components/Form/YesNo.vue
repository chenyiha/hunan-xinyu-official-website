<template>
    <div>
        <el-switch v-model="copyValue" @change="change" active-value="1" inactive-value="0"
            v-if="props.type == 'switch'" />
        <el-radio-group v-model="copyValue" @change="change" v-if="props.type == 'radio'">
            <el-radio value="0" border>否</el-radio>
            <el-radio value="1" border>是</el-radio>
        </el-radio-group>
    </div>
</template>

<script setup lang='ts' name="FormNumber">
import { computed, ref, watch } from "vue"
const emit = defineEmits();

const copyValue = ref("0")

const props = defineProps({
    modelValue: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: "radio"
    }
})

watch(() => props.modelValue, (newVal, oldVal) => {
    copyValue.value = newVal;
    if (props.modelValue === null) {
        emit("update:modelValue", "0")
    }
}, {
    immediate: true
})

function change() {
    emit("change", copyValue.value)
    emit("update:modelValue", copyValue.value)
}

</script>
