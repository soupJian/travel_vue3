<template>
  <swiper class="banner"
          :pagination="{ clickable: true }"
          :autoplay="{
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: false}"
          :loop="true"
          v-if="showSwiper">
    <swiper-slide v-for="item of list" :key="item.id" class="banner-item">
        <img :src="item.imgUrl"/>
    </swiper-slide>
  </swiper>
</template>
<script>
import SwiperCore, { Pagination,Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { computed } from 'vue';
  SwiperCore.use([Pagination,Autoplay]);
  export default {
    props:{
      list:{
        type:Array,
        required: true
      }
    },
    setup(props){
      const showSwiper = computed(()=>{
        return props.list.length
      })
      return { // setup
        showSwiper
      }
    },
    components: {
      Swiper,
      SwiperSlide,
    },
  };
</script>
<style lang="scss">
// 修改分页器样式
.swiper-pagination-bullet-active{
    width: 16px;
    border-radius: 8px;
    background: #fff;
}
  .banner{
      width: 100%;
      height: 0;
      padding-bottom: 31.25%;
      .banner-item{
        width:100%;
        height: 0;
        padding-bottom: 31.25%;
        img{
          width:100%;
        }
      }
  }
</style>