<template>
  <home-header/>
  <home-banner :list="swiperList"/>
</template>

<script>
import {onMounted, reactive, toRefs} from 'vue'
import HomeHeader from './components/Header'
import HomeBanner from './components/Banner'
import request from '@/api/request.js'
export default {
  setup(){
    const state = reactive({
      swiperList: []
    })

    // methods 
    const getHomeInfo = async() => {
      const { data: { data:res } } = await request({
        url:'/index.json'
      })
      state.swiperList = res.swiperList
    }
    // mounted
    onMounted(()=>{
      getHomeInfo()
    })
    return {...toRefs(state)}
  },
  components:{
    HomeHeader,
    HomeBanner
  },
}
</script>

<style>

</style>