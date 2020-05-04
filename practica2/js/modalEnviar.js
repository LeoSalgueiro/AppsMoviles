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

    let todoOK = false;
    //validar que se ingrese un genero
    let genero = document.getElementById('gender').children
    let opcion = '';
    for (let index = 0; index < genero.length; index++) {
        const element = genero[index].selected;
        if(element===true){
            opcion = genero[index].textContent;

            if(opcion === 'Seleccione su genero'){
                opcion='No especificado'
            }
        }
        
    }

    //validar que se ingrese bien el mail
/*
    let email = document.getElementById('email').value

    if(validarEmail(email)){
        alert("correctamente validado")
    }
    else{
        alert("no se valido")
    }

    let nombre = document.getElementById('firstname').value
    if(validarNombre(nombre)){
        alert("correctamente validado nom")
    }
    else{
        alert("no se valido nom")
    }
*/
    let fecha = document.getElementById('birthdate').value;
    if(validarFecha(fecha)){
        alert("correctamente validado fecha")
    }
    else{
        alert("no se valido fecha")
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

//expresiones regulares, validaciones

function validarEmail(email) {
	if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(email)){
		return (true)
	} else {
		return (false);
	}
}

function validarNombre(nombre) {
    var reg = /^[a-zA-Z]+[a-zA-Z]+$/;
	if (reg.test(nombre))
    {
		return (true)
	} else {
		return (false);
	}
}
function validarApellido(apellido) {
    var reg = /^[a-zA-Z]+[a-zA-Z]+$/;
	if (reg.test(apellido)){
		return (true)
	} else {
		return (false);
	}
}

function validarFecha(fecha) {
    var reg = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
	if (reg.test(fecha)){
		return (true)
	} else {
		return (false);
	}
}