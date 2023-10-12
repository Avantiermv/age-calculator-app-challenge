function calcular() {
    let dano = new Date()
    let ano = dano.getFullYear()
    let dias = new Date()
    let dia = dias.getDay()
    let dmês = new Date()
    let mês = dmês.getMonth()

    let day = document.querySelector('input#iday')
    let month = document.querySelector('input#imonth')
    let year = document.querySelector('input#iyear')
    
    if (day.value.length == 0 || day.value > dia) {
        window.alert('ERRO')
    } else if (month.value.length == 0 || month.value > month) {
        window.alert('ERRO2')
    }
}
