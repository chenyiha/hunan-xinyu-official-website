<template>
    <div class="component-upload-image" style="display: flex;justify-content: center;flex-direction: column;width: 100%"
         :style="{ 'align-items': positionCpt }">
        <el-upload multiple :action="baseURL + uploadPrefix + uploadImgUrl" list-type="picture-card"
                   :on-success="handleUploadSuccess" :before-upload="handleBeforeUpload" :limit="limit"
                   :on-error="handleUploadError" :on-exceed="handleExceed" ref="imageUpload"
                   :before-remove="handleDelete"
                   :show-file-list="true" :headers="headers" :file-list="fileList"
                   :on-preview="handlePictureCardPreview"
                   :data="data" :class="{ hide: fileList.length >= limit }">
            <el-icon class="avatar-uploader-icon">
                <plus/>
            </el-icon>
        </el-upload>
        <!-- 上传提示 -->
        <div class="el-upload__tip" v-if="showTip">
            请上传
            <template v-if="fileSize">
                大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
            </template>
            <template v-if="fileType">
                格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
            </template>
            的文件
        </div>
        <el-dialog v-model="dialogVisible" title="预览" width="800px" append-to-body>
            <img :src="dialogImageUrl" style="display: block; max-width: 100%; margin: 0 auto"/>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import {Local, Session} from '/@/utils/storage';

//============================hook============================
import {useMessage, useMessageBox} from '/@/hooks/tool/message';
import {isEmpty} from "/@/utils/baseUtil";

const {loading, closeLoading} = useMessageBox();

const props = defineProps({
    modelValue: [String, Object, Array],
    // 图片数量限制
    limit: {
        type: Number,
        default: 5,
    },
    // 大小限制(MB)
    fileSize: {
        type: Number,
        default: 10,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
        type: Array,
        default: () => ['png', 'jpg', 'jpeg'],
    },
    // 是否显示提示
    isShowTip: {
        type: Boolean,
        default: true,
    },
    //上传前缀
    uploadPrefix: {
        type: String,
        default: import.meta.env.VITE_IS_MICRO == 'false' ? '/admin' : "/oss",
    },
    //上传地址
    uploadUrl: {
        type: String,
        default: import.meta.env.VITE_IS_MICRO == 'false' ? '/accessory/upload' : "/accessory/upload",
    },
    //文件分组
    groupId: {
        type: String,
        default: "",
    },
    //是否删除
    isDelete: {
        type: Boolean,
        default: true,
    },
    params: {
        type: Object,
        default: () => {
        },
    },
    //位置
    position: {
        type: String,
        default: "center"
    }
});

const emit = defineEmits();
const number = ref(0);
const uploadList = ref<any>([]);
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const uploadImgUrl = ref(props.uploadUrl); // 上传的图片服务器地址
const headers = ref({Authorization: 'Bearer ' + Session.get('token'), 'Tenant-Id': Local.getTenant().tenantId});
const fileList = ref<any>([]);
const showTip = computed(() => props.isShowTip && (props.fileType || props.fileSize));
const data = ref({});
const imageUpload = ref<any>()

watch(
    () => props.modelValue,
    (val) => {
        if (!isEmpty(val) && Array.isArray(val)) {
            fileList.value = val;
        } else {
            fileList.value = [];
            return [];
        }
    },
    {deep: true, immediate: true}
);

// 上传前loading加载
function handleBeforeUpload(file: any) {
    let isImg = false;
    if (props.fileType.length) {
        let fileExtension = '';
        if (file.name.lastIndexOf('.') > -1) {
            fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1);
        }
        isImg = props.fileType.some((type: any) => {
            if (file.type.indexOf(type) > -1) return true;
            if (fileExtension && fileExtension.indexOf(type) > -1) return true;
            return false;
        });
    } else {
        isImg = file.type.indexOf('image') > -1;
    }
    if (!isImg) {
        useMessage().error(`文件格式不正确, 请上传${props.fileType.join('/')}图片格式文件!`);
        return false;
    }
    if (props.fileSize) {
        const isLt = file.size / 1024 / 1024 < props.fileSize;
        if (!isLt) {
            useMessage().error(`上传头像图片大小不能超过 ${props.fileSize} MB!`);
            return false;
        }
    }
    loading('正在上传图片，请稍候...');
    number.value++;
}

// 文件个数超出
function handleExceed() {
    useMessage().error(`上传文件数量不能超过 ${props.limit} 个!`);
}

// 上传成功回调
function handleUploadSuccess(res: any, file: any) {
    closeLoading();
    if (res.code == 0) {
        //上传成功
        uploadList.value.push({id: res.data.id, name: res.data.name, url: res.data.url});
        uploadedSuccessfully();
        useMessage().success("上传成功");
    } else {
        //上传失败
        number.value--;
        useMessage().error(res.msg);
        imageUpload.value.handleRemove(file);
        uploadedSuccessfully();
    }
}

// 删除图片
function handleDelete(file: any) {
    const findex = fileList.value.map((f: any) => f.name).indexOf(file.name);
    if (findex > -1 && uploadList.value.length === number.value) {
        fileList.value.splice(findex, 1);
        emit('change', fileList.value);
        emit('update:modelValue', fileList.value);
        closeLoading();
        return false;
    }
}

// 上传结束处理
function uploadedSuccessfully() {
    if (number.value > 0 && uploadList.value.length === number.value) {
        fileList.value = fileList.value.filter((f: any) => f.url !== undefined).concat(uploadList.value);
        uploadList.value = [];
        number.value = 0;
        emit('change', fileList.value);
        emit('update:modelValue', fileList.value);
    }
}

// 上传失败
function handleUploadError() {
    closeLoading();
    useMessage().error(`上传图片失败`);
}

// 预览
function handlePictureCardPreview(file: any) {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
}

watch(
    [() => props.groupId, () => props.isDelete, () => props.params],
    (newValue, OldValue) => {
        data.value = {...props.params}
        data.value.groupId = props.groupId;
        data.value.isDelete = props.isDelete ? '1' : '0';
    },
    {
        immediate: true,
        deep: true
    }
);

//图片位置
const positionCpt = computed(() => {
    if (props.position == 'left') {
        return "flex-start"
    } else if (props.position == 'center') {
        return "center"
    } else if (props.position == 'right') {
        return "flex-end"
    }
})

</script>

<style scoped lang="scss">
// .el-upload--picture-card 控制加号部分
:deep(.hide .el-upload--picture-card) {
  display: none;
}

//清除上传的动画特效
:deep(.el-upload-list__item) {
  transition: none !important;
}
</style>
