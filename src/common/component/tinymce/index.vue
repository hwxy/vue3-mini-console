<template>
  <div>
    <editor
      ref="editor"
      :init="initSettings"
      :class="{
        visibility: show
      }"
    />
  </div>
</template>
<script lang="ts">
// comp
import Editor from "@tinymce/tinymce-vue";
// vue
import { defineComponent, ref } from "vue";
// ajax
// import { apiGet } from "common/network";

const MiniTinymce = defineComponent({
  name: "MiniTinymce",
  components: {
    Editor
  },
  props: {
    filelist: {
      type: Array,
      default: () => []
    },
    value: String
  },
  emits: ["finish", "update:value"],
  setup(props, ctx) {
    const editor = ref(null);
    const show = ref(false);
    return {
      show,
      editor,
      initSettings: {
        convert_urls: false, // 自动改变 url 为相对路径，false 为不改变
        image_advtab: true,
        image_title: false,
        branding: false,
        maxLength: 100,
        height: 300,
        // ...this.init,
        font_formats:
          "Arial=arial,helvetica,sans-serif;" +
          "Terminal=terminal,monaco,monospace;" +
          "Times New Roman=times new roman,times,serif;",
        file_picker_types: "image",
        setup: (ed: any) => {
          ed.on("Change KeyUp", () => {
            const content = ed.getContent();
            ctx.emit("update:value", content);
            // this.dispatch("ElFormItem", "el.form.change", [content]);
          });
        },
        file_picker_callback(cb: any, value: any, meta: any) {
          const input = document.createElement("input");
          const tinyMCE = (window as any).tinyMCE;
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.onchange = function(files) {
            const file = (this as any).files[0];

            const reader = new FileReader();
            reader.onload = function() {
              const id = "blobid" + new Date().getTime();
              const blobCache = tinyMCE.activeEditor.editorUpload.blobCache;
              const base64 = (reader as any).result.split(",")[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
        init_instance_callback(editor: any) {
          ctx.emit("finish", editor);
          show.value = true;
        },
        language_url: "/zh_CN.js",
        language: "zh_CN",
        plugins: [
          "advlist autolink lists link image preview hr",
          "searchreplace visualblocks visualchars code ",
          "insertdatetime media table contextmenu directionality",
          "emoticons paste textcolor colorpicker textpattern"
        ],
        toolbar1:
          "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image imagem media",
        toolbar2:
          "forecolor backcolor | fontselect fontsizeselect | code preview  "
      }
    };
  }
});

export default MiniTinymce;
</script>
<style lang="scss" scoped></style>
