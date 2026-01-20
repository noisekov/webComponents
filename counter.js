//mode:open
class CounterOpen extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            const shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = this.render()
            this.rendered = true;

            this.decrementBtn = this.shadowRoot.getElementById('decrement-btn')
            this.decrementBtn.addEventListener('click', () => this.handleChangeValue('dec'))
            this.incrementBtn = this.shadowRoot.getElementById('increment-btn')
            this.incrementBtn.addEventListener('click', () => this.handleChangeValue("inc"))
            this.value = this.shadowRoot.getElementById('value')
        }
    }

    handleChangeValue(behavior) {
        if (behavior === 'dec') {
            if (+this.getAttribute('min') >= +this.value.innerHTML) {
                return;
            }
    
            this.value.innerHTML--
        }

        if (behavior === 'inc') {
            if (+this.getAttribute('max') <= +this.value.innerHTML) {
                return;
            }

            this.value.innerHTML++
        }
    }

    disconnectedCallback() {
            this.decrementBtn.removeEventListener('click', this.handleChangeValue());
            this.incrementBtn.removeEventListener('click', this.handleChangeValue());
    }

    static get observedAttributes() {
        return ["value"];
    }

    attributeChangedCallback() {
       this.render();
    }

    render() {
        return `
            <div>
                <button id='decrement-btn'>-</button>
                <span id='value'>${this.getAttribute('value')}</span>
                <button id='increment-btn'}>+</button>
            </div>
        `
    }
}


//mode:closed
class CounterClosed extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            const shadow = this.attachShadow({mode: 'closed'});
            shadow.innerHTML = this.render()
            this.rendered = true;
            
            this.decrementBtn = document.createElement('button')
            this.decrementBtn.innerHTML = '-'
            this.decrementBtn.addEventListener('click', () => this.handleChangeValue('dec'))
            shadow.appendChild(this.decrementBtn)

            this.value = document.createElement('span')
            this.value.innerHTML = this.getAttribute('value')
            shadow.appendChild(this.value)

            this.incrementBtn = document.createElement('button')
            this.incrementBtn.innerHTML = '+'
            this.incrementBtn.addEventListener('click', () => this.handleChangeValue("inc"))
            shadow.appendChild(this.incrementBtn)
        }
    }

    handleChangeValue(behavior) {
        if (behavior === 'dec') {
            if (+this.getAttribute('min') >= +this.value.innerHTML) {
                return;
            }
    
            this.value.innerHTML--
        }

        if (behavior === 'inc') {
            if (+this.getAttribute('max') <= +this.value.innerHTML) {
                return;
            }

            this.value.innerHTML++
        }
    }

    disconnectedCallback() {
            this.decrementBtn.removeEventListener('click', this.handleChangeValue());
            this.incrementBtn.removeEventListener('click', this.handleChangeValue());
    }

    static get observedAttributes() {
        return ["value"];
    }

    attributeChangedCallback() {
       this.render();
    }

    render() {
        return ``
    }
}


customElements.define('counter-open', CounterOpen);
customElements.define('counter-closed', CounterClosed);