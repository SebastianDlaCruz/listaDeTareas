import Lista from "./Lista.js";

const doc = document,
    ls = localStorage;
const $template = doc.getElementById('template').content,
    $fragment = doc.createDocumentFragment(),
    $ul = doc.getElementById('ul'),
    $cantidad = doc.getElementById('cantidad');

const NuevaLista = new Lista($template, $fragment, $ul, $cantidad);



const terminarTarea = () => {
    $ul.addEventListener('click', (event) => {
        if (event.target.matches(`#accion`)) {
            NuevaLista.finalizarTarea(event);
        }

    })
}
const eliminarTarea = () => {
    $ul.addEventListener('click', (event) => {
        if (event.target.matches(`#eliminar`)) {
            NuevaLista.eliminar(event, $ul);
        }
    });
}

const clearCompleted = (clear) => {
    const $clear = doc.getElementById(clear);
    $clear.addEventListener('click', (event) => {

        NuevaLista.eleminarLosCompletados();
    });
}


const modoClaro = () => {
    const $dataTema = doc.querySelectorAll('[data-tema]'),
        $body = doc.getElementById('body'),
        $headerImg = doc.getElementById('header-img');
    $body.classList.add('body-blanco');
    $headerImg.classList.add('header-img-active');
    $dataTema.forEach(i => i.classList.add('cambio-de-tema'))
    ls.setItem('tema', 'claro');
}

const modoOscuro = () => {
    const $dataTema = doc.querySelectorAll('[data-tema]'),
        $body = doc.getElementById('body'),
        $headerImg = doc.getElementById('header-img');

    if ($body.classList.contains('body-blanco')) {
        $body.classList.remove('body-blanco');
        $headerImg.classList.remove('header-img-active');
        $dataTema.forEach(i => i.classList.remove('cambio-de-tema'))
    }

    ls.setItem('tema', 'oscuro');
}

const cambiarTema = (canbiarTema) => {
    const $cambiarTema = doc.getElementById(canbiarTema);

    $cambiarTema.addEventListener('click', (event) => {

        if ($cambiarTema.classList.contains('header-contenedor__btn--blanco')) {
            $cambiarTema.classList.remove('header-contenedor__btn--blanco');
            modoOscuro();
        } else {
            $cambiarTema.classList.add('header-contenedor__btn--blanco');
            modoClaro();
        }
    });
};


const filtrar = (data) => {

    const $dataBtns = doc.querySelectorAll(data);
    $dataBtns.forEach(i => {
        i.addEventListener('click', (event) => {
            if (event.target.matches(`#active`)) {
                let completed = i.nextSibling.nextSibling,
                    all = completed.previousElementSibling.previousElementSibling;
                completed.classList.remove('btns-active');
                all.classList.remove('btns-active');
                i.classList.add('btns-active');
                const btns = $ul.querySelectorAll(`li #accion`);
                btns.forEach(a => {
                    if (a.classList.contains('ul-li__acciones-active')) {
                        a.parentNode.classList.add('ul-li-active');
                    } else {

                        a.parentNode.classList.remove('ul-li-active');
                    }
                })
            }
            if (event.target.matches(`#completed`)) {
                let active = i.previousSibling.previousSibling,
                    all = active.previousElementSibling;
                active.classList.remove('btns-active');
                all.classList.remove('btns-active');
                i.classList.add('btns-active');
                const btns = $ul.querySelectorAll(`li #accion`);
                btns.forEach(a => {
                    if (!a.classList.contains('ul-li__acciones-active')) {
                        a.parentNode.classList.add('ul-li-active');
                    } else {

                        a.parentNode.classList.remove('ul-li-active');
                    }
                })
            }

            if (event.target.matches(`#all`)) {
                let active = i.nextElementSibling,
                    completed = active.nextElementSibling;
                active.classList.remove('btns-active');
                completed.classList.remove('btns-active');
                i.classList.add('btns-active');
                const btns = $ul.querySelectorAll(`li #accion`);
                btns.forEach(a => a.parentNode.classList.remove('ul-li-active'));
            }

        });
    });
}
NuevaLista.mostrarListaGuardada();
doc.addEventListener('DOMContentLoaded', () => {
    NuevaLista.crearTarea('form', 'ul');
    terminarTarea();
    eliminarTarea();
    clearCompleted('clear');
    cambiarTema('cambiarTema');
    filtrar('[data-btn]');
    if (ls.getItem('tema') === "oscuro") modoOscuro();
    if (ls.getItem('tema') === 'claro') modoClaro();


});