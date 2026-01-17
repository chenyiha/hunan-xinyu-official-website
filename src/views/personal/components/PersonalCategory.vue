<template>
	<div class="container">
		<div class="list">
			<div
				v-for="(item, index) in props.list"
				:key="index"
				class="item"
				:class="{ 'item-active': item.value == modelValue }"
				@click="handleClick(item, index)"
			>
				{{ item.label }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['update:modelValue']);
//=====================================================================数据
const props = defineProps({
	//宽度
	list: {
		type: Array,
		default: () => {
			return [];
		},
	},
	//tab切换项
	modelValue: {
		type: String,
		default: '',
	},
});
const value = ref('0');

//====================================================================监听
watch(
	props.modelValue,
	() => {
		value.value = props.modelValue;
	},
	{
		immediate: true,
	}
);
//====================================================================方法
const handleClick = (item, index) => {
	value.value = index;
	emit('update:modelValue', index);
};
</script>

<style scoped lang="scss">
.container {
}

.list {
	background-color: white;
	padding: 10px;
	border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);


	.item {
		width: 190px;
		line-height: 48px;
		color: #555666;
		cursor: pointer;
		text-align: center;
		font-weight: 500;
    border-radius: 3px;


		&:hover {
			background-color: #F7F8FA;
			color: black;
		}
	}

	.item-active {
		background-color: #eaf2ff !important;
		color: #1E8EFF !important;
	}
}
</style>
