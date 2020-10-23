<template>
  <div class="home">
    <!-- <van-button color="#7232dd">单色按钮</van-button>
    <van-button color="#7232dd" plain>单色按钮</van-button>
    <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">
      渐变色按钮
    </van-button> -->
    <MyMarker @handleClick="handleClick" />
  </div>
</template>

<script>
// import { Button } from 'vant';
import { provide, ref, reactive } from 'vue'
import MyMarker  from './myMarker'
export default {
  components: {
    MyMarker
  },
  setup() {
    // const readersNumber = ref(0)
    // const book = reactive({ title: 'Vue 3 Guide' })
    // // Please note that we need to explicitly expose ref value here
    // return () => h('div', [readersNumber.value, book.title])
        const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    provide('location', location)
    provide('geolocation', geolocation)

    return {
      handleClick: () => {}
    }
  }
}
// // ref, reactive, 
// export default {
//   name: 'Home',
//   components: {
//     [Button.name]: Button
//   },
//   props: {
//     msg: String
//   },
//   setup(props) {
//     let data = toRefs(props)
//     console.log('setup', data, 22)
//     return {}
//   },
//   beforeCreate() {
//     console.log('beforeCreate')
//   },
//   created() {
//     console.log('created', this.msg)
//   },
// }
// </script>
