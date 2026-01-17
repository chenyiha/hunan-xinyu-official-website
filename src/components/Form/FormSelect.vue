<template>
	<el-select v-model="data.valueCopy" :placeholder="placeholder" @change="change" :disabled="disabled" filterable clearable :multiple="multiple">
		<el-option v-for="item in list" :key="item[value]" :label="item[label]" :value="item[value]"> </el-option>
	</el-select>
</template>
<script setup lang="ts">
const emit = defineEmits();
const props = defineProps({
	//选择的数据
	modelValue: {
		type: [String, Array],
		default: null,
	},
	//数据
	list: {
		type: Array,
		default: () => [],
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false,
	},
	//是否多选
	multiple: {
		type: Boolean,
		default: false,
	},
	//提示信息
	placeholder: {
		type: String,
		default: '请选择',
	},
	//label
	label: {
		type: String,
		default: 'label',
	},
	//value
	value: {
		type: String,
		default: 'value',
	},
});

const data = reactive<any>({
	valueCopy: '',
});

watch(
	() => props.modelValue,
	(newVal, oldVal) => {
		data.valueCopy = props.modelValue;
	},
	{
		immediate: true,
	}
);

function change() {
	emit('update:modelValue', data.valueCopy);
	emit('change', data.valueCopy);
}
</script>

<style></style>
