<template>
  <div>
    <a-upload
      :beforeUpload="handleBeforeUpload"
      list-type="picture-card"
      v-model:file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < max" @click="handleUpload">
        <plus-outlined />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script lang="ts">
// comp
import { PlusOutlined } from "@ant-design/icons-vue";
import { Upload, Modal } from "ant-design-vue";
// vue
import { defineComponent, ref } from "vue";
// ajax
import { apiGet } from "common/network";

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  percent?: number;
  url?: string;
  preview?: string;
  originFileObj?: any;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

const MiniUpload = defineComponent({
  name: "MiniUpload",
  components: {
    PlusOutlined,
    [Upload.name]: Upload,
    [Modal.name]: Modal
  },
  props: {
    max: {
      type: Number,
      default: 8
    },
    filelist: {
      type: Array,
      default: () => []
    }
  },
  emits: ["change"],
  setup(props, context) {
    const previewVisible = ref<boolean>(false);
    const previewImage = ref<string | undefined>("");

    const uploading = ref<boolean>(false);

    const fileList = ref<any[]>(props.filelist);

    const handleCancel = () => {
      previewVisible.value = false;
    };
    const handlePreview = async (file: FileItem) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string;
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    };
    const handleChange = ({ fileList: newFileList }: FileInfo) => {
      fileList.value = newFileList;

      context.emit("change", newFileList);
    };

    const handleUpload = () => {
      const formData = new FormData();
      fileList.value.forEach((file: FileItem) => {
        formData.append("files[]", file as any);
      });
      uploading.value = true;

      apiGet(
        "https://mock.mengxuegu.com/mock/611ce7233d1d4a721df5a027/product/productid"
      )
        .then(() => {
          uploading.value = false;
        })
        .catch(() => {
          uploading.value = false;
        });
    };

    const handleBeforeUpload = (file: FileItem) => {
      fileList.value = [...fileList.value, file];
      return false;
    };

    return {
      previewVisible,
      previewImage,
      fileList,
      handleCancel,
      handlePreview,
      handleChange,
      handleUpload,
      handleBeforeUpload
    };
  }
});

export default MiniUpload;
</script>
<style lang="scss" scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
