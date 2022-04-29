import './style/main.scss';
import {
    createHeader,
    createKeys
} from './js/create.js'
import {
    keyLayout
} from './js/base.js'
import {
    print
} from './js/events_handler.js'
import {
    getPreference,
    setLocalStorage
} from './js/cookie.js'
import {
    selfcheck
} from './js/selfcheck.js'
console.log(selfcheck)
/*start keyboard*/

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
        textArea: null
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },
    properties: {
        value: "",
        capsLock: false,
        ctrl: false,
        langRU: false,
    },

    keyLayout: keyLayout,

    init() { 
        
        getPreference.call(Keyboard); //get lang
       
        //create elements
        const textArea = document.querySelector(".use-keyboard-input")
        this.textArea = textArea;
        
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        //add class
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");

        this.elements.keysContainer.appendChild(createKeys.call(Keyboard)); //create elements from create JS
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");


        //prevent losefocus!
        this.elements.main.addEventListener("mousedown", (e) => {
            e.preventDefault();
          
        }, false);

        this.elements.main.appendChild(this.elements.keysContainer)
        document.body.firstElementChild.appendChild(this.elements.main)

        // Automatically use keyboard for elements with .use-keyboard-input

        this.elements.main.addEventListener("mousedown", (e) => { this._handleKeyboard(e) });
        this.elements.main.addEventListener("mouseup", (e) => { this._handleKeyboard(e) });
        document.addEventListener("keydown", (e) => { this._handleKeyboard(e) });
        document.addEventListener("keyup", (e) => { this._handleKeyboard(e) });

           textArea.addEventListener("focus", () => {
                this.open(textArea.value, currentValue => {
                    textArea.value = currentValue;
                });
            });

            textArea.focus();
            //setTimeout(() => textArea.focus(), 300);
        /*  this.open(textArea.value, currentValue => {
            textArea.value = currentValue;
        });*/
    },

    _triggerEvent(handlerName) { //set textarea.value
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);

        }
    },

    _handleKeyboard(e){ 
        
        if (e.stopPropagation) e.stopPropagation();
        const { code, type } = e;
        const array = this.keyLayout['keyboardOrder'];
        const array1 = this.elements.keys
        if (type == 'keydown' || type == 'keyup') { e.preventDefault();
            const myKey = array.find((key) => key === code);
            if (!myKey) return;

            if (type == 'keydown') array1[array.indexOf(code)].classList.add("active")
            if (type == 'keyup')  array1[array.indexOf(code)].classList.remove("active")

            const key = array1[array.indexOf(code)].textContent;
            print.call(Keyboard, key, type)
        }
        if (type == 'mousedown' || type == 'mouseup') { 
           // console.log(e.target.classList)
            if ( e.target.classList.contains("keyboard__key") || e.target.classList.contains("material-icons") ||  e.target.classList.contains("special-key") ) {
                const key = e.target.textContent
                print.call(Keyboard, key, type)
            } 
        }       

    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (let key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }

        }
    },

    _toggleLang(lang) {

        let array = this.keyLayout[lang]

        this.elements.keys.forEach((el, i) => {
            if (el.childElementCount === 0) {
                el.innerHTML = array[i];
            }
        })
        
        if (this.properties.capsLock) {
            for (let key of this.elements.keys) {
                if (key.childElementCount === 0) {
                    key.textContent = key.textContent.toUpperCase();
                }
            }
        }
    },

    _toggleShift(lang) {
        let array = this.keyLayout[lang]
        this.elements.keys.forEach((el, i) => {
            if (el.childElementCount === 0) {
                el.innerHTML = array[i];
            }
        })

        if (this.properties.capsLock) {
            for (let key of this.elements.keys) {
                if (key.childElementCount === 0) {
                    key.textContent = key.textContent.toLowerCase();
                }
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");

    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }

    /*print(){
    }*/
    
};

window.addEventListener("DOMContentLoaded", function () {
    createHeader();
    Keyboard.init();
})
window.addEventListener('beforeunload', () => {
    setLocalStorage(Keyboard.properties.langRU);
});


//TODO
// сделать нормальный Html creator
//ДОП. удаление выделением backspace

// PROFIT!!!

