const name_label= document.getElementById("name_label");
const other_option=document.getElementById("other_option");
const other_title=document.getElementById("other-title");
const roleSelectOption=document.getElementById("title");
const designSelectOption=document.getElementById("design")
const colorsOptions= document.getElementById("color")
const inputElements=document.getElementsByTagName("input")
const checkBoxes=[]
const activitiesDiv=document.getElementsByClassName("activities")
const total=document.createElement("input")
const payment=document.getElementById("payment")
const submitForm=document.getElementById("submitForm")
const signUpForm=document.getElementById("signUpForm")

designSelectOption.addEventListener("change",themeSelection)
document.addEventListener("load",initialFunctionalities())


// This function enables the initial functionalities and default states
function initialFunctionalities(){
    document.getElementById("paypal").style.display="none"
    document.getElementById("bitcoin").style.display="none"
    payment.addEventListener("change",paymentMethod)
    submitForm.addEventListener("click",formValidation)



    name_label.click()
    disableDesignOptions()
    other_title.style.display="none"
    title.addEventListener("change",(e)=>{
        let input_value=roleSelectOption.options[roleSelectOption.selectedIndex].value
        if(input_value=="other"){other_title.style.display="block"}
}
    )
    for(i=0;i<inputElements.length;i++){
        if(inputElements[i].type=="checkbox"){
            checkBoxes.push(inputElements[i])
        }
    }
    for (i=0;i<checkBoxes.length;i++){
        checkBoxes[i].addEventListener("click",manageCheckBoxes)
    }
}

 
//these  functions disable and enable the appropraite select options for t-shirt design and themes
function disableDesignOptions(){
let input_value=designSelectOption.options[designSelectOption.selectedIndex].value
if(input_value=="Select Theme"){
    colorsOptions.disabled=true
    let unselected= document.createElement("option")
    let unselectedText=document.createTextNode("Please Select an Option")
    unselected.appendChild(unselectedText)
    colorsOptions.appendChild(unselected)
    unselected.selected="selected"
    unselected.hidden="hidden"
}
}
function themeSelection(){
    let input_value=designSelectOption.options[designSelectOption.selectedIndex].value
    if(input_value=="Select Theme"){
        disableDesignOptions()
    }
    else if (input_value=="js puns"){
            colorsOptions.disabled=false
            colorsOptions.options[2].hidden=false
            colorsOptions.options[1].hidden=false
            colorsOptions.options[0].hidden=false
            colorsOptions.options[6].hidden="hidden"
            colorsOptions.options[5].hidden="hidden"
            colorsOptions.options[4].hidden="hidden"
            colorsOptions.options[3].hidden="hidden"
        
        }
    else{
        colorsOptions.disabled=false
        colorsOptions.options[5].hidden=false
        colorsOptions.options[4].hidden=false
        colorsOptions.options[3].hidden=false

            colorsOptions.options[6].hidden="hidden"
            colorsOptions.options[2].hidden="hidden"
            colorsOptions.options[1].hidden="hidden"
            colorsOptions.options[0].hidden="hidden"
        
    }
    }
function checkedBoxes(val){
    if (val.checked== true){
    return val}

}
// this function ensures that the checkbox times dont clash 
    function manageCheckBoxes(e){
        let clashingSlot1= [checkBoxes[1],checkBoxes[3],checkBoxes[5]]
        let clashingSlot2=[checkBoxes[2],checkBoxes[4],checkBoxes[6]]
        let selected
        let selected2
        for(i=0;i<clashingSlot1.length;i++){
            clashingSlot1[i].disabled=true
            if(clashingSlot1[i].checked){
                
                selected=clashingSlot1[i]
                
            }
            }
            
        if(selected!=undefined){
                
                selected.disabled=false
            }
        else{
            for(i=0;i<clashingSlot1.length;i++){
                    clashingSlot1[i].disabled=false
                }
            }

        // second clashing group
        for(i=0;i<clashingSlot2.length;i++){
            clashingSlot2[i].disabled=true
            if(clashingSlot2[i].checked){
                
                selected2=clashingSlot2[i]
                
            }
            }
            
        if(selected2!=undefined){
                
                selected2.disabled=false
            }
        else{
            for(i=0;i<clashingSlot2.length;i++){
                    clashingSlot2[i].disabled=false
                }
            }
        
        
        
        let checked= checkBoxes.filter(checkedBoxes)
        var valueForTotal=0
        for(i=0;i<checked.length;i++){
         valueForTotal+=Number(checked[i].getAttribute("data-cost"))
        }
        total.value=valueForTotal
         if(activitiesDiv[0].lastChild.tagName!="INPUT"){
             activitiesDiv[0].appendChild(total)
         }

         
    }

  
    // This funtion  mananges the payment method displayed
    function paymentMethod(){
        
        let typeOfPayment= payment.options[payment.selectedIndex].value
        payment.options[0].hidden=true
        if(typeOfPayment=="credit-card"){
            document.getElementById("paypal").style.display="none"
            document.getElementById("bitcoin").style.display="none"
            document.getElementById("credit-card").style.display="block"
        }
        else if(typeOfPayment=="paypal"){
            document.getElementById("credit-card").style.display="none"
            document.getElementById("bitcoin").style.display="none"
            document.getElementById("paypal").style.display="block"
        }
        else if(typeOfPayment=="bitcoin") {
            document.getElementById("paypal").style.display="none"
            document.getElementById("credit-card").style.display="none"
            document.getElementById("bitcoin").style.display="block"
         }
         else{
             document.getElementById("credit-card").style.display="block"
            document.getElementById("paypal").style.display="none"
            document.getElementById("bitcoin").style.display="none"
         }

        
    }

//  This function checks the validity of email provided
    function checkEmailIsValid(email){
            if (email.length <= 6) {
                return false;
            }
            if (email.indexOf("@") == -1) {
                return false;
            }
            var parts = email.split("@");
            var dot = parts[1].indexOf(".");
            var len = parts[1].length;
            var dotSplits = parts[1].split(".");
            var dotCount = dotSplits.length - 1;
            if (dot == -1 || dot < 2 || dotCount > 2) {
                return false;
            }
            for (var i = 0; i < dotSplits.length; i++) {
                if (dotSplits[i].length == 0) {
                    return false;
                }
            }
     
            return true;
        };
        
        
        
        // This function checks that the credit card details provided are valid
        function checkCreditCard(){
            let zipCode= document.getElementById("zip")
            let  creditCardNum=document.getElementById("cc-num")
            let cvv=document.getElementById("cvv")
            if(creditCardNum.length>13){
                return false
            }
            if(creditCardNum.length>16){
                return false
            }
            if(typeof creditCardNum!="number"){
                return false
            }
            if(zipCode.length!=5){
                return false
            }
            if(cvv.length!=3){
                return false
            }

        return true


        }
    // This function prevents the form from submitting before all validatory requirements have been met 
    function formValidation(e){
        e.preventDefault()
        let paymentType= payment.options[payment.selectedIndex].value
        let boxesChecked=checkBoxes.filter(checkedBoxes)
        let creditCardCheckresult=checkCreditCard()
        
    if(paymentType=="credit-card"){        
        if(!document.getElementById("name").value||
        !checkEmailIsValid(document.getElementById("mail").value)||
        boxesChecked.length<=0||creditCardCheckresult==false){
         return alert("wrong details")
        }
          return signUpForm.submit()

        }
    
    else{
        if(!document.getElementById("name").value||
        !checkEmailIsValid(document.getElementById("mail").value)||
        boxesChecked.length<=0){
         return alert("wrong details")
        }
        return signUpForm.submit()
    }
    }