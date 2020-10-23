<template>
  <div></div>
</template>

<script>
import { inject } from 'vue'

export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')
    // console.log(userLocation, userGeolocation, 22);
    
    return {
      userLocation,
      userGeolocation
    }
  },
  created(){
    console.log(this.$attrs.onHandleClick);
  }
}
</script>

<style>

</style>