<template>
  <div class="container" @click="handleGallaryClick" @touchmove="stopMove">
    <div class="wrapper">
      <swiper :pagination="{ clickable: true, type: 'fraction' }"
              :observer="true"
              :observeParents="true"
              >
        <swiper-slide
          v-for="(item, index) in imgs"
          :key="index"
        >
          <img class="gallary-img" :src="item" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
// 导入swiper
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
SwiperCore.use([Pagination]);
export default {
  name: 'CommonGallary',
  props: {
    imgs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup(props,{emit}){
    // methods
    function handleGallaryClick(){
      emit('close')
    }
    function stopMove(e){
      e.preventDefault()
    }
    return{
      handleGallaryClick,
      stopMove
    }
  },
  components: {
      Swiper,
      SwiperSlide,
    },
}
</script>

<style lang="scss">
  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 99;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #000;
    .wrapper{
      .swiper-pagination{
        color: #fff;
        bottom: 2rem;
        position: fixed;
      }
      img{
        width: 100%;
      }
    }
  }
</style>
