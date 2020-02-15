// The email entry is where i implemented the realtime validation
// The unique erromessages is implemented in credicard number section
const name_label = document.getElementById("name_label");
const other_option = document.getElementById("other_option");
const other_title = document.getElementById("other-title");
const roleSelectOption = document.getElementById("title");
const designSelectOption = document.getElementById("design")
const colorsOptions = document.getElementById("color")
const inputElements = document.getElementsByTagName("input")
const checkBoxes = []
const activitiesDiv = document.getElementsByClassName("activities")
const total = document.createElement("div")
const payment = document.getElementById("payment")
const submitForm = document.getElementById("submitForm")
const signUpForm = document.getElementById("signUpForm")
const errorDivs = document.getElementsByClassName("error")
const colorDiv = document.getElementById("colors-js-puns")

designSelectOption.addEventListener("change",(e)=>{
    let inputColor= colorsOptions.options[colorsOptions.selectedIndex].value
    if(designSelectOption.value=="js puns"){
        colorsOptions.options[0].selected=true
    }
    else if(designSelectOption.value=="heart js"){
        colorsOptions.options[3].selected=true
    }
})

designSelectOption.addEventListener("change", themeSelection)
document.addEventListener("load", initialFunctionalities())
document.getElementById("mail").addEventListener("keyup", realTimeEmailCheck)


// realtime error message for email
function realTimeEmailCheck(e) {
    let email = e.target.value
    if (email.length <= 6) {
        return document.getElementById("mailError").style.display = "block";
    }
    if (email.indexOf("@") == -1) {
        return document.getElementById("mailError").style.display = "block";
    }
    var parts = email.split("@");
    var dot = parts[1].indexOf(".");
    var len = parts[1].length;
    var dotSplits = parts[1].split(".");
    var dotCount = dotSplits.length - 1;
    if (dot == -1 || dot < 2 || dotCount > 2) {
        return document.getElementById("mailError").style.display = "block";

    }
    for (var i = 0; i < dotSplits.length; i++) {
        if (dotSplits[i].length == 0) {
            return document.getElementById("mailError").style.display = "block";
        }
    }
    document.getElementById("mailError").style.display = "none"
    return true;
};




// This function enables the initial functionalities and default states
function initialFunctionalities() {
    payment.value = "credit card"
    document.getElementById("paypal").style.display = "none"
    document.getElementById("bitcoin").style.display = "none"
    payment.addEventListener("change", paymentMethod)
    submitForm.addEventListener("click", formValidation)

    name_label.click()
    disableDesignOptions()
    other_title.style.display = "none"
    title.addEventListener("change", (e) => {
        let input_value = roleSelectOption.options[roleSelectOption.selectedIndex].value
        if (input_value == "other") {
            other_title.style.display = "block"
        } else {
            other_title.style.display = "none"
        }
    })
    for (i = 0; i < inputElements.length; i++) {
        if (inputElements[i].type == "checkbox") {
            checkBoxes.push(inputElements[i])
        }
    }
    for (i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].addEventListener("click", newCheckboxAntiClash)
    }
}

designSelectOption.addEventListener("change", () => {
    colorDiv.style.display = "none"
    let selectValue = designSelectOption.options[designSelectOption.selectedIndex].value
    if (selectValue == "Select Theme") {
        colorDiv.style.display = "none"
    } else {
        colorDiv.style.display = "block"
    }
})


//these  functions disable and enable the appropraite select options for t-shirt design and themes
function disableDesignOptions() {
    let input_value = designSelectOption.options[designSelectOption.selectedIndex].value
    if (input_value == "Select Theme") {
        let unselected = document.createElement("option")
        let unselectedText = document.createTextNode("Please Select an Option")
        unselected.appendChild(unselectedText)
        colorsOptions.appendChild(unselected)
        unselected.selected = "selected"
        unselected.hidden = "hidden"
    }
}
colorDiv.style.display = "none"

function themeSelection() {
    let input_value = designSelectOption.options[designSelectOption.selectedIndex].value
    if (input_value == "Select Theme") {
        disableDesignOptions()
    } else if (input_value == "js puns") {
        colorDiv.style.display = "block"
        colorsOptions.disabled = false
        colorsOptions.options[2].hidden = false
        colorsOptions.options[1].hidden = false
        colorsOptions.options[0].hidden = false
        colorsOptions.options[6].hidden = "hidden"
        colorsOptions.options[5].hidden = "hidden"
        colorsOptions.options[4].hidden = "hidden"
        colorsOptions.options[3].hidden = "hidden"

    } else {
        colorDiv.style.display = "block"
        colorsOptions.disabled = false
        colorsOptions.options[5].hidden = false
        colorsOptions.options[4].hidden = false
        colorsOptions.options[3].hidden = false

        colorsOptions.options[6].hidden = "hidden"
        colorsOptions.options[2].hidden = "hidden"
        colorsOptions.options[1].hidden = "hidden"
        colorsOptions.options[0].hidden = "hidden"

    }
}

function checkedBoxes(val) {
    if (val.checked == true) {
        return val
    }

}


// This funtion  mananges the payment method displayed
function paymentMethod() {

    let typeOfPayment = payment.options[payment.selectedIndex].value
    payment.options[0].hidden = true
    if (typeOfPayment == "credit-card") {
        document.getElementById("paypal").style.display = "none"
        document.getElementById("bitcoin").style.display = "none"
        document.getElementById("credit-card").style.display = "block"
    } else if (typeOfPayment == "paypal") {
        document.getElementById("credit-card").style.display = "none"
        document.getElementById("bitcoin").style.display = "none"
        document.getElementById("paypal").style.display = "block"
    } else if (typeOfPayment == "bitcoin") {
        document.getElementById("paypal").style.display = "none"
        document.getElementById("credit-card").style.display = "none"
        document.getElementById("bitcoin").style.display = "block"
    } else {
        document.getElementById("credit-card").style.display = "block"
        document.getElementById("paypal").style.display = "none"
        document.getElementById("bitcoin").style.display = "none"
    }


}

//  This function checks the validity of email provided
function checkEmailIsValid(email) {
    if (email.length <= 6) {
        document.getElementById("mailError").style.display = "block"
        return false;
    }
    if (email.indexOf("@") == -1) {
        document.getElementById("mailError").style.display = "block"
        return false;
    }
    var parts = email.split("@");
    var dot = parts[1].indexOf(".");
    var len = parts[1].length;
    var dotSplits = parts[1].split(".");
    var dotCount = dotSplits.length - 1;
    if (dot == -1 || dot < 2 || dotCount > 2) {
        document.getElementById("mailError").style.display = "block"
        return false;

    }
    for (var i = 0; i < dotSplits.length; i++) {
        if (dotSplits[i].length == 0) {
            document.getElementById("mailError").style.display = "block"
            return false;
        }
    }

    return true;
};



// This function checks that the credit card details provided are valid
function checkCreditCardNumber() {

     
    let creditCardNum = document.getElementById("cc-num")
    let check=/^[0-9]+$/

    if (creditCardNum.value.length < 13) {
        document.getElementById("ccError").style.display = "block"
        document.getElementById("ccError").innerText = "Please enter a number longer than 12 digits"

        return false
    }
    if (creditCardNum.value.length > 16) {
        document.getElementById("ccError").style.display = "block"
        document.getElementById("ccError").innerText = "Please enter a number no longer than 16 digits"
        return false
    }
    if (!creditCardNum.value.match(check)) {
        document.getElementById("ccError").style.display = "block"
        document.getElementById("ccError").innerText = "Please enter a number "
        return false
    }
    
    return true
}
// checking zip code is valide
function checkZipIsValid() {
    let check=/^[0-9]+$/
    let zipCode = document.getElementById("zip")
    let zipNum= zipCode.value
    if (zipCode.value.length != 5) {
        document.getElementById("zipError").style.display = "block"
        return false
    }
    if(!zipCode.value.match(check)){
        console.log(typeof zipNum)
        document.getElementById("zipError").style.display = "block"
        return false
    }
    return true
}

function checkCvvIsValid() {
    let check=/^[0-9]+$/
    let cvv = document.getElementById("cvv")
    let cvvNum= cvv.value
    if (cvv.value.length != 3) {
        document.getElementById("cvvError").style.display = "block"
        return false
    }
    if(!cvv.value.match(check)){
        document.getElementById("cvvError").style.display = "block"
        return false
    }

    return true
}

function nameValidation() {
    if (!document.getElementById("name").value) {
        document.getElementById("nameError").style.display = "block"
        return false
    }
    return true
}

function checkBoxValidation() {
    let boxesChecked = checkBoxes.filter(checkedBoxes)
    if (boxesChecked.length <= 0) {
        document.getElementById("checkBoxError").style.display = "block"
        return false
    }
    return true
}
// This function prevents the form from submitting before all validatory requirements have been met 
function formValidation(e) {
    hideErrorMessages()
    e.preventDefault()
    let paymentType = payment.options[payment.selectedIndex].value

    if (paymentType === "credit card") {
        let nameFieldResult = nameValidation()
        let emailFieldResult = checkEmailIsValid(document.getElementById("mail").value)
        let boxFieldResult = checkBoxValidation()
        let creditCardFieldResult = checkCreditCardNumber()
        let zipCodeFieldResult = checkZipIsValid()
        let cvvFieldResult = checkCvvIsValid()
        if (nameFieldResult && emailFieldResult && boxFieldResult && creditCardFieldResult && zipCodeFieldResult && cvvFieldResult) {
            return signUpForm.submit()
        }
    } else {
        let nameFieldResult = nameValidation()
        let emailFieldResult = checkEmailIsValid(document.getElementById("mail").value)
        let boxFieldResult = checkBoxValidation()
        if (nameFieldResult && emailFieldResult && boxFieldResult) {
            return signUpForm.submit()
        }
    }
}
// Hide all error
function hideErrorMessages() {
    for (i = 0; i < errorDivs.length; i++) {
        errorDivs[i].style.display = "none"
    }
}

// show all error
function showErrorMessages() {
    for (i = 0; i < errorDivs.length; i++) {
        errorDivs[i].style.display = "block"
    }
}

//This function prevents user from picking clashng
function newCheckboxAntiClash(e) {
    for (i = 0; i < checkBoxes.length; i++) {
        if (e.target.checked) {
            if (e.target.getAttribute("data-day-and-time") == checkBoxes[i].getAttribute("data-day-and-time")) {
                checkBoxes[i].disabled = true
            }
            e.target.disabled = false
        } else {
            if (e.target.getAttribute("data-day-and-time") == checkBoxes[i].getAttribute("data-day-and-time")) {
                checkBoxes[i].disabled = false
            }

        }

    }
    let checked = checkBoxes.filter(checkedBoxes)
    var valueForTotal = 0
    for (i = 0; i < checked.length; i++) {
        valueForTotal += Number(checked[i].getAttribute("data-cost"))
    }
    total.innerText = `Your Total is : $${valueForTotal}`
    if (activitiesDiv[0].lastChild.tagName != "DIV") {
        activitiesDiv[0].appendChild(total)
    }

    if (valueForTotal > 0) {
        total.style.display = "block"
    } else {
        total.style.display = "none"
    }

}