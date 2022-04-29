
export function createHtml(el, classNames, child, parent, ...dataAttr) {
    let element = null;
    try {
        element = document.createElement(el);
     } catch (error) {
         throw new Error('Can\'t create HTML element! Give another tag name')
     }
    
    }