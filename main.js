class HtmlElement {
    constructor(tagName, isSelfClosing = false, textContent = '') {
        this.tagName = tagName
        this.isSelfClosing = isSelfClosing
        this.textContent = textContent
        this.attributes = {}
        this.styles = {}
        this.children = []

    }

    setAttribute(name, value) {
        this.attributes[name] = value
        return this
    }

    setStyle(name, value) {
        this.styles[name] = value
        return this
    }
    appendChild(element) {
        this.children.push(element)
        return this
    }

    prependChild(element) {
        this.children.unshift(element)
        return this
    }
    getHtml() {
        let htmlString = `<${this.tagName} `

        for (const [name, value] of Object.entries(this.attributes)) {
            htmlString += `${name}="${value}"`
        }

        const styles = Object.entries(this.styles)
        const stylesString = styles.map(([name, value]) => `${name}:${value}`).join(';')
        htmlString += `style=${stylesString}`

        htmlString += '>'

        if (this.textContent.length) {
            htmlString += this.textContent
        }
        if (this.isSelfClosing) {
            return htmlString += '/>'
        }
        for (const child of this.children) {
            htmlString += child.getHtml()
        }
        htmlString += `</${this.tagName}>`

        return htmlString
    }
}

const example = new HtmlElement('div')
example.setStyle('color', 'green')
example.textContent = 'Пример'

document.body.insertAdjacentHTML('beforeend',example.getHtml())