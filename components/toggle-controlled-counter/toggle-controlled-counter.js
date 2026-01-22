class ToggleControlledCounter extends HTMLElement {
    constructor() {
        super()
    }

    grabStyles() {
        const stylesheet = [...document.styleSheets].find((styleSheet) => styleSheet.href?.split('/').pop() === 'toggle-controlled-counter.css');
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
            const shadow = this.attachShadow({mode: 'closed'});


            this.wrap = document.createElement('div')
            this.wrap.classList = 'wrap'
            shadow.appendChild(this.wrap)

            this.titleSpan = document.createElement('span')
            this.titleSpan.innerText = this.getAttribute('label')
            this.wrap.appendChild(this.titleSpan)

            this.toggleSlot = document.createElement('slot')
            this.toggleSlot.setAttribute('name', 'toggle')
            this.wrap.appendChild(this.toggleSlot)

            this.toggleCounter = document.createElement('slot')
            this.toggleCounter.setAttribute('name', 'counter')
            this.wrap.appendChild(this.toggleCounter)
            this.setStyles(shadow)
            this.rendered = true;
            
            this.toggleSlot.addEventListener('slotchange', () => {
                const [toggle] = this.toggleSlot.assignedElements();
                const [counter] = this.toggleCounter.assignedElements();
                const counterAttributes = ['value', 'min', 'max', 'counter-label']
                const toggleAttributes = ['enabled-label', 'disabled-label']
                
                if (counter) {
                    counterAttributes.forEach(attribut => counter.setAttribute(attribut, this.getAttribute(attribut)))
                }

                if (toggle) {
                    toggleAttributes.forEach(attribut => toggle.setAttribute(attribut, this.getAttribute(attribut)))
                    
                    toggle.addEventListener('change', (evt) => {
                        counter.style.display = evt.detail.checked ?  'block' : 'none';
                    });
                }
            });
        }
     }
}

customElements.define('toggle-controlled-counter', ToggleControlledCounter)