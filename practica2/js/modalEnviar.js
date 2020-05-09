// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    if(enviar()){
        modal.style.display = "block";
    }
    else{
        alert("No has validado bien")
       //"podriamos mostrar alguna alerta con algun error (opcional). expReg ya solucionan esto
    }
    
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
    // start validations

    let genero = document.getElementById('gender').children
    let opcion = '';
    for (let index = 0; index < genero.length; index++) {
        const element = genero[index].selected;
        if(element===true){
            opcion = genero[index].textContent;

            if(opcion === 'Seleccione su genero'){
                opcion='No especificado'
                todoOK = false;
            }
        }
        
    }

    
    let nombre = document.getElementById('firstname').value;
    let apellido = document.getElementById('lastname').value;
    let fecha = document.getElementById('birthdate').value;
    let email = document.getElementById('email').value;

    //responses
    
    let respuestaNombre = validarNombre(nombre)
    let respuestaApellido = validarApellido(apellido)
    let respuestaFecha = validarFecha(fecha)
    let respuestaMail = validarEmail(email)

    if(respuestaNombre.validado & respuestaApellido.validado & respuestaFecha.validado & respuestaMail.validado){
        console.log("entro aca")
        todoOK = true; //if all validations are ok, porceed to show modal information
    }
    else{
        if(!respuestaNombre.validado){
            document.getElementById('firstname').setAttribute('placeholder', respuestaNombre.mensaje)         
        }
        if(!respuestaApellido.validado){
            document.getElementById('lastname').setAttribute('placeholder', respuestaApellido.mensaje)
        }
        if(!respuestaFecha.validado){
            document.getElementById('birthdate').setAttribute('placeholder', respuestaFecha.mensaje)
        }
        if(!respuestaMail.validado){
            document.getElementById('email').setAttribute('placeholder', respuestaMail.mensaje)
        }
    }

    let datos = {
        nombre: nombre,
        apellido: apellido,
        fecha: fecha,
        genero: opcion,
        valoracion: document.getElementById('valoration-'+document.getElementById('myRange').value).textContent,
        email: email,
        comentario: document.getElementById('comment').value
    }
    
    if(!todoOK){
        console.log("no validaste bien")
        return false
    }
    else {
        var capa = document.getElementById("informationModal");
        //make the elements p from the modal
        var nombreModal = document.createElement("p");
        var apellidoModal = document.createElement("p");
        var fechaModal = document.createElement("p");
        var generoModal = document.createElement("p");
        var valoracionModal = document.createElement("p");
        var emailModal = document.createElement("p");
        var commentModal = document.createElement("p");

        //add the info to p elements
        nombreModal.innerHTML = "Nombre: " + datos.nombre;
        apellidoModal.innerHTML = "Apellido: " + datos.apellido;
        fechaModal.innerHTML = "Fecha de Nacimiento: " + datos.fecha;
        generoModal.innerHTML = "Género: " + datos.genero;
        valoracionModal.innerHTML = "Valoración: " + datos.valoracion;
        emailModal.innerHTML = "Email: " + datos.email;
        commentModal.innerHTML = "Comentario: " + datos.comentario;

        //add the nodes with the info from the modal at dom, i don't kwon why put name's capa jajaja
        capa.appendChild(nombreModal);
        capa.appendChild(apellidoModal);
        capa.appendChild(fechaModal);
        capa.appendChild(generoModal);
        capa.appendChild(valoracionModal);
        capa.appendChild(emailModal);
        capa.appendChild(commentModal);
        return true;
    }
    

  
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

//expresiones regulares, validations

function validarEmail(email) {
    var reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/
    let res = {
        mensaje: "",
        validado: false

    }
	if (reg.test(email)){
        res.mensaje = "ok"
        res.validado = true
		return res
	} else {
        
        if(email === ""){
            res.mensaje = "Complete este campo (obligatorio)"
        }
        else{
            res.mensaje = "Formato de email incorrecto"
        }

        res.validado = false
		return res;
	}
}

function validarNombre(nombre) {
    var reg = /^[a-zA-Z]+[a-zA-Z]+$/;
    let res = {
        mensaje: "",
        validado: false

    }
	if (reg.test(nombre))
    {
        res.mensaje = "ok"
        res.validado = true
		return res
	} else {
        if(nombre === ""){
            res.mensaje = "Complete este campo (obligatorio)"
        }
        else{
            res.mensaje = "Formato de nombre incorrecto, solo se permiten caracteres [A-Z,a-z]"
        }
        res.validado = false
		return res;
	}
}
function validarApellido(apellido) {
    var reg = /^[a-zA-Z]+[a-zA-Z]+$/;
    let res = {
        mensaje: "",
        validado: false

    }
	if (reg.test(apellido)){
        res.mensaje = "ok"
        res.validado = true
		return res
	} else {
        if(apellido === ""){
            res.mensaje = "Complete este campo (obligatorio)"
        }
        else{
            res.mensaje = "Formato de apellido incorrecto, solo se permiten caracteres [A-Z,a-z]"
        }
        res.validado = false
		return res;
	}
}

function validarFecha(fecha) {
    var reg = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    let res = {
        mensaje: "",
        validado: false

    }
	if (reg.test(fecha)){
        res.mensaje = "ok"
        res.validado = true
		return res
	} else {
        if(fecha === ""){
            res.mensaje = "Complete este campo (obligatorio)"
        }
        else{
            res.mensaje = "Formato de fecha incorrecto, debe ingresar una fecha valida en formato dd/mm/aaaa"
        }
        res.validado = false
		return res;
	}
}

