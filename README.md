# 说明 
添加一个可拖拽区域的库，通过拖拽，可以得到区域相对于父元素的位置信息。

可通过此库可实现图片热区，即为图片添加点击事件，进行跳转等功能，可快速生成静态活动页面

![gif](https://user-images.githubusercontent.com/23492006/47439222-978b4b00-d7de-11e8-9597-a3ff708c1598.gif)

# 安装
> npm install drag-area --save

# 导入
```js
//By commonjs
const DragArea = require('drag-area')
//By ES6 modules
import DragArea form 'drag-area'
//By DOM script
<script src="/node_modules/drag-area/dist/drag-area.min.js"></script>
```

# 使用
```js
<body>
    <div id="container">
        <img src="http://pic.58pic.com/58pic/13/42/86/45f58PICdRF_1024.jpg" alt="">
    </div>
    <button id="add">添加</button>
    <button id="clear">清除所有</button>
    <button id="getAllAreas">获取所有area对象</button>
    <button id="getAllAreasInfo">获取所有area对象的位置信息</button>
</body>
<script>
    let dragArea = new DragArea('container')

    add.addEventListener('click', function() {
        dragArea.addArea({
            width: 100,
            height: 60,
            x: 100,
            y: 100,
            left: 20,
            top: 20,
            background: '#2aa7ff',
            opacity: 0.7
        })
    })

    clear.addEventListener('click', function() {
        dragArea.removeAllArea()
    })

    getAllAreas.addEventListener('click', function() {
        console.log(dragArea.getAllAreas())
    })

    getAllAreasInfo.addEventListener('click', function() {
        const areas = dragArea.getAllAreasInfo()
        areas.forEach(value => {
            console.log('=========================================')
            console.log('高度', value.height + 'px')
            console.log('宽度', value.width + 'px')
            console.log('距离顶部', value.top + 'px')
            console.log('距离左边', value.left + 'px')
            console.log('left 百分比', value.leftProportion)
            console.log('top 百分比', value.topProportion)
            console.log('width 百分比', value.widthProportion)
            console.log('height 百分比', value.heightProportion)
        })

    })

    dragArea.on('areaDbClick', function(area) {
        console.log(area)
    })
</script>
```

# API

## addArea
> params: Object

|参数|解释|类型|
|---|---|---|
|width|生成区域的默认宽度|Number|
|height|生成区域的默认高度|Number|
|x|生成区域默认在X轴的偏移量|Number|
|y|生成区域默认在Y轴的偏移量|Number|
|left|生成区域的距离容器左侧初始定位|Number|
|top|生成区域的距离容器顶部初始定位|Number|
|background|生成区域的默认背景颜色|String|
|opacity|生成区域的默认透明度|Number|

向容器中添加一个可拖拽区域，执行此方法会返回一个拖拽区域实例

## removeOneArea
> params: Object

|参数|解释|类型|
|---|---|---|
|area|通过addArea函数得到的对象|Object|

移除某个可拖拽区域

示例：
```JS
let dragArea = new DragArea('container')

let area = dragArea.addArea()

dragArea.removeOneArea(area)
```

## removeAllArea
> params: no params

移除容器内所有可拖拽区域

## getAllAreas
> params: no params

获取当前容器内存在的所有可拖拽区域实例对象

## getAllAreasInfo
获取当前容器内存在的所有可拖拽区域实例对象相对于容器的位置信息

|返回值|解释|单位|
|---|---|---|
|height|区域的高度|px|
|width|区域的宽度|px|
|top|区域相对于容器顶部的偏移量|px|
|left|区域相对于容器左侧的偏移量|px|
|leftProportion|区域相对于容器左侧的偏移量|百分比|
|topProportion|区域相对于容器顶部的偏移量|百分比|
|widthProportion|区域相对于容器的宽度|百分比|
|heightProportion|区域相对于容器的高度|百分比|

## on
```js
params: two params
argument[0]: event name
argument[1]: callback
```

监听容器的事件，目前支持的事件**areaDbClick**，当可拖拽区域被双击时会执行, 回调函数的参数为被双击的可拖拽区域实例对象

示例
```js
let dragArea = new DragArea('container')

dragArea.on('areaDbClick', function(area) {
    console.log(area)       //  可拖拽区域实例对象
})
```
