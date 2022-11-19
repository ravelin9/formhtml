const inputPhone = document.querySelector('[type="tel"]');
const form = document.querySelector('form');
const check = document.querySelector("[type='checkbox']");
const wrapCheckbox  = document.querySelector('.checkbox')
const necessarily = document.querySelectorAll('.necessarily')

element = document.querySelector('textarea')
let offset = element.offsetHeight - element.clientHeight;
element.addEventListener('input', function (event) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + offset + 'px';
});

  function maskPhone(elems, masked = "+7 (___) ___-__-__") {

    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      let i = 0,
        newValue = template.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i !== -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      ) {
        this.value = newValue;
      }
      if (event.type === "blur" && this.value.length < 5) {
        this.value = "";
      }
    }
  
    elems.addEventListener("input", mask);
    elems.addEventListener("focus", mask);
    elems.addEventListener("blur", mask);
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!check.checked){
        const errorMess = document.createElement('div');
        errorMess.style.fontSize = "12px";
        errorMess.textContent = 'Дайте согласие на обработку данных';
        errorMess.style.color = 'crimson'
        wrapCheckbox.appendChild(errorMess)
        setTimeout(() => {
            wrapCheckbox.removeChild(errorMess);
        }, 3000);
    }

   for( let i = 0; i< necessarily.length; i++){
    if(necessarily[i].value === ''){
        const errorMess = document.createElement('div');
    errorMess.style.fontSize = "12px";
    errorMess.textContent = 'Заполните все поля со звёздочками *';
    errorMess.style.color = 'crimson'
    wrapCheckbox.appendChild(errorMess)
    setTimeout(() => {
        wrapCheckbox.removeChild(errorMess);
    }, 3000);
    break
    }
   }

  })



  maskPhone(inputPhone)