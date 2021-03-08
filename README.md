# vue 2.x 和 3.0 差别

1. keep-alive

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

2. 对于插件和文件名
1. 2.x 支持 npm 插件和文件名同名，比如 swiper 插件和 swiper 文件名
1. 3.x 不支持，报错，死循环
1. swiper 对比
   2.x
   1. 使用 swiper 配合 vue-awesome-swiper 使用
   2. 直接导入完整的 css 文件
      3.x
   3. 单独 swiper
   4. 使用 less 或 scss 可以按需导入
      对比修改分页器样式

```
// 2.x stylus 写法 scoped
.wrapper >>> .swiper-pagination-bullet-active
    width: 16px
    border-radius 8px
    background: #fff
// 3.x scss写法 scoped 和 >>> 深度选择器 不可以
  .swiper-pagination-bullet-active{
    width: 16px;
    border-radius: 8px;
    background: #fff;
  }
```
