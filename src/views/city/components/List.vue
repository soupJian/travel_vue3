<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{city}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div
            class="button-wrapper"
            v-for="item of hot"
            :key="item.id"
            @click="handleCityClick(item.name)"
          >
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div
        class="area"
        v-for="(item, key) of cities"
        :key="key"
        :ref="key"
        :id="key"
      >
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list">
          <div
            class="item border-bottom"
            v-for="innerItem of item"
            :key="innerItem.id"
            @click="handleCityClick(innerItem.name)"
          >
            {{innerItem.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入better-scroll
import Bscroll from 'better-scroll'
// import ObserveDom from '@better-scroll/observe-dom'
// Bscroll.use(ObserveDom)
// 导入vue hook
import {onMounted, reactive, toRefs,ref,watch,computed } from 'vue';
// 导入vuex
import {useStore} from 'vuex'
// 导入vue-router
import {useRouter} from 'vue-router'
export default {
  name: 'CityList',
  props: {
    hot: Array,
    cities: Object,
    letter: String
  },
  setup(props){
    // 使用vuex
    const store = useStore()
    const city = computed(()=>store.state.city)
    const state = reactive({
      scroll: null,
    })
    // 使用路由对象
    const router = useRouter()
    // 绑定dom ref
    const wrapper = ref(null)
    // methods
    const handleCityClick = (city) => {
      store.commit('changeCity',city)
      router.push('/')
    }
    // watch
    watch(()=>props.letter,()=>{
      if (props.letter) {
        const element = document.getElementById(props.letter)
        state.scroll.scrollToElement(element)
      }
    })
    watch(()=>props.cities,()=> {
      state.scroll && state.scroll.refresh()
    })
    // mounted
    onMounted(()=>{
        state.scroll = new Bscroll(wrapper.value, {click: true,observeDOM: true})
    })
    return {
      ...toRefs(state),
      handleCityClick,
      wrapper,
      city
    }
  },
  // mounted(){
  //   this.scroll = new Bscroll(this.$refs.wrapper, {click: true})
  //   const element = this.$refs.A
  //   console.log(element);
  //   // this.scroll.scrollToElement()
  // }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/main.scss';
  .border-topbottom{
    &:before{
      border-color: #ccc
    }
    &:after{
      border-color: #ccc;
    }
  }
  .border-bottom{
    &:before{
      border-color: #ccc;
    }
  }
  .list{
    overflow: hidden;
    position: absolute;
    top: 1.58rem;
    left: 0;
    right: 0;
    bottom: 0;
    .title{
      line-height: .54rem;
      background: #eee;
      padding-left: .2rem;
      color: #666;
      font-size: .26rem;
    }
    .button-list{
      overflow: hidden;
      padding: .1rem .6rem .1rem .1rem;
      .button-wrapper{
        float: left;
        width: 33.33%;
        .button{
          margin: .1rem;
          padding: .1rem 0;
          text-align: center;
          border: .02rem solid #ccc;
          border-radius: .06rem;
        }
      }
    }
    .item-list{
      .item{
        line-height: .76rem;
        padding-left: .2rem;
      }
    }
  }
</style>
