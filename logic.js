
window.onload = function(){
    const day = document.getElementById("iday");
    const month = document.getElementById("imonth");
    const year = document.getElementById("iyear");
    const labels = document.getElementsByTagName("label");
    const error = document.getElementsByClassName("error");
    const buttonsubmit = document.getElementById("submit");
    const spans = document.getElementsByTagName("span");

    const date = new Date();

    let currentday = date.getDate();
    let currentmonth = date.getMonth() + 1;
    let currentyear = date.getFullYear();

    const typeOfError = [
        "",
        "This field is required",
        "Must be a valid month",
        "Must be a valid day",
        "Must be a  valid year",
        "must be a valid date"
    ]

    const errorstate = (numberOfError, typeOfDate, typeOfError, color) => { error[numberOfError].innerHTML = typeOfError;

    labels[numberOfError].style.color = color; 
    typeOfDate.style.borderColor = color;}

    const isLeapYear = (day, month, year) => {
        month = month -1;
        fullDate = new Date(year, month, day);
        if(day == fullDate.getDate() && month == fullDate.getMonth() && year == fullDate.getFullYear()){
            return true;
        }
        else{
            return false;
        }
    }

    const agesubstract = () => {
        let newyear = Math.abs(currentyear - year.value);

        let newMonth = 0;
        if (currentmonth >= month.value){
            newMonth = currentmonth - month.value;
        }
        else{
            newyear--;
            newMonth = 12 + currentmonth - month.value;
        }

        let newDay = 0;
        if (currentday >= day.value){
            newDay = currentday - day.value;
        }
        else{
            if(isLeapYear(day.value, month.value, year.value)){
                newDay = 30 + currentday - day.value;
            }
            else{
                newDay = currentday - day.value;
            }

            if (newMonth < 0){
                newMonth = 11;
                newyear--;
            }

            if (newMonth < currentmonth) {
                newDay++;
            }
        }

        spans[0].innerHTML = newyear
        spans[1].innerHTML = newMonth
        spans[2].innerHTML = newDay
    }

    const isdaycorrect = () => {
        if (day.value == ""){
            errorstate(0, day, typeOfError[1], "#ff5757");
            return false;
        }
        else if (day.value <= 0 || day.value > 31){
            errorstate(0, day, typeOfError[2], "#ff5757");
            return false;
        }
        else if (isLeapYear(day.value, month.value, year.value) == false){
            errorstate(0, day, typeOfError[5], "#ff5757");
            return false;
        }
        else {
            errorstate(0, day, typeOfError[0], "#");
            return true;
        }
    }

    const isMonthcorrect = () => {
        if(month.value == "") {
            errorstate(1, month, typeOfError[1], "#ff5757");
            return false;
        }
        else if(month.value <= 0 || month.value > 12) {
            errorstate(0, month, typeOfError[3], "#ff5757");
            return false;
        }
        else if (isLeapYear(day.value, month.value, year.value) == false){
            errorstate(1, month, typeOfError[0], "#ff5757");
            return false;
        }
        else {
            errorstate(1, month, typeOfError[0], "#");
            return true;
        }
    }

    const isyearcorrect = () => {
        if(year.value == "") {
            errorstate(2, year, typeOfError[1], "#ff5757");
            return false;
        }
        else if(year.value > currentyear) {
            errorstate(2, year, typeOfError[4], "#ff5757");
            return false;
        }
        else if (year.value == currentyear && month.value > currentmonth){
            errorstate(1, month, typeOfError[3], "#ff5757");
            return false;
        }
        else if(year.value == currentyear && month.value > currentmonth && day.value > currentday){
            errorstate(0, mondayh, typeOfError[2],"#ff5757");
            return false;
        }
        else if(isLeapYear(day.value, month.value, year.value) == false){
            errorstate(2, year, typeOfError[0],"#ff5757");
            return false;
        }
        else{
            errorstate(2, year, typeOfError[0], "#");
            return true;
        }
    }

    buttonsubmit.addEventListener("click", () =>{
        isdaycorrect();
        isMonthcorrect();
        isyearcorrect();
         
        if(isdaycorrect() && isMonthcorrect() && isyearcorrect()){
            agesubstract();
        }
    })
}