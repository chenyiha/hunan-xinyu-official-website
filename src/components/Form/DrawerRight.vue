
<template>
    <el-drawer v-model="data.show" :direction="data.direction" :close-on-click-modal="false">
        <template #header>
            <h4>set title by slot</h4>
        </template>
        <template #default>

        </template>
        <template #footer>

        </template>
    </el-drawer>
</template>
    
<script setup lang='ts'>

const props = defineProps({

})

const data = reactive<any>({
    show: false,
    direction: "rtl",
})
function init() {
    data.show = true;
}

defineExpose({
    init
});



</script>
    
<style lang="scss" scoped></style>