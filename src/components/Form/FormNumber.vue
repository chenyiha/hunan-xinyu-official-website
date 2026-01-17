<template>
    <div>
        <el-input-number v-model="copyValue" @change="change" :min="min" :max="max" :step="step" />
    </div>
</template>

<script setup lang='ts'>
const emit = defineEmits();

const copyValue = ref<Number>(0)

const props = defineProps({
    modelValue: {
        type: [Number, String],
        default: null
    },
    min: {
        type: Number,
        default: -99999999
    },
    max: {
        type: Number,
        default: 99999999
    },
    step: {
        type: Number,
        default: 1
    },
    defaultValue: {
        default: 9999
    }
})

watch(() => props.modelValue, (newVal, oldVal) => {
    copyValue.value = newVal * 1;
    if (props.modelValue === null || props.modelValue === undefined || props.modelValue === '') {
        emit("update:modelValue", props.defaultValue)
    }

}, {
    immediate: true
})

function change() {
    emit("change", copyValue.value)
    emit("update:modelValue", copyValue.value)
}


</script>
