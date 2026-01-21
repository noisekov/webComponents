class ToggleSwitch extends HTMLElement {
    constructor() {
        super()
    }

     connectedCallback() {
         
         if (!this.rendered) {
            const stylesheet = [...document.styleSheets].find((styleSheet) => styleSheet.href?.split('/').pop() === 'toggle-switch.css');
            const stylesheetText = [...stylesheet.cssRules].reduce((accumulator, rule) => accumulator + rule.cssText, '');
            const shadow = this.attachShadow({mode: 'closed'});
            shadow.innerHTML = this.render()
            const myStyles = new CSSStyleSheet();
            myStyles.replace(stylesheetText);
            shadow.adoptedStyleSheets = [myStyles];
            this.rendered = true;
        }
     }

     render() {
        return `
           <label class="checkbox-ya">
                <input type="checkbox" checked disabled>
                <span class="checkbox-ya-switch">
                    <span class="checkbox-ya-feature" data-label-on="On" data-label-off="Off"></span>
                </span>
            </label>
        `
     }
}

customElements.define('toggle-switch', ToggleSwitch);