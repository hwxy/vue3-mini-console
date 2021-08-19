import { ref } from "vue";
// util
import lfind from "lodash/find";
import findParent from "common/utils/findParent";
import useJump from "common/composables/useJump";

export default function useForm(
  data: any,
  getForm?: () => Promise<any>,
  setForm?: Function
) {
  // 跳转
  const { jumpRouterBack } = useJump();

  const form = ref(data);
  const ruleForm: any = ref(null);
  // 请求loading
  const loading = ref<boolean>(true);
  // ref接收dom  必须return的时候返回才能拿到
  const fetch = async () => {
    loading.value = true;
    if (getForm) {
      const data = await getForm();
      form.value = data;
    }
    loading.value = false;
  };

  fetch();
  return {
    formLoading: loading,
    ruleForm,
    form,
    goBack() {
      jumpRouterBack();
    },
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
    onSubmit() {
      ruleForm.value
        .validate()
        .then(() => {
          setForm && setForm(ruleForm, form);
        })
        .catch((error: any) => {
          const errorFields = error.errorFields;
          const formItem = lfind(ruleForm.value.fields, item => {
            return errorFields[0].name == item.name;
          });
          if (formItem) {
            const dom = formItem.$el;
            const top = dom.getBoundingClientRect().top;
            const paraent = findParent(ruleForm.value, "NavContent").$el;
            paraent.scrollTop = paraent.scrollTop + top - 90;
            return;
          }
        });
    },
    resetForm() {
      ruleForm.value.resetFields();
    }
  };
}
