import Area from './area'
import events from '../modules/events'

class Drag {
    constructor(container, options = {}) {
        if(typeof container === "string") {
            const el = document.getElementById(container)
            this.container = el ? el : document.body
        } else if(container instanceof HTMLElement) {
            this.container = container
        } else {
            return console.error('container must be exist')
        }

        this.DEFAULT_OPTIONS = Object.assign({

        }, options)

        this.childArea = new Set()

        this.initContainer()
        // this.initEvent()
    }

    initContainer() {
        this.container.style.position = 'relative'
        this.container.style.overflow = 'hidden'
    }

    initEvent() {
        this.container.addEventListener('mousedown', function(e) {
            e.preventDefault()
        })
    }

    addArea(areaOptions) {
        let area = new Area({
            parent: this.container,
            ...areaOptions
        })

        area.once('close', () => {
            if(this.childArea.has(area)) {
                this.container.removeChild(area.$el)
                this.childArea.delete(area)
            }
        })

        area.on('dbClick', (instance) => {
            this.dispatchEvent('areaDbClick', instance)
        })

        this.container.appendChild(area.$el)
        this.childArea.add(area)
        return area
    }

    removeOneArea(area) {
        if(this.childArea.has(area)) {
            this.container.removeChild(area.$el)
            this.childArea.delete(area)
        }
    }

    removeAllArea() {
        this.childArea.forEach((areaInfo, area) => {
            this.container.removeChild(area.$el)
        })
        this.childArea.clear()
    }

    getAllAreas() {
        return [...this.childArea]
    }

    getAllAreasInfo() {
        return [...this.childArea.keys()].map(obj => obj.getInfo())
    }
}

events(Drag)
export default Drag