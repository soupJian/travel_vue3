<template>
<div class="icons">
  <swiper>
    <swiper-slide v-for="(page, index) of pages" :key="index">
        <div class="icon" v-for="item of page" :key="item.id">
            <div class="icon-img"><img class="icon-img-content" :src="item.imgUrl" /></div>
            <p class="icon-desc">{{ item.desc }}</p>
        </div>
    </swiper-slide>
  </swiper>
</div>
</template>

<script>
// 导入swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
// 按需导入vue hook
import { computed } from 'vue';
export default {
  name: 'HomeIcons',
  props: {
      list: {
        type:Array,
        required: true
      },
  },
  setup(props){
    // computed
    const pages = computed(()=>{
      const pages = [];
      props.list.forEach((item, index) => {
          const page = Math.floor(index / 8);
          if (!pages[page]) {
              pages[page] = [];
          }
          pages[page].push(item);
      });
      return pages
    })
    // setup返回值
    return {
      pages
    }
  },
  components: {
      Swiper,
      SwiperSlide
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/main.scss';
  .swiper-container{
    height: 0;
    padding-bottom: 50%;
  }
  .icons{
    margin-top: 0.1rem;
    .icon{
      position: relative;
      overflow: hidden;
      float: left;
      width: 25%;
      height: 0;
      padding-bottom: 25%;
      .icon-img{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0.44rem;
        box-sizing: border-box;
        padding: 0.1rem;
        .icon-img-content{
          display: block;
          margin: 0 auto;
          height: 100%;
        }
      }
      .icon-desc{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0.44rem;
        line-height: 0.44rem;
        text-align: center;
        color: $darkTextColor;
        @include ellipsis;
      }
    }
  }
</style>
