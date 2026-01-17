<template>
    <div>
        <el-switch v-model="copyValue" @change="change" active-value="1" inactive-value="0" />
    </div>
</template>

<script lang="js" setup name="BaseSwitch">
import { ref, computed, watch } from 'vue'
const emit = defineEmits();
const copyValue = ref(false);

const props = defineProps({
    modelValue: {
        type: String,
        default: null,
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
