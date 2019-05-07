(function () {
    let $cro_cres = document.querySelectorAll('label')[1];
    let $btnExecZerar = document.querySelector(".btnExecZerar");
    let $btnRegistrar = document.querySelector(".btnRegistrar");
    let $btnLimpar = document.querySelector(".btnLimpar");
    let registro = document.querySelector(".registro");
    let hr = 0, min = 0, seg = 0, mil = 0;
    let executouCron = false, IdCronometro = [], tempo = [];

    addEventListener("load", ()=>{
        $cro_cres.innerHTML = "00:00:00_00";
    });

    $btnExecZerar.addEventListener("click", ExecutarCronometroCrescente);

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

            ToggleCronometro();
            $btnExecZerar.innerHTML = "Zerar"
        }
        else {
            for (let i = 0; i < IdCronometro.length; i++) {
                clearInterval(IdCronometro[i]);
            }
            setTimeout(() => {
                ZerarTempo();
                limparRegistro();
            }, 5000);
            $btnExecZerar.innerHTML = "Executar";
            ToggleCronometro();
            formatarNumeros();
        }

    }

    $btnLimpar.addEventListener("click", limparRegistro);

    function limparRegistro(){
        registro.innerHTML = "";
        idReg = 0;
    }

    function ZerarTempo() {
        seg = 0;
        min = 0;
        hr = 0;
        mil = 0;
        formatarNumeros();
    }

    let idReg = 0;
    $btnRegistrar.addEventListener("click", () => {
        
        if ($cro_cres.innerHTML !== "00:00:00_00") {
            idReg++;
            registro.innerHTML += `${idReg} - ${formatarNumeros()}  ${'<br>'}`;
        }
    });

    function ToggleCronometro() {
        return executouCron = !executouCron;
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

        return $cro_cres.innerHTML = `${hr}:${min}:${seg}_${mil}`
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