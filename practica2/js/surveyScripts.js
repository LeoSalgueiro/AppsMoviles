


async function ocultar(data){
    let valorActual = document.getElementsByClassName('slider').item(0).value
    let cambiar = document.getElementsByClassName('slider').item(0)
    
    
    if(valorActual == '1'){
        let valorAnterior =  document.getElementById('myRange').getAttribute("value")
        let infoanterior = document.getElementById('valoration-'+valorAnterior)
        let infodelcambiar = document.getElementById('valoration-'+valorActual)
        
        document.getElementById('myRange').setAttribute("value", "1");

        infoanterior.hidden = true;
        infodelcambiar.hidden = false;
        
    }
    if(valorActual == '2'){
        
        let valorAnterior =  document.getElementById('myRange').getAttribute("value")
        let infoanterior = document.getElementById('valoration-'+valorAnterior)
        let infodelcambiar = document.getElementById('valoration-'+valorActual)
        
        document.getElementById('myRange').setAttribute("value", "2");

        infoanterior.hidden = true;
        infodelcambiar.hidden = false;
    }
    if(valorActual == '3'){
        
        let valorAnterior =  document.getElementById('myRange').getAttribute("value")
        let infoanterior = document.getElementById('valoration-'+valorAnterior)
        let infodelcambiar = document.getElementById('valoration-'+valorActual)
        
        document.getElementById('myRange').setAttribute("value", "3");

        infoanterior.hidden = true;
        infodelcambiar.hidden = false;
    }
    if(valorActual == '4'){
        let valorAnterior =  document.getElementById('myRange').getAttribute("value")
        let infoanterior = document.getElementById('valoration-'+valorAnterior)
        let infodelcambiar = document.getElementById('valoration-'+valorActual)
        
        document.getElementById('myRange').setAttribute("value", "4");

        infoanterior.hidden = true;
        infodelcambiar.hidden = false;
    }
    
    if(valorActual == '5'){
        let valorAnterior =  document.getElementById('myRange').getAttribute("value")
        let infoanterior = document.getElementById('valoration-'+valorAnterior)
        let infodelcambiar = document.getElementById('valoration-'+valorActual)
        
        document.getElementById('myRange').setAttribute("value", "5");

        infoanterior.hidden = true;
        infodelcambiar.hidden = false;
    }


}


