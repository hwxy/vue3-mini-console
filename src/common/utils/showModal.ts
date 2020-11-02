import { createApp, h } from "vue";
import { Modal } from "ant-design-vue";

export const destroyFns: any[] = [];
// config
export default function showModal(ModelContent: any, config: any = {}) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  let currentConfig = { visible: true, ...config };

  let confirmDialogInstance: any = null;
  let confirmDialogProps = {};

  function update(newConfig: any) {
    currentConfig = {
      ...currentConfig,
      ...newConfig
    };
    confirmDialogInstance &&
      Object.assign(confirmDialogInstance, {
        confirmDialogProps: currentConfig
      });
  }

  function destroy(...args: any[]) {
    if (confirmDialogInstance && div.parentNode) {
      confirmDialogInstance.vIf = false; // hack destroy
      confirmDialogInstance = null;
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];

      if (fn === close) { // eslint-disable-line
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: destroy.bind(null, ...args)
    };
    update(currentConfig);
  }

  destroyFns.push(close);

  function render(props: any) {
    // props
    confirmDialogProps = props;

    return createApp({
      components: {
        [Modal.name]: Modal,
        ModelContent: ModelContent
      },
      data() {
        return {
          confirmDialogProps,
          vIf: true
          // visible: true
        };
      },
      methods: {
        handleModelVisible(value: boolean) {
          this.visible = value;
          update({
            visible: false
          });
        },
        handleModelClose() {
          update({
            visible: false
          });
          destroy();
        }
      },
      render() {
        // 先解构，避免报错，原因不详
        const cdProps = { ...this.confirmDialogProps };
        return h(
          Modal,
          {
            ...cdProps,
            ref: "model",
            getContainer: false,
            "onUpdate:visible": this.handleModelVisible,
            afterClose: this.handleModelClose
          },
          [ModelContent]
        );
      }
    }).mount(div);
  }
  confirmDialogInstance = render(currentConfig);
  return {
    destroy: close,
    update
  };
}
