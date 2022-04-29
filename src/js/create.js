//import {keyLayout} from './base.js'

export function createHeader() {
    const container = document.createElement("div");
    const footer = document.createElement("footer");

    container.classList.add("container");

    document.body.appendChild(container)
    document.body.appendChild(footer)

    const new_desc_inner = `<h1>RSS Virtual Keyboard w/ Vanilla JS</h1>
    <h3>Description</h3>
    <ul>
        <li>Vanilla JS with ES6 modules (<strong>no libraries required!</strong>)</li>
        <li>Build: Webpack + Eslint (Airbnb plg)</li>
        <li>Responsive styles</li><br>
        <li>To switch language: <strong>press</strong> left ctrl + alt or <strong>click</strong> on <i class="material-icons">language</i> icon </li> 
        <li>If u don't see a keyboard click on textarea :)</li>
    </ul>
    <textarea name="keyboard_text" class="use-keyboard-input" rows="5" cols="35"></textarea>`;

    container.insertAdjacentHTML("afterBegin", new_desc_inner);

    const new_footer_inner =

        `<div class="footer__container footer-copyright">
    <div class="footer-copyright__element">
        <p class="copyright">©</p>
        <p class="year">2022</p>
        <a class="github-username" href="https://github.com/OutLaw0" target="_blank" rel="noopener noreferrer">github</a>
    </div>
    <a href="https://rs.school/js/" class="rss" target="_blank"> Rolling Scopes School </a>
</div>`

    footer.insertAdjacentHTML("afterBegin", new_footer_inner);
}

export function createKeys() {

    const fragment = document.createDocumentFragment();
  
    //Create HTML icon
    const createIconHtml = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`;
    };
    const createSpecKey = (name) => {
        return `<span class="special-key">${name}</span>`;
    };
    
    let langArr = this.keyLayout.en
      if (this.properties.langRU){
        langArr = this.keyLayout.ru
    }

    langArr.forEach((key) => {
        const keyElement = document.createElement('button');
        const insertLineBreak = ["backspace", "Del", "enter", "&#9658;", "Close"].indexOf(key) !== -1;
        // Add attributes/classes
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");


        switch (key) {
            case "backspace":

                keyElement.classList.add("keyboard__key--wide");
                //keyElement.classList.add(this.keyLayout.keyboardOrder[index])
                keyElement.innerHTML = createIconHtml("backspace")
            
                break;

            case "Ctrl":
                // keyElement.classList.add("keyboard__key--wide");
            
                keyElement.innerHTML = createSpecKey("Ctrl")
                break;

            case "Alt":
                // keyElement.classList.add("keyboard__key--wide");
            
                keyElement.innerHTML = createSpecKey("Alt")
                break;

            case "Tab":
             //   keyElement.classList.add("keyboard__key--semi-wide")
                keyElement.innerHTML = createSpecKey("Tab")
                
                break;

            case "enter":
                keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = createIconHtml("keyboard_return");
               
                break;

            case "space":
                keyElement.classList.add("keyboard__key--extra-wide");
                keyElement.innerHTML = createIconHtml("space_bar");
               
                break;

            case "caps":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                keyElement.innerHTML = createIconHtml("keyboard_capslock")
               
                break;

            case "Shift":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                keyElement.innerHTML = createSpecKey("Shift")
               
                break;


            case "changeLang":
                keyElement.classList.add("keyboard__key--dark");
                keyElement.innerHTML = createIconHtml("language");
              
                break;

            case "Del":
               // keyElement.classList.add("keyboard__key--semi-wide");
                keyElement.innerHTML = createSpecKey("Del");

                break;

            case "Close":
                keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                keyElement.innerHTML = createIconHtml("check_circle");
                
                break;

            default:
                keyElement.innerHTML = key.toLowerCase();
                break;
        }
        fragment.appendChild(keyElement);

        if (insertLineBreak) {
            fragment.appendChild(document.createElement("br"));
        }

    });
    
    return fragment;
   
}

