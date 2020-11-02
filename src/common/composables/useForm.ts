import { ref, reactive } from "vue";
// util
import { jumpToBack } from "common/utils/jumpTo";
import lfind from "lodash/find";
import findParent from "common/utils/findParent";
export default function useForm(
  data: object,
  getForm?: Function,
  setForm?: Function
) {
  // ref接收dom  必须return的时候返回才能拿到
  const form = reactive(data);
  const ruleForm: any = ref(null);
  // ref接收dom  必须return的时候返回才能拿到
  return {
    ruleForm,
    form,
    goBack() {
      jumpToBack();
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
          const dom = lfind(ruleForm.value.fields, item => {
            return errorFields[0].name == item.name;
          }).$el;
          const top = dom.getBoundingClientRect().top;
          const paraent = findParent(ruleForm.value, "NavContent").$el;
          paraent.scrollTop = paraent.scrollTop + top - 90;
        });
    },
    resetForm() {
      ruleForm.value.resetFields();
    }
  };
}
