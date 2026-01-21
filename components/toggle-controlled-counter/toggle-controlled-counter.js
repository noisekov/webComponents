class ToggleControlledCounter extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
         if (!this.rendered) {
            const stylesheet = [...document.styleSheets].find((styleSheet) => styleSheet.href?.split('/').pop() === 'toggle-controlled-counter.css');
            const stylesheetText = [...stylesheet.cssRules].reduce((accumulator, rule) => accumulator + rule.cssText, '');
            const shadow = this.attachShadow({mode: 'closed'});
            shadow.innerHTML = this.render()

            this.toggleSlot = document.createElement('slot')
            this.toggleSlot.setAttribute('name', 'toggle')
            shadow.appendChild(this.toggleSlot)

            this.toggleCounter = document.createElement('slot')
            this.toggleCounter.setAttribute('name', 'counter')
            shadow.appendChild(this.toggleCounter)

            const myStyles = new CSSStyleSheet();
            myStyles.replace(stylesheetText);
            shadow.adoptedStyleSheets = [myStyles];
            this.rendered = true;
            
            this.toggleSlot.addEventListener('slotchange', () => {
                const toggle = this.toggleSlot.assignedElements()[0];
                const counter = this.toggleCounter.assignedElements()[0];
                
                if (counter) {
                    counter.setAttribute('value', this.getAttribute('value'))
                    counter.setAttribute('min', this.getAttribute('min'))
                    counter.setAttribute('max', this.getAttribute('max'))
                    counter.setAttribute('counter-label', this.getAttribute('counter-label'))
                }

                toggle.addEventListener('change', () => {
                    console.log('changed')
                });
            });
        }
     }

     render() {
        return ``
     }
}

customElements.define('toggle-controlled-counter', ToggleControlledCounter)