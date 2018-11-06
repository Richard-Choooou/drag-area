import DragArea from '../dist/drag-area.min.js'

let dragArea = new DragArea('container')

document.getElementById('add').addEventListener('click', function() {
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
    // console.log()
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


console.log(dragArea)