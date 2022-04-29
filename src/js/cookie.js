
export function getPreference() {
    if(localStorage.getItem('lang')) {
     let lang = localStorage.getItem('lang');
    // console.log(lang)
      if (lang == "ru"){
       this.properties.langRU = true; 
        }
     }
  }

export function setLocalStorage(a) {
    let lang
    a ? lang = "ru" : lang = "en"
    localStorage.setItem('lang', lang);
  }