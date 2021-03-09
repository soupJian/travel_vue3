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
 import CityHeader from './components/Header.vue'
 import CitySearch from './components/Search.vue'
 import CityList from './components/List.vue'
 import CityAlphabet from './components/Alphabet.vue'
 import request from '@/api/request.js'
 import { onMounted,reactive, toRefs } from 'vue'
export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  setup(){
    const state = reactive({
      cities: {},
      hotCities: [],
      letter: ''
    })
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
    onMounted(()=>{
      getCityInfo()
    })
    return {
      ...toRefs(state),
      handleLetterChange
    }
  }
}
</script>