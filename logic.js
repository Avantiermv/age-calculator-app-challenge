
window.onload = function(){ //* Esta linha garante que o código dentro da função seja executado apenas depois que toda a página da web for carregada.

    //*Essas linhas estão pegando os elementos HTML com os IDs “iday”, “imonth” e “iyear”, respectivamente, e armazenando-os nas constantes day, month e year.
    const day = document.getElementById("iday");
    const month = document.getElementById("imonth");
    const year = document.getElementById("iyear");


    const labels = document.getElementsByTagName("label"); //*Esta linha está pegando todos os elementos HTML com a tag “label” e armazenando-os na constante labels.

    const error = document.getElementsByClassName("error");//*Esta linha está pegando todos os elementos HTML com a classe “error” e armazenando-os na constante error.

    const buttonsubmit = document.getElementById("submit");//*Esta linha está pegando o elemento HTML com o ID “submit” e armazenando-o na constante buttonsubmit.

    const spans = document.getElementsByTagName("span");//*Esta linha está pegando todos os elementos HTML com a tag “span” e armazenando-os na constante spans.

    const date = new Date();//*Esta linha está criando um novo objeto Date que contém a data e hora atuais e armazenando-o na constante date.


    //*Essas linhas estão pegando o dia, mês e ano da data atual e armazenando-os nas variáveis currentday, currentmonth e currentyear, respectivamente.
    let currentday = date.getDate();
    let currentmonth = date.getMonth() + 1;
    let currentyear = date.getFullYear();


    //*Esta linha está criando um array de strings que representam diferentes tipos de erros e armazenando-o na constante typeOfError.
    const typeOfError = [
        "",
        "This field is required",
        "Must be a valid month",
        "Must be a valid day",
        "Must be a  valid year",
        "must be a valid date"
    ]


    //*A função errorstate recebe quatro argumentos: numberOfError, typeOfDate, typeOfError e color. Ela atualiza o conteúdo HTML do elemento de erro especificado para typeOfError, muda a cor do texto do rótulo especificado para color e muda a cor da borda do tipo de data especificado para color.
    const errorstate = (numberOfError, typeOfDate, typeOfError, color) => { error[numberOfError].innerHTML = typeOfError;

    labels[numberOfError].style.color = color; 
    typeOfDate.style.borderColor = color;}


    //*A função isLeapYear recebe três argumentos: day, month e year. Ela cria um novo objeto Date com esses valores, subtrai 1 do mês (porque em JavaScript, os meses são indexados a partir de 0), e então verifica se a data criada é igual à data fornecida. Se for, retorna true; caso contrário, retorna false. Esta função é usada para verificar se uma data fornecida é válida.
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

    
    //*A função agesubstract não recebe nenhum argumento. Ela calcula a diferença entre a data atual e a data fornecida pelo usuário (armazenada nas variáveis day, month e year). A diferença é calculada para o ano, mês e dia, e armazenada nas variáveis newyear, newMonth e newDay, respectivamente. A função também leva em consideração se o ano é bissexto ao calcular a diferença de dias.
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

        //*Essas linhas estão atualizando o conteúdo HTML dos três primeiros elementos span para newyear, newMonth e newDay, respectivamente.
        spans[0].innerHTML = newyear
        spans[1].innerHTML = newMonth
        spans[2].innerHTML = newDay
    }


    //*A função isdaycorrect verifica se o valor do dia é válido. Se o campo estiver vazio, se o valor for menor ou igual a 0 ou maior que 31, ou se a data completa não for válida, a função retorna false e atualiza a mensagem de erro e a cor do campo dia. Se o valor do dia for válido, a função retorna true e limpa a mensagem de erro.
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


    //*A função isMonthcorrect verifica se o valor do mês é válido. Se o campo estiver vazio, se o valor for menor ou igual a 0 ou maior que 12, ou se a data completa não for válida, a função retorna false e atualiza a mensagem de erro e a cor do campo mês. Se o valor do mês for válido, a função retorna true e limpa a mensagem de erro.
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

    //*A função isyearcorrect verifica se o valor do ano é válido. Se o campo estiver vazio, se o valor for maior que o ano atual, se o mês for maior que o mês atual no ano atual, se o dia for maior que o dia atual no mês e ano atuais, ou se a data completa não for válida, a função retorna false e atualiza a mensagem de erro e a cor do campo ano. Se o valor do ano for válido, a função retorna true e limpa a mensagem de erro.
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


    //*Esta parte do código adiciona um ouvinte de evento ao botão de envio. Quando o botão é clicado, as funções isdaycorrect, isMonthcorrect e isyearcorrect são chamadas para validar os campos de dia, mês e ano, respectivamente. Se todos os campos forem válidos, a função agesubstract é chamada para calcular a diferença entre a data atual e a data fornecida pelo usuário.
    buttonsubmit.addEventListener("click", () =>{
        isdaycorrect();
        isMonthcorrect();
        isyearcorrect();
         
        if(isdaycorrect() && isMonthcorrect() && isyearcorrect()){
            agesubstract();
        }
    })
}