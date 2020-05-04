// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    enviar();
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {

    modal.style.display = "none";
    limpiar()


}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    
    modal.style.display = "none";
    limpiar()
  }
  
}

function enviar(){

    let juego = document.getElementById('gender').children
    let opcion = '';
    for (let index = 0; index < juego.length; index++) {
        const element = juego[index].selected;
        if(element===true){
            opcion = juego[index].textContent;

            if(opcion === 'Seleccione su genero'){
                opcion='No especificado'
            }
        }
        
    }


    let datos = {
        nombre: document.getElementById('firstname').value,
        apellido: document.getElementById('lastname').value,
        fecha: document.getElementById('birthdate').value,
        genero: opcion,
        valoracion: document.getElementById('valoration-'+document.getElementById('myRange').value).textContent,
        email: document.getElementById('email').value,
        comentario: document.getElementById('comment').value
    }
    
    var capa = document.getElementById("informationModal");
    //creo los elementos p para el modal
    var nombreModal = document.createElement("p");
    var apellidoModal = document.createElement("p");
    var fechaModal = document.createElement("p");
    var generoModal = document.createElement("p");
    var valoracionModal = document.createElement("p");
    var emailModal = document.createElement("p");
    var commentModal = document.createElement("p");

    //agrego la info a los elementos p creados
    nombreModal.innerHTML = "Nombre: " + datos.nombre;
    apellidoModal.innerHTML = "Apellido: " + datos.apellido;
    fechaModal.innerHTML = "Fecha de Nacimiento: " + datos.fecha;
    generoModal.innerHTML = "Género: " +datos.genero;
    valoracionModal.innerHTML ="Valoración: " + datos.valoracion;
    emailModal.innerHTML = "Email: " + datos.email;
    commentModal.innerHTML = "Comentario: " + datos.comentario;

    //agrego los nodos con la info del modal al dom, se llama capa quien sabe porque jajajaja
    capa.appendChild(nombreModal);
    capa.appendChild(apellidoModal);
    capa.appendChild(fechaModal);
    capa.appendChild(generoModal);
    capa.appendChild(valoracionModal);
    capa.appendChild(emailModal);
    capa.appendChild(commentModal);

  
}

function cancelar(){
    // Get the modal
    var modal2 = document.getElementById('id01');
    console.log(modal2)

    modal2.style.display = "block"
// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal2) {
            modal2.style.display = "none";
        }
    }


}

function optionNo(){
    var modal2 = document.getElementById('id01');
    modal2.style.display = "none";
}

function limpiar(){
    var info = document.getElementById('informationModal').children
    while(info.length > 0){
        for (let index = 0; index < info.length; index++) {
            const element = info[index];
            element.replaceWith('')
        }
    }
 
}

function limpiarFormulario() {
    document.getElementById("survey").reset();
}