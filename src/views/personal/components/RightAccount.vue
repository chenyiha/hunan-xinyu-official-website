<template>
    <div class="account">
        <div class="title">账号设置</div>
        <div v-for="(item, index) in list" :key="index" class="item">
            <div class="item-left">{{ item.label }}</div>
            <div class="item-right">
                <div class="mr15">
                    {{ item.tip }}
                </div>
                <div>
                    <el-button link type="primary">
                        {{ item.buttonName }}
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const list = ref([
    {
        label: '密码',
        tip: '存在风险，请设置密码',
        buttonName: '修改密码',
        click: () => {
        },
    },
    {
        label: '手机号',
        tip: '199****2370 ',
        buttonName: '修改密码',
        click: () => {
        },
    },
    {
        label: '邮箱',
        tip: '存在风险，请绑定邮箱 ',
        buttonName: '绑定邮箱',
        click: () => {
        },
    },
]);
</script>

<style scoped lang="scss">
.account {
  font-size: 14px;
}

.title {
  height: 48px;
  line-height: 48px;
  font-size: 20px;
  color: #2e2e2e;
  border-bottom: 1px solid #f0f0f2;
  padding: 5px 20px;
}

.item {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E4E7ED;
  padding: 0px 20px;
}

.item-left {
  width: 60px;
  text-align: justify;
  text-align-last: justify;
  margin-left: 10px;
}

.item-right {
  display: flex;
  align-items: center;
}
</style>
