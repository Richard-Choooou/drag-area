import events from '../modules/events'
import closeBtnImage from '../static/close.img'

let zIndex = 1;
class Area {
    constructor(options) {
        this.DEFAULT_OPTIONS = Object.assign({
            width: 60,
            height: 60,
            rotate: 0,
            x: 0,
            y: 0,
            left: 20,
            top: 20,
            background: '#2aa7ff',
            opacity: 0.6,
            innerText: '默认文字',
            slot: ''
        }, options)

        this.$el = this.area = this.createDom()
        this.setAreaStyle()
        this.initEvent()
    }

    createDom() {
        const div = document.createElement('div')
        div.style.position = 'absolute'
        div.style.width = this.DEFAULT_OPTIONS.width + 'px'
        div.style.height = this.DEFAULT_OPTIONS.height + 'px'
        div.style.left = this.DEFAULT_OPTIONS.left + 'px'
        div.style.top = this.DEFAULT_OPTIONS.top + 'px'
        div.style.background = this.DEFAULT_OPTIONS.background
        div.style.opacity = this.DEFAULT_OPTIONS.opacity
        div.style.zIndex = ++zIndex
        
        if(this.DEFAULT_OPTIONS.innerText) {
            const p = document.createElement('span')
            p.innerText = this.DEFAULT_OPTIONS.innerText
            div.appendChild(p)
        }
        if(this.DEFAULT_OPTIONS.slot) {
            const slot = document.createElement('div')
            slot.innerHTML = this.DEFAULT_OPTIONS.slot
            div.appendChild(slot)
        }
        div.style.whiteSpace = 'noWrap'
        div.style.display = 'flex'
        div.style.alignItems = 'center'
        div.style.justifyContent = 'center'
        div.style.flexDirection = 'column'

        const closeBtn = document.createElement('img')
        closeBtn.src = closeBtnImage
        closeBtn.style.position = 'absolute'
        closeBtn.style.right = 0
        closeBtn.style.top = 0
        closeBtn.style.width = '20px'
        closeBtn.style.color = '#000'
        closeBtn.style.transform = `translate3D(50%, -50%, 0)`
        closeBtn.onclick = () => {
            this.removeSelf()
        }

        div.appendChild(closeBtn)
        return div
    }

    initEvent() {

        //双击事件
        this.area.addEventListener('click', (() => {
            let timer = null

            return () => {
                if(timer) {
                    this.dispatchEvent('dbClick', this)
                } else {
                    timer = setTimeout(() => {
                        timer= null
                    }, 200);
                }
            }
        })())
        
        this.area.addEventListener('mousedown', (e) => {
            e.preventDefault()
            this.isMouseDown = true
            this.startPoint = {
                x: e.clientX,
                y: e.clientY
            }
            this.area.style.zIndex = ++zIndex
        })

        this.area.addEventListener('mouseup', (e) => {
            this.isMouseDown = false
        })

        this.area.addEventListener('mousemove', (e) => {
            if(!this.isMouseDown) {
                const offsetX = e.clientX - this.area.getBoundingClientRect().left
                const offsetY = e.clientY - this.area.getBoundingClientRect().top

                this.setMouseStyle(offsetX, offsetY)
            }
        })

        this.DEFAULT_OPTIONS.parent.addEventListener('mousemove', (e) => {
            if(this.isMouseDown) {
                this.nowPoint = {
                    x: e.clientX,
                    y: e.clientY
                }

                this.computeOffset(this.nowPoint, this.startPoint)
                this.setAreaStyle()
                this.startPoint = this.nowPoint
            }
        })
    }

    setMouseStyle(offsetX, offsetY) {
        this.mouseStyle = 'move'
        const range = 10
        const defaultOptions = this.DEFAULT_OPTIONS

        if (offsetX > defaultOptions.width - range && offsetY < range) {     // 右上角
            this.mouseStyle = 'pointer'
        } else if (offsetY > defaultOptions.height - range && offsetX > defaultOptions.width - range) {    // 右下角
            this.mouseStyle = 'se-resize'
        } else if (offsetX < range && offsetY < range) {      //左上角
            this.mouseStyle = 'nw-resize'
        } else if (offsetX < range && offsetY >= defaultOptions.height - range) {        //左下角
            this.mouseStyle = 'sw-resize'
        } else if (offsetX > range && offsetX < defaultOptions.width - range && offsetY < range) {                                  //上
            this.mouseStyle = 'n-resize'
        } else if (offsetX > range && offsetX <= defaultOptions.width - range && offsetY >= defaultOptions.height - range) {             //下
            this.mouseStyle = 's-resize'
        } else if (offsetX < range && offsetY < defaultOptions.height - range && offsetY > range) {              //左
            this.mouseStyle = 'w-resize'
        } else if (offsetX > defaultOptions.width - range && offsetY > range && offsetY < defaultOptions.height - range) {  //右
            this.mouseStyle = 'e-resize'
        } else {
            this.mouseStyle = 'move'
        }

        this.area.style.cursor = this.mouseStyle
    }

    computeOffset(now, last) {
        let x = now.x - last.x
        let y = now.y - last.y

        switch (this.mouseStyle) {
            case 'nw-resize':       //左上角
                this.DEFAULT_OPTIONS.width += -x
                this.DEFAULT_OPTIONS.height += -y
                this.DEFAULT_OPTIONS.x += x
                this.DEFAULT_OPTIONS.y += y
                break;
            case 'ne-resize':           //右上角
                this.DEFAULT_OPTIONS.width += x
                this.DEFAULT_OPTIONS.height += -y
                this.DEFAULT_OPTIONS.y += y
                break;
            case 'sw-resize':       //左下角
                this.DEFAULT_OPTIONS.width += -x
                this.DEFAULT_OPTIONS.height += y
                this.DEFAULT_OPTIONS.x += x
                break;
            case 'se-resize':           //右下角
                this.DEFAULT_OPTIONS.width += x
                this.DEFAULT_OPTIONS.height += y
                break;
            case 'w-resize':        //左
                this.DEFAULT_OPTIONS.width += -x
                this.DEFAULT_OPTIONS.x += x
                break;
            
            case 'n-resize':            //上
                this.DEFAULT_OPTIONS.height += -y
                this.DEFAULT_OPTIONS.y += y
                break;
            
            case 'e-resize':           //右
                this.DEFAULT_OPTIONS.width += x
                break;
            case 's-resize':            //下
                this.DEFAULT_OPTIONS.height += y
                break;
            case 'move':
                this.DEFAULT_OPTIONS.x += x
                this.DEFAULT_OPTIONS.y += y
                break;
            default: break;
        }
    }

    setAreaStyle() {
        const transform = `
            translateX(${this.DEFAULT_OPTIONS.x}px) 
            translateY(${this.DEFAULT_OPTIONS.y}px) 
            translateZ(0px)
            rotate(${this.DEFAULT_OPTIONS.rotate}deg)
        `

        this.area.style.transform = transform;
        this.area.style.msTransform = transform;
        this.area.style.webkitTransform = transform;
        this.area.style.width = this.DEFAULT_OPTIONS.width + 'px'
        this.area.style.height = this.DEFAULT_OPTIONS.height + 'px'
    }

    removeSelf() {
        this.dispatchEvent('close')
    }

    getInfo() {
        const fatherContainerRect = this.DEFAULT_OPTIONS.parent.getBoundingClientRect()

        return new Proxy(this.DEFAULT_OPTIONS, {
            get: (target, name) => {
                if(target[name]) {
                    return target[name]
                } else {
                    switch(name) {
                        case 'leftProportion':
                            return ((this.DEFAULT_OPTIONS.x + this.DEFAULT_OPTIONS.left) / fatherContainerRect.width).toFixed(2) * 100 + '%'
                        case 'topProportion':
                            return ((this.DEFAULT_OPTIONS.y + this.DEFAULT_OPTIONS.top) / fatherContainerRect.height).toFixed(2) * 100 + '%'
                        case 'widthProportion':
                            return (this.DEFAULT_OPTIONS.width / fatherContainerRect.width).toFixed(2) * 100 + '%'
                        case 'heightProportion':
                            return (this.DEFAULT_OPTIONS.height / fatherContainerRect.height).toFixed(2) * 100 + '%'
                        default:
                            return undefined
                    }
                }
            },
            set: () => {
                return false
            }
        })
    }
}

events(Area)

export default Area