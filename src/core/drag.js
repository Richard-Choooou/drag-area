import Area from './area'
class Core {
    constructor(container, options) {
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
        
    }

    addArea(AreaOptions) {
        let area = new Area({
            parent: this.container,
            ...AreaOptions
        })

        area.once('close', () => {
            if(this.childArea.has(area)) {
                this.container.removeChild(area.$el)
                this.childArea.delete(area)
            }
        })

        this.container.appendChild(area.$el)
        this.childArea.add(area)
        console.log(area)
        return area
    }

    removeOneArea(area) {
        if(this.childArea.has(area)) {
            this.container.removeChild(area.$el)
            this.childArea.delete(area)
        }
    }

    removeAllArea() {
        this.childArea.forEach(area => {
            this.container.removeChild(area.$el)
        })
        this.childArea.clear()
    }

    getAllAreas() {
        return [...this.childArea]
    }

    getAllAreasInfo() {
        return [...this.childArea].map(value => {
            return value.getInfo()
        })
    }
}

export default Core