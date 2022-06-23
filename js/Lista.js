const doc = document;
const ls = localStorage;

class Lista {
    constructor(template, fragment, ul, cantidad) {
        this.template = template;
        this.fragment = fragment;
        this.cantidaDeTareasDejadas = 0;
        this.ul = ul;
        this.cantidad = cantidad;


    }

    crearTarea(form) {
        const $form = doc.getElementById(form),
            frag = this.fragment;
        $form.addEventListener('keydown', (event) => {
            if (event.code === 'Enter' && !event.target.value !== true || event.code === 'Ir') {
                event.preventDefault();
                let tarea = event.target.value;
                const template = this.template;
                template.querySelector('#ul-li');
                template.querySelector('#accion');
                template.querySelector('#texto').textContent = tarea;
                let $copi = doc.importNode(template, true);
                frag.appendChild($copi);
                $form.reset();

                this.ul.appendChild(frag);
                this.contarLasListasDejadas(this.ul.firstElementChild);

                let texto = this.ul.lastElementChild.children[1];

                this.guardarTexto(texto.textContent);

            }

        });
    }

    finalizarTarea(event) {
        event.target.classList.toggle('ul-li__acciones-active');
        event.target.nextElementSibling.classList.toggle('ul-li__p-active');
        event.target.nextElementSibling.classList.toggle('p-color');

        this.reducirlasListasDejadas(event.target)
    }

    eliminar(event) {
        let li = event.path[1];
        this.ul.removeChild(li);
        this.reducirPorEliminacion(event);
    }

    eleminarLosCompletados() {

        const $li = this.ul.querySelectorAll(`li #accion`);
        $li.forEach(i => {
            if (i.classList.contains('ul-li__acciones-active')) {
                this.ul.removeChild(i.parentNode);
                this.cantidaDeTareasDejadas = 0;
            }
        });
    }

    contarLasListasDejadas(li) {
        let btn = li.querySelector('button');
        if (!btn.classList.contains('ul-li__acciones-active')) {
            this.cantidaDeTareasDejadas++;
        }
        this.cantidad.innerHTML = this.cantidaDeTareasDejadas;
    }

    reducirlasListasDejadas(event) {
        if (this.cantidaDeTareasDejadas < 0) {

            this.cantidaDeTareasDejadas = 0;
        }
        if (event.classList.contains('ul-li__acciones-active')) {

            this.cantidaDeTareasDejadas--;
        }

        if (!event.classList.contains('ul-li__acciones-active')) {

            this.cantidaDeTareasDejadas++;
        }
        this.cantidad.innerHTML = this.cantidaDeTareasDejadas;
    }

    reducirPorEliminacion(event) {

        if (this.cantidaDeTareasDejadas < 0) {

            this.cantidaDeTareasDejadas = 0;
        }
        let btn = event.path[1].firstElementChild;

        if (!btn.classList.contains('ul-li__acciones-active')) {
            this.cantidaDeTareasDejadas--;
            this.cantidad.innerHTML = this.cantidaDeTareasDejadas;
        }
    }

    mostrarListaGuardada() {
        doc.addEventListener('DOMContentLoaded', () => {
            const tarea = localStorage.getItem('tareas');
            const tareas = JSON.parse(tarea);

            if (tareas !== null) {

                tareas.forEach(i => {
                    this.template.querySelector('#ul-li');
                    this.template.querySelector('#accion');
                    this.template.querySelector('#texto').textContent = i;
                    let $copi = doc.importNode(this.template, true);

                    this.fragment.appendChild($copi);
                    this.ul.appendChild(this.fragment);

                });
            }

        });
    }

    guardarTexto(texto) {



        /*        this.tareas.push(texto);
       
               ls.setItem('tareas', JSON.stringify(this.tareas));
       
               const vecto = JSON.parse(this.almacenar);
       
               ls.setItem('almacenar', JSON.stringify(vecto));
               const vec2 = JSON.parse(ls.getItem('tareas'));
       
       
               const defi = vecto.concat(vec2);
               ls.setItem('defi', JSON.stringify(defi))
               console.log(defi);
        */

    }

}
export default Lista;
