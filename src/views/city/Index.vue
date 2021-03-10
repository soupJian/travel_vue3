<template>
  <div>
    <city-header></city-header>
    <city-search :cities="cities"></city-search>
    <city-list
      :cities="cities"
      :hot="hotCities"
      :letter="letter"
    ></city-list>
    <city-alphabet
      :cities="cities"
      @change="handleLetterChange"
    ></city-alphabet>
  </div>
</template>

<script>
// 导入组件
import CityHeader from './components/Header.vue'
import CitySearch from './components/Search.vue'
import CityList from './components/List.vue'
import CityAlphabet from './components/Alphabet.vue'
// 导入 请求
import request from '@/api/request.js'
// 导入vue hook
import { onMounted,reactive, toRefs } from 'vue'
export default {
  name: 'City',
  setup(){
    const state = reactive({
      cities: {},
      hotCities: [],
      letter: ''
    })
    // methods
    const getCityInfo =  async() => {
      const {data: { data: res } }= await request({
        url:'/city.json'
      })
      state.cities = res.cities
      state.hotCities = res.hotCities
    }
    const handleLetterChange =  (innerText) => {
      state.letter = innerText
    }
    // mounted
    onMounted(()=>{
      getCityInfo()
    })
    return {
      ...toRefs(state),
      handleLetterChange
    }
  },
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
}
</script>