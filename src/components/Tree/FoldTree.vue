<template>
    <div class="head-container">
        <!--树形结构 -->
        <el-tree
                :props="props.props"
                :expand-on-click-node="true"
                ref="deptTreeRef"
                :loading="state.localLoading"
                node-key="id"
                highlight-current
                @node-click="handleNodeClick"
                :load="loadNode"
                lazy
        >
            <template #default="{ node, data }" v-if="$slots.default">
                <slot :node="node" :data="data">
                </slot>
            </template>
        </el-tree>
    </div>
</template>

<script setup lang="ts" name="query-tree">
import {useMessage} from '/@/hooks/tool/message';

const emit = defineEmits(['search', 'nodeClick']);

const props = defineProps({
    /**
     * 树结构属性配置。
     *
     * @default { label: 'name', children: 'children', value: 'id' }
     */
    props: {
        type: Object,
        default: () => {
            return {
                label: 'name',
                children: 'children',
                value: 'id',
                isLeaf: 'leaf',
            };
        },
    },

    /**
     * 输入框占位符。
     *
     * @default ''
     */
    placeholder: {
        type: String,
        default: '',
    },

    /**
     * 是否显示加载中状态。
     *
     * @default false
     */
    loading: {
        type: Boolean,
        default: false,
    },

    /**
     * 查询函数，必须返回 Promise 类型数据。
     */
    query: {
        type: Function,
        required: true,
    },
});

const state = reactive({
    List: [], // 树形结构列表数据
    localLoading: props.loading, // 是否加载中
    nodeData: null
});

const deptTreeRef = ref(); // 部门树形结构组件实例引用
const isExpand = ref(false); // 是否展开所有节点

/**
 * 点击树形结构节点触发的事件。
 *
 * @param item 被点击的节点数据。
 */
const handleNodeClick = (item: any) => {
    state.nodeData = item;
    emit('nodeClick', item);
};


/**
 * 懒加载数据
 */
const loadNode = async (
    node: Node,
    resolve: (data: Tree[]) => void,
    reject: () => void
) => {
    let parentId = (node.level === 0) ? '0' : node.data.id;
    const {data} = await props.query(parentId);
    resolve(data);
}


/**
 * 移除节点
 */
const remove = () => {
    deptTreeRef.value.remove(state.nodeData.id);
};


/**
 * 更新节点名称
 */
const update = (node: any) => {
    if (state.nodeData.parentId == '0') {
        deptTreeRef.value.getNode(state.nodeData.id).data = node;
    } else {
        let y = deptTreeRef.value.getNode(state.nodeData.parentId);
        //  设置未进行懒加载状态
        y.loaded = false;
        y.expand();
    }
}

/**
 * 刷新新增节点
 */
const add = () => {
    let xx = deptTreeRef.value.getNode(state.nodeData.id);
    //  设置未进行懒加载状态
    xx.loaded = false;
    xx.expand();
}


// 方便父组件调用刷新树方法
defineExpose({
    update,
    remove,
    add
});


</script>
<style lang="scss" scoped>
.head-container {
  &-header {
    display: flex;
    align-items: center;

    &-input {
      width: 90%;
    }

    &-dropdown {
      flex: 1;
      margin-left: 5%;
    }
  }
}
</style>
