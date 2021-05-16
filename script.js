let valueSliders = document.querySelectorAll(".slider-setting")
let moneyContent = document.querySelector("#money-content")
let daysContent = document.querySelector("#days-content")
let creditBody = document.querySelector("#credit-body")
let percentPeriod = document.querySelector("#percent-period")
let result = document.querySelector("#result")
let date = document.querySelector("#date")
let chbox = document.getElementById('box');

for (let valueSlider of valueSliders) {
    valueSlider.oninput = moneyValue
}

chbox.onchange = moneyValue

function moneyValue() {
    moneyContent.textContent = valueSliders[0].value
    daysContent.textContent = valueSliders[1].value
    
    creditBody.textContent =  moneyContent.textContent
    let percent = chbox.checked ? 0.001 * daysContent.textContent : 0.0199 * daysContent.textContent
    
    percentPeriod.textContent = (Math.round(creditBody.textContent * percent * 100) / 100).toFixed(2)
    result.textContent = (+creditBody.textContent + +percentPeriod.textContent).toFixed(2)
    
    addUah(" грн.")
    formatDate(daysContent.textContent)
    change()
}

function addUah(text) {
    creditBody.textContent += text
    percentPeriod.textContent += text
    result.textContent += text
}

function formatDate(days) {
    let nowDate = new Date()
    nowDate.setDate(nowDate.getDate() + +days);
    var dd = nowDate.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = nowDate.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = nowDate.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
    date.textContent = dd + '.' + mm + '.' + yy;
}

let keys = document.querySelectorAll(".key")

function change() {
    for (let key of keys) {
        key.onclick = function() {
            let target = event.target.className
            
            if (target == "key money-left") {
                valueSliders[0].value = +valueSliders[0].value - 100
            } else if (target == "key money-right") {
                valueSliders[0].value = +valueSliders[0].value + 100
            }            
            else if (target == "key day-left") {
                valueSliders[1].value = +valueSliders[1].value - 1
            } else {
                valueSliders[1].value = +valueSliders[1].value + 1
            }
            moneyValue()
        }
    }
}

let labelCheck = document.getElementById("label-check")

labelCheck.onclick = function() {
    !chbox.checked ? chbox.checked = true : chbox.checked = false
    moneyValue()
}

moneyValue()