import DragArea from '@src/index'

let dragArea = new DragArea('container')

document.getElementById('add').addEventListener('click', function() {
    dragArea.addArea({
        width: 100,
        height: 60,
        rotate: 0,
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
    console.log(areas)
    console.log('left 百分比', areas[0].leftProportion)
    console.log('top 百分比', areas[0].topProportion)
    console.log('width 百分比', areas[0].widthProportion)
    console.log('height 百分比', areas[0].heightProportion)

})

dragArea.on('areaDbClick', function(area) {
    console.log(area)
})


console.log(dragArea)