import DragArea from '@src/index'

let dragArea = new DragArea('container', {})

document.getElementById('add').addEventListener('click', function() {
    dragArea.addArea()
})



console.log(dragArea)