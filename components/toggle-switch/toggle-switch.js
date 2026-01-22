class ToggleSwitch extends HTMLElement {
    constructor() {
        super()
    }

    grabStyles() {
        const stylesheet = [...document.styleSheets].find((styleSheet) => styleSheet.href?.split('/').pop() === 'toggle-switch.css');
        const stylesheetText = [...stylesheet.cssRules].reduce((accumulator, rule) => accumulator + rule.cssText, '');
        
        return stylesheetText;
    }

    setStyles(shadow) {
        const myStyles = new CSSStyleSheet();
        myStyles.replace(this.grabStyles());
        shadow.adoptedStyleSheets = [myStyles];
    }

    connectedCallback() {
         if (!this.rendered) {
            const shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = this.render()
            this.setStyles(shadow)
            this.rendered = true;
            
            this.input = shadow.getElementById("input")
            this.label = shadow.getElementById("label");
            
            this.input.onclick = () => {
                this.#updateLabel()
                this.dispatchEvent(new CustomEvent('change', {  detail: { checked: this.input.checked } }));
            }
        }
    }

    #updateLabel() {
        if (!this.label) return

        this.label.innerHTML = this.input.checked 
            ? this.getAttribute('enabled-label')
            : this.getAttribute('disabled-label');
    }

    static get observedAttributes() {
        return ["disabled-label", 'enabled-label'];
    }

    attributeChangedCallback() {
        this.#updateLabel()
    }

     render() {
        return `
           <label class="checkbox-ya" id="toggle">
                <input type="checkbox" id="input" checked> 
                <span class="checkbox-ya-switch">
                    <span class="checkbox-ya-feature" data-label-on="On" data-label-off="Off"></span>
                </span>
                <span id="label"></span>
            </label>
        `
     }
}

customElements.define('toggle-switch', ToggleSwitch);