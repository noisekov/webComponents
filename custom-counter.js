class CustomCounter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            const shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = this.render()
            this.rendered = true;

            this.decrementBtn = this.shadowRoot.getElementById('decrement-btn')
            this.decrementBtn.addEventListener('click', () => this.handleDecrement())
            this.incrementBtn = this.shadowRoot.getElementById('increment-btn')
            this.incrementBtn.addEventListener('click', () => this.handleIncrement())
            this.value = this.shadowRoot.getElementById('value')
        }
    }

    handleDecrement() {
        console.log(this.getAttribute('min'))
        this.value.innerHTML--
    }

    handleIncrement() {
        this.value.innerHTML++
    }

    disconnectedCallback() {
            this.decrementBtn.removeEventListener('click', this.handleDecrement());
            this.incrementBtn.removeEventListener('click', this.handleIncrement());
    }

    static get observedAttributes() {
        return ["value"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
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

customElements.define('custom-counter', CustomCounter);