let main = document.getElementById('main-display');
let previous = 0;
let num = 0
function showInDisplay(value){
    if (value === NaN) {
        
    }
    main.textContent += `${value}`;
    num = parseInt(main.textContent);
}