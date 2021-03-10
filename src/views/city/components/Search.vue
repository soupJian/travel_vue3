<template>
    <div class="search">
      <input v-model="keyword" class="search-input" type="text" placeholder="输入城市名或拼音" />
    </div>
    <div
      class="search-content"
      ref="wrapper"
      v-show="keyword"
    >
      <ul>
        <li
          class="search-item"
          v-for="item of list"
          :key="item.id"
          @click="handleCityClick(item.name)"
        >
          {{item.name}}
        </li>
        <li class="search-item" v-show="list.length == 0">
          没有找到匹配数据
        </li>
      </ul>
    </div>
</template>

<script>
// 导入better-scroll
import BScroll from 'better-scroll'
// 导入vue hook
import { reactive,ref,watch,toRefs, onMounted, onActivated } from 'vue'
// 导入vuex
import {useStore} from 'vuex'
// 导入路由对象
import {useRouter} from 'vue-router'
export default {
  name: 'CitySearch',
  props: {
    cities: {
      type: Object
    }
  },
  setup(props){
    // 使用vuex
    const store = useStore()
    // 使用路由对象
    const router = useRouter()
    let timer = null
    const keyword = ref('')
    const state = reactive({
      list: [],
      scroll: null
    })
    const wrapper = ref(null)
    // watch
    watch(keyword,()=>{
      if (timer) {
        clearTimeout(timer)
      }
      if (!keyword.value) {
        state.list = []
        return
      }
      timer = setTimeout(() => {
        let result = []
        for (let i in props.cities) {
          props.cities[i].forEach((item) => {
            if (item.spell.indexOf(keyword.value) > -1 || item.name.indexOf(keyword.value) > -1) {
              result.push(item)
            }
          })
        }
        state.list = result
      }, 100)
    })
    // mounted
    onMounted(()=>{
      state.scroll = new BScroll(wrapper.value, {click: true})
    })
    // methods
    const handleCityClick =  (city) => {
      store.commit('changeCity',city)
      router.push('/')
      keyword.value = ''
    }
    // activated
    onActivated(()=>{
      keyword.value = ''
    })
    return{
      keyword,
      ...toRefs(state),
      wrapper,
      handleCityClick
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/main.scss';
  .search{
    height: .72rem;
    padding: 0 .1rem;
    background: $bgColor;
    .search-input{
      box-sizing: border-box;
      width: 100%;
      height: .62rem;
      padding: 0 .1rem;
      line-height: .62rem;
      text-align: center;
      border-radius: .06rem;
      color: #666;
      caret-color: red;
    }
  }
  .search-content{
    z-index: 1;
    overflow: hidden;
    position: absolute;
    top: 1.58rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #eee;
    .search-item{
      line-height: .62rem;
      padding-left: .2rem;
      background: #fff;
      color: #666;
    }
  }
</style>
