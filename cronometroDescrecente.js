(function () {
    let $cro_cres = document.querySelectorAll('label')[1];
    let $cro_dec = document.querySelectorAll('label')[3];
    let $btnExec1 = document.querySelector(".btnExec1");
    let $btnExec2 = document.querySelector(".btnExec2");
    let hr = 0, min = 00, seg = 0, mil = 0;
    let executouCron = false;   IdCronometro = [];

    $btnExec1.addEventListener("click", ExecutarCronometroCrescente);

    function ExecutarCronometroCrescente() {

        if (executouCron === false) {
            IdCronometro[0] = setInterval(function contarMinutos() {
                hr = Hora();

            }, 1440000)
            IdCronometro[1] = setInterval(function contarMinutos() {
                min = Minutos();

            }, 60000)

            IdCronometro[2] = setInterval(function contarsegundos() {
                seg = Segundos();

            }, 1000)

            IdCronometro[3] = setInterval(function contarMilesimo() {

                mil = Milesimo();

                formatarNumeros();

            }, 100)

            ToggleConometro();
            $btnExec1.innerHTML = "Zerar"
        }
        else {

            for (let i = 0; i < IdCronometro.length; i++) {
                clearInterval(IdCronometro[i]);
            }
            seg = 0;
            min = 0;
            hr = 0;
            mil = 0

            ToggleConometro();
            formatarNumeros();
            $btnExec1.innerHTML = "Executar";
        }

    }

    function ToggleConometro() {
        return this.executouCron = !this.executouCron;
    }

    function formatarNumeros() {
        if (hr.toString().length === 1) {
            hr = "0" + hr;
        }

        if (min.toString().length === 1) {
            min = "0" + min;
        }
        if (seg.toString().length === 1) {
            seg = "0" + seg;
        }

        if (mil.toString().length === 1) {
            mil = "0" + mil;
        }

        $cro_cres.innerHTML = `${hr}:${min}:${seg}_${mil}`
    }

    function Hora() {
        hr++;
        return (hr === 24) ? 0 : hr
    }

    function Minutos() {
        min++;
        return (min === 60) ? 0 : min
    }

    function Segundos() {

        seg++
        return (seg === 60) ? 0 : seg
    }

    function Milesimo() {

        mil++
        return (mil === 10) ? 0 : mil
    }
})()