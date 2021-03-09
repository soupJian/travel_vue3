# vue 2.x 和 3.0 差别

## keep-alive

```
2.x
<keep-alive>
  <router-view/>
</keep-alive>

3.x
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

## 对于插件和文件名

1. 2.x 支持 npm 插件和文件名同名，比如 swiper 插件和 swiper 文件名
1. 3.x 不支持，报错，死循环

## swiper 对比

2.x 1. 使用 swiper 配合 vue-awesome-swiper 使用 2. 直接导入完整的 css 文件
3.x 3. 单独 swiper 4. 使用 less 或 scss 可以按需导入

### 对比修改分页器样式

```
// 2.x stylus
.wrapper >>> .swiper-pagination-bullet-active
    width: 16px
    border-radius 8px
    background: #fff
// 3.x scss 和 >>> 深度选择器 不可以
  .swiper-pagination-bullet-active{
    width: 16px;
    border-radius: 8px;
    background: #fff;
  }
```

## 钩子函数

2.x 直接使用
3.x 用之前先导入

### compouted

```
2.x
computed: {
  showSwiper() {
      return this.list.length
  }
}
3.x
const showSwiper = computed(()=>{
  return props.list.length
})
```

### watch

```
2.x
watch: {
  letter () {
    if (this.letter) {
      const element = this.$refs[this.letter][0]
      this.scroll.scrollToElement(element)
    }
  }
}
3.x
watch只能观察ref数据，reactive内部数据得先return才可
watch还可以同时监听多个数据
watch(()=>props.letter,()=>{
  if (props.letter) {
    const element = document.getElementById(props.letter)
    state.scroll.scrollToElement(element)
  }
})
watch(
  [() => state.count, () => state.name], // Object.values(toRefs(state)),
  ([count, name], [prevCount, prevName]) => {
    ...
  })
```

### methods

2.x 所有的方法写在这个里面
3.x **不需要导入 methods**，方法直接定义

## 访问虚拟 dom

2.x

```
this.scroll = new Bscroll(this.$refs.wrapper, {click: true})
```

3.x

```
// 虚拟dom和react useRef 用法一致
setup(){
  const wrapper = ref(null)
  state.scroll = new Bscroll(wrapper.value, {click: true})
  return{
  wrapper
    ...torefs(state)
  }
}
在vue3.0中 better-scroll如果引入正确且刷新页面不滚动，试试改变窗口大小试试
```

### 父子组件传值

3.x 和 2.x 基本上一致
由于 3.x 访问不到 this，无法执行 this.\$emit
通过 setup 的第二个参数接受 emit 事件

```
setup(props,{emit}){
  function handleLetterClick (e) {
    emit('change', e.target.innerText)
  }
  ...
}
```

### scrollBehavior // 滚动行为

```
2.x
const router = new VueRouter({
  routes,
  /* 滚动时不影响其他界面 */
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
3.x
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 防止页面滚动影响其他页面
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0,left: 0 }
    }
  }
})
```

可以看出有 2.x 的 x,y 变为了 left 和 top

### router-link

删除 tag 和 event 属性，还是以 a 标签渲染
