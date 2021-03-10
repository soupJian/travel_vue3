<template>
  <div>
    <detail-banner
      :sightName="sightName"
      :bannerImg="bannerImg"
      :bannerImgs="gallaryImgs"
    ></detail-banner>
    <detail-header></detail-header>
    <div class="content">
      <detail-list :list="list"></detail-list>
    </div>
  </div>
</template>

<script>
// 导入组件
import DetailBanner from './components/Banner.vue'
import DetailHeader from './components/Header.vue'
import DetailList from './components/List.vue'
// 导入 请求
import request from '@/api/request.js'
// 导入vue-route
import { useRoute } from 'vue-router'
// 导入 vue hook
import { onActivated, reactive,toRefs } from 'vue'
export default {
  name: 'Detail',
  setup(){
    const state = reactive({
      sightName: '',
      bannerImg: '',
      gallaryImgs: [],
      list: []
    })
    // 使用vue-route
    const route = useRoute()
    // methods
    const getDetailInfo =  async () => {
      const{ data: { data: res } } = await request({
        url: '/detail.json',
        data: {
          id: route.params.id
        }
      })
      state.sightName = res.sightName
      state.bannerImg = res.bannerImg
      state.gallaryImgs = res.gallaryImgs
      state.list = res.categoryList
    }
    // actived
    onActivated(()=>{
      getDetailInfo()
    })
    return {
      ...toRefs(state),
    }
  },
  components: {
    DetailBanner,
    DetailHeader,
    DetailList
  },
}
</script>

<style lang="scss" scoped>
  .content{
    height: 15rem;
  }
</style>
