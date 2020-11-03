import app from "@/main";

export const $message = app.config.globalProperties.$message;
export const $notification = app.config.globalProperties.$notification;
export const $info = app.config.globalProperties.$info;
export const $success = app.config.globalProperties.$success;
export const $error = app.config.globalProperties.$error;
export const $warning = app.config.globalProperties.$warning;
export const $confirm = app.config.globalProperties.$confirm;
export const $destroyAll = app.config.globalProperties.$destroyAll;
export const $findParent = app.config.globalProperties.$findParent;

export default {
  $message,
  $notification,
  $info,
  $success,
  $error,
  $warning,
  $confirm,
  $destroyAll,
  $findParent
};
