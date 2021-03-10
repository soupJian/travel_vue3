<template>
  <home-header/>
  <home-banner :list="swiperList"/>
  <home-icons :list="iconList"></home-icons>
  <home-recommend :list="recommendList"></home-recommend>
  <home-weekend :list="weekendList"></home-weekend>
</template>

<script>
// 按需导入vue hook
import {onMounted, reactive, toRefs} from 'vue'
// 导入组件
import HomeHeader from './components/Header'
import HomeBanner from './components/Banner'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
// 导入请求api
import request from '@/api/request.js'
export default {
  setup(){
    const state = reactive({
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: []
    })
    // methods 
    const getHomeInfo = async() => {
      const { data: { data:res } } = await request({
        url:'/index.json'
      })
      state.swiperList = res.swiperList
      state.iconList = res.iconList
      state.recommendList = res.recommendList
      state.weekendList = res.weekendList
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
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
}
</script>

<style>

</style>