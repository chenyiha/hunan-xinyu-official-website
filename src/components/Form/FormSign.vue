<template>
  <!-- 电子签名组件 -->
  <div>
    <!-- 画布对象 -->
    <div ref="grapDiv" :style="{ width: width + 'px', height: height + 'px' }" class="draw">
      <canvas ref="grapCvs" id="container" @mousedown="mousedown" @mousemove="mousemove" />
    </div>

    <!-- 设置面板 -->
    <div ref="setControlDiv"
      style="width: 280px; height: 200px; background-color: #474747; border: 1px solid #ddd; border-radius: 10px; margin-top: -203px; margin-left: 1px; position: absolute;"
      v-show="ifSetController">
      <div style="width: 100%; height: 30%; margin-top: 10px">
        <span style="width: 100%; height: 30%">
          <label style="float: left; color: white; margin-left: 14px; margin-top: 15px;">字体大小</label>
          <label style="float: right; color: white; margin-right: 14px; margin-top: 15px;">{{ fontSize }}</label>
        </span>
        <el-slider v-model="fontSize" style="width: 89%; margin-top: 20px; margin-left: 17px" :min="1" :max="10" />
      </div>
      <div style="width: 100%; height: 45%; margin-top: 15px; padding: 7px">
        <li @click="setImgColor" v-for="(item, index) in fontColorArray" :key="index"
          :style="'list-style: none;width: 30px;height: 30px;float: left;background: ' + item"></li>
      </div>
    </div>


    <!-- 操作按钮 -->
    <div style="width: 800px; padding-top: 10px;margin-bottom: 10px;">
      <el-button @click="penSet">画笔设置</el-button>
      <el-button @click="clear()">清除</el-button>
      <!-- <el-button type="primary" @click="commit()">提交</el-button> -->
      <el-button @click="goback()" v-show="ifSetController">返回</el-button>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
const emit = defineEmits(["commitDatas"]);


const props = defineProps({
	//宽度
	width: {
		type: Number,
		default: 300,
	},
	//高度
	height: {
		type: Number,
		default: 200,
	},
});

// 定义变量
const canvas = ref(null);
const graphics = ref(null);
const isDrawing = ref(false);
const curMouseX = ref(null);
const curMouseY = ref(null);
const content = ref(null);
const ifGraph = ref(false);
const ifSetController = ref(false);
const fontSize = ref(1);
const fontColorArray = ref(["#F59999", "#E86262", "#AA4446", "#6B4849", "#34231E", "#435772", "#2DA4A8", "#EFDCD3", "#FEAA3A", "#FD6041", "#CF2257", "#404040", "#92BEE2", "#2286D8"]);
const fontColor = ref("#000000");

// 选择画笔颜色
const setImgColor = (curIndex) => {
  let liArray = curIndex.currentTarget.parentElement.children;
  for (let child of liArray) {
    child.className = "";
  }
  curIndex.currentTarget.className = "activeteLi";
  fontColor.value = curIndex.currentTarget.style.background;
};

// 鼠标按下事件处理
const mousedown = (e) => {
  if (ifGraph.value) {
    return;
  }
  const rect = canvas.value.getBoundingClientRect();
  isDrawing.value = true;
  curMouseX.value = e.clientX - rect.left;
  curMouseY.value = e.clientY - rect.top;
  graphics.value.beginPath();
  graphics.value.moveTo(curMouseX.value, curMouseY.value);
};

// 鼠标移动事件处理
const mousemove = (e) => {
    if (ifGraph.value) {
    return;
  }
  if (isDrawing.value) {
    const rect = canvas.value.getBoundingClientRect();
    graphics.value.strokeStyle = fontColor.value;
    graphics.value.lineWidth = fontSize.value;
    curMouseX.value = e.clientX - rect.left;
    curMouseY.value = e.clientY - rect.top;
    graphics.value.lineTo(curMouseX.value, curMouseY.value);
    graphics.value.stroke();
    content.value = canvas.value.toDataURL();
    emit("base64", content.value);
    emit("sign", dataURLtoFile(content.value, "签名"));
  }
};

// 清除画布
const clear = () => {
    if (ifGraph.value) {
    return;
  }
  canvas.value.width = canvas.value.width;
};

// 将 DataURL 转换为文件
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: "image/png" });
};

// 提交签名
const commit = () => {
  if (!ifGraph.value) {
    ElMessage({ message: "没有可提交的内容！", type: "error", duration: 2000 });
    return;
  }
  ElMessageBox({
    title: "操作提示",
    message: "确定提交?",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    showCancelButton: true,
    closeOnClickModal: false,
    type: "warning",
  }).then(() => {
    content.value = canvas.value.toDataURL();
    emit("commitDatas", dataURLtoFile(content.value, "签名"));
  });
};



// 初始化画布
onMounted(() => {
  const cvs = document.getElementById("container");
  cvs.width = props.width;
  cvs.height = props.height;
  graphics.value = cvs.getContext("2d");
  canvas.value = cvs;

  document.addEventListener("mouseup", () => {
    isDrawing.value = false;
    graphics.value.closePath();
  });
});

/**
 *  画笔设置
 */
const penSet = () => {  
  ifGraph.value = true;
  ifSetController.value = true;
}

/**
 * 返回编辑模式
 * */
const goback = () => {
  ifSetController.value = false;
  ifGraph.value = false;
};

defineExpose ({
  clear,
})
</script>


<style scoped lang="scss">
.draw {
  border: 2px dotted #ddd;
  border-radius: 10px;
  overflow: hidden;
}
</style>