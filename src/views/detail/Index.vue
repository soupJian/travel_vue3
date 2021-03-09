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
import DetailBanner from './components/Banner.vue'
import DetailHeader from './components/Header.vue'
import DetailList from './components/List.vue'
import request from '@/api/request.js'
import { useRoute } from 'vue-router'
import { onActivated, reactive,toRefs } from 'vue'
export default {
  name: 'Detail',
  components: {
    DetailBanner,
    DetailHeader,
    DetailList
  },
  setup(){
    const state = reactive({
      sightName: '',
      bannerImg: '',
      gallaryImgs: [],
      list: []
    })
    const route = useRoute()
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
    onActivated(()=>{
      getDetailInfo()
    })
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    height: 15rem;
  }
</style>
