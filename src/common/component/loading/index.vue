<template>
  <div class="spinner-wrap">
    <div class="lds-wedges">
      <div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// type
import { defineComponent } from "vue";
const MiniLoading = defineComponent({
  name: "MiniLoading"
});
export default MiniLoading;
</script>
<style lang="scss" scoped>
@keyframes lds-wedges {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes lds-wedges {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.spinner-wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
}

.lds-wedges > div > div {
  -webkit-transform-origin: 100px 100px;
  transform-origin: 100px 100px;
  -webkit-animation: lds-wedges 2s linear infinite;
  animation: lds-wedges 2s linear infinite;
}

.lds-wedges > div > div > div {
  position: absolute;
  left: 30px;
  top: 30px;
  width: 70px;
  height: 70px;
  border-radius: 70px 0 0 0;
  -webkit-transform-origin: 100px 100px;
  transform-origin: 100px 100px;
}

.lds-wedges > div div:nth-child(1) > div {
  background: #45a2ff;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}

.lds-wedges > div div:nth-child(1) {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
}

.lds-wedges > div div:nth-child(2) > div {
  background: #43d060;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}

.lds-wedges > div div:nth-child(2) {
  -webkit-animation-duration: 0.666666666666667s;
  animation-duration: 0.666666666666667s;
}

.lds-wedges > div div:nth-child(3) > div {
  background: #ff6868;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}

.lds-wedges > div div:nth-child(3) {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
}

.lds-wedges > div div:nth-child(4) > div {
  background: #ffc468;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}

.lds-wedges > div div:nth-child(4) {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}

.lds-wedges {
  width: 100px !important;
  height: 100px !important;
  -webkit-transform: translate(-50px, -50px) scale(0.5) translate(50px, 50px);
  transform: translate(-50px, -50px) scale(0.5) translate(50px, 50px);
}
</style>
