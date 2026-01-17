<!--文件上传组件-->
<template>
    <div class="upload-file">
        <el-upload ref="fileUpload" v-if="props.type === 'default'"
                   :action="baseURL + other.adaptationUrl(props.uploadFileUrl)" :before-upload="handleBeforeUpload"
                   :file-list="fileList" :headers="headers" :limit="limit" :on-error="handleUploadError"
                   :on-remove="handleRemove"
                   :data="data" :auto-upload="autoUpload" :on-success="handleUploadSuccess" class="upload-file-uploader"
                   drag
                   name="file" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                {{ $t('excel.operationNotice') }}
                <em>{{ $t('excel.clickUpload') }}</em>
            </div>
            <template #tip>
                <div class="el-upload__tip" v-if="props.isShowTip">
                    {{ $t('excel.pleaseUpload') }}
                    <template v-if="props.fileSize">
                        {{ $t('excel.size') }} <b style="color: #f56c6c">{{ props.fileSize }}MB</b></template>
                    <template v-if="props.fileType">
                        {{ $t('excel.format') }} <b style="color: #f56c6c">{{ props.fileType.join('/') }}</b>
                    </template>
                    {{ $t('excel.file') }}
                </div>
            </template>
        </el-upload>
        <el-upload ref="fileUpload" v-if="props.type === 'simple'"
                   :action="baseURL + other.adaptationUrl(props.uploadFileUrl)" :before-upload="handleBeforeUpload"
                   :file-list="fileList" :headers="headers" :limit="limit" :auto-upload="autoUpload"
                   :on-error="handleUploadError"
                   :on-remove="handleRemove" :data="data" :on-success="handleUploadSuccess" class="upload-file-uploader"
                   multiple>
            <el-button type="primary" link>{{ $t('excel.clickUpload') }}</el-button>
        </el-upload>
    </div>
</template>

<script setup lang="ts" name="upload-file">
import {Local, Session} from '/@/utils/storage';
import other from '/@/utils/other';

//============================hook============================
import {useMessage} from '/@/hooks/tool/message';


const props = defineProps({
    modelValue: [String, Array],
    // 数量限制
    limit: {
        type: Number,
        default: 5,
    },
    // 大小限制(MB)
    fileSize: {
        type: Number,
        default: 50,
    },
    fileType: {
        type: Array,
        default: () => ['png', 'jpg', 'jpeg', 'doc', 'xls', 'ppt', 'txt', 'pdf', 'docx', 'xlsx', 'pptx'],
    },
    // 是否显示提示
    isShowTip: {
        type: Boolean,
        default: true,
    },
    uploadFileUrl: {
        type: String,
        default: import.meta.env.VITE_IS_MICRO == 'false' ? '/admin/accessory/upload' : "/oss/accessory/upload",
    },
    type: {
        type: String,
        default: 'default',
        validator: (value: string) => {
            return ['default', 'simple'].includes(value);
        },
    },
    autoUpload: {
        type: Boolean,
        default: true,
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
});

const emit = defineEmits(['update:modelValue', 'change']);

const number = ref(0);
const fileList = ref([]) as any;
const uploadList = ref([]) as any;
const fileUpload = ref();
const data = ref({});

const headers = computed(() => {
    return {
        Authorization: 'Bearer ' + Session.get('token'),
        'Tenant-Id': Local.getTenant().tenantId,
    };
});

// 上传前校检格式和大小
const handleBeforeUpload = (file: File) => {
    // 校检文件类型
    if (props.fileType.length) {
        const fileName = file.name.split('.');
        const fileExt = fileName[fileName.length - 1];
        const isTypeOk = props.fileType.indexOf(fileExt) >= 0;
        if (!isTypeOk) {
            useMessage().error(`文件格式不正确, 请上传${props.fileType.join('/')}格式文件!`);
            return false;
        }
    }
    // 校检文件大小
    if (props.fileSize) {
        const isLt = file.size / 1024 / 1024 < props.fileSize;
        if (!isLt) {
            useMessage().error(`上传文件大小不能超过 ${props.fileSize} MB!`);
            return false;
        }
    }
    number.value++;
    return true;
};

// 上传成功回调
function handleUploadSuccess(res: any, file: any) {
    if (res.code === 0) {
        uploadList.value.push({name: res.data.name, url: res.data.url, id: res.data.id});
        uploadedSuccessfully();
        useMessage().success("上传成功");
    } else {
        number.value--;
        useMessage().error(res.msg);
        fileUpload.value.handleRemove(file);
        uploadedSuccessfully();
        useMessage().error("上传失败");

    }
}

// 上传结束处理
const uploadedSuccessfully = () => {
    if (number.value > 0 && uploadList.value.length === number.value) {
        fileList.value = fileList.value.filter((f) => f.url !== undefined).concat(uploadList.value);
        uploadList.value = [];
        number.value = 0;
        emit('change', fileList.value);
        emit('update:modelValue', fileList.value);
    }
};

const handleRemove = (file: any) => {
    fileList.value = fileList.value.filter((f) => !(f === file.url));
    emit('change', fileList.value);
    emit('update:modelValue', fileList.value);
};

const handleUploadError = () => {
    useMessage().error('上传文件失败');
};

/**
 * 监听 props 中的 modelValue 值变化，更新 fileList。
 */
watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            // 首先将值转为数组
            const list = Array.isArray(val) ? val : [];
            fileList.value = list;
        } else {
            fileList.value = [];
            return [];
        }
    },
    {deep: true, immediate: true}
);

watch(
    [() => props.groupId, () => props.isDelete],
    (newValue, OldValue) => {
        data.value.groupId = props.groupId;
        data.value.isDelete = props.isDelete ? '1' : '0';
    },
    {
        immediate: true,
    }
);

const submit = () => {
    fileUpload.value.submit();
};

defineExpose({
    submit,
});
</script>
