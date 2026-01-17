<template>
    <base-layout>
        <div class="personal">
            <div class="wrap">
                <!--左侧目录-->
                <PersonalCategory :list="list" class="left" v-model="sort"></PersonalCategory>
                <!--右侧内容-->
                <div class="right">
                    <div class="right-container">
                        <div v-for="item in list" :key="item.value">
                            <component :is="item.comments" v-if="item.value == sort"></component>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </base-layout>
</template>

<script setup>
//组件
import BaseLayout from '/@/layout/base/index.vue';
import PersonalCategory from './components/PersonalCategory.vue';
import RightAccount from './components/RightAccount.vue';
import RightInformation from './components/RightInformation.vue';

//==============================================================================数据
const list = ref([
    {
        label: '基本信息',
        value: '0',
        comments: RightInformation,
    },
    {
        label: '账号设置',
        value: '1',
        comments: RightAccount,
        click: () => {
        },
    },
]);
const sort = ref('0');

//==============================================================================方法
</script>

<style scoped lang="scss">
.personal {
  width: 100%;
  height: 100%;
  background-color: #f2f3f5;
  display: flex;
  justify-content: center;
}

.wrap {
  margin-top: 15px;
  display: flex;
}

.left {
  margin-right: 25px;
}

.right {
  width: 1100px;

  .right-container {
    background-color: white;
    border-radius: 3px;
  }
}
</style>
