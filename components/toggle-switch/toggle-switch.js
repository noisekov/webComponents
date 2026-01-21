class ToggleSwitch extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
         if (!this.rendered) {
            const stylesheet = [...document.styleSheets].find((styleSheet) => styleSheet.href?.split('/').pop() === 'toggle-switch.css');
            const stylesheetText = [...stylesheet.cssRules].reduce((accumulator, rule) => accumulator + rule.cssText, '');
            const shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = this.render()
            const myStyles = new CSSStyleSheet();
            myStyles.replace(stylesheetText);
            shadow.adoptedStyleSheets = [myStyles];
            this.rendered = true;

            const input = shadow.getElementById("input")
            input.onclick = () => {
                this.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
     }

     render() {
        return `
           <label class="checkbox-ya" id="toggle">
                <input type="checkbox" id="input">
                <span class="checkbox-ya-switch">
                    <span class="checkbox-ya-feature" data-label-on="On" data-label-off="Off"></span>
                </span>
            </label>
        `
     }
}

customElements.define('toggle-switch', ToggleSwitch);