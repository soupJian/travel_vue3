<template>
  <home-header/>
  <home-banner :list="swiperList"/>
  <home-icons :list="iconList"></home-icons>
</template>

<script>
import {onMounted, reactive, toRefs} from 'vue'
import HomeHeader from './components/Header'
import HomeBanner from './components/Banner'
import HomeIcons from './components/Icons'

import request from '@/api/request.js'
export default {
  setup(){
    const state = reactive({
      swiperList: [],
      iconList: []
    })
    // methods 
    const getHomeInfo = async() => {
      const { data: { data:res } } = await request({
        url:'/index.json'
      })
      state.swiperList = res.swiperList
      state.iconList = res.iconList
    }
    // mounted
    onMounted(()=>{
      getHomeInfo()
    })
    return {...toRefs(state)}
  },
  components:{
    HomeHeader,
    HomeBanner,
    HomeIcons
  },
}
</script>

<style>

</style>