<template>
  <ul class="list">
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :id="`${item}-alphabet`"
      @click="handleLetterClick"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
import { reactive,computed, toRefs, onUpdated } from 'vue'
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  setup(props,{emit}){
    const state = reactive({
      touchStatus: false,
      startY: 0,
      timer: null,
    })
     // computed
    const letters = computed(()=>{
      const letters = []
      for (let i in props.cities) {
        letters.push(i)
      }
      return letters
    })
    // methods
    function handleLetterClick (e) {
      emit('change', e.target.innerText)
    }
    function handleTouchStart () {
      state.touchStatus = true
    }
    function handleTouchMove (e) {
      if (state.touchStatus) {
        if (state.timer) {
          clearTimeout(state.timer)
        }
        state.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 79
          const index = Math.floor((touchY - state.startY) / 20)
          if (index >= 0 && index < letters.value.length) {
            emit('change', letters.value[index])
          }
        }, 16)
      }
    }
    function handleTouchEnd () {
      state.touchStatus = false
    }
    onUpdated(()=>{
      const element = document.getElementById('A-alphabet')
      state.startY = element.offsetTop
    })
    return {
      ...toRefs(state),
      letters,
      handleLetterClick,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/main.scss';
  .list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 1.58rem;
    right: 0;
    bottom: 0;
    width: .4rem;
    .item{
      line-height: .4rem;
      text-align: center;
      color: $bgColor;
    }
  }
</style>
