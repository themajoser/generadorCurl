resultado = [];
token = '';
id = '';

function asociar() {
    document.myForm.curl.addEventListener('click', doCurl);
    document.myForm.api.addEventListener('change', activeInputs);
    document.getElementById('more').addEventListener('click', mostrarMas);
}

function activeInputs() {

    if (document.myForm.api.value == 0 ) {
        document.getElementById('buttons').classList.add("mt-4");
        document.getElementById('cookieGroup').style.display = "none";
        document.getElementById('idGroup').style.display = "none";
    }else{
        document.getElementById('buttons').classList.remove("mt-4");
        document.getElementById('cookieGroup').style.display = "block";
        document.getElementById('idGroup').style.display = "block";
    }
    if (document.myForm.api.value == 7 ) {
        if (document.getElementById('apiUser').style.display = "none" ) {
        document.getElementById('apiUser').style.display = "block";
        }else{
        document.getElementById('apiUser').style.display = "none";
        }
    }
}
function mostrarMas() {
    if(document.getElementById('avanzados').style.display != "block"){
        document.getElementById('avanzados').style.display = "block";
    }else{
        document.getElementById('avanzados').style.display = "none";
    }
}


    


function doCurl() {
    
    cookie = '';
    api = document.myForm.api.value;
    token = document.getElementById('token').value;
    id = document.getElementById('id').value;
    apiUser = document.myForm.apiUser.value;
    entorno=document.myForm.entorno.value;
    destino=document.myForm.destino.value;
    tamanio = resultado.length;
    check = validar(api, 3) * //Valida que se haya seleccionado la api
        validar(token, 1) *  //Valida el token
        validar(entorno, 4)* //Comprueba el entorno
        validar(destino, 5); //Comprueba el destino
   

    if (check == true) {

        cookie = document.getElementById('Cookie').value;
        token2 = replace2(token, '\u003d');
        token2 = replace2(token2, '\u0026');
        validacion=false;

        switch (api) {
            case '0':
                copyToClipboard(token2);
                resultado.push({'curl': token2, 'titulo': 'Token', 'hora': new Date()});
                validacion=true;
                break;
            case '1':
                curl= curlString("procesoInicial");
                copyToClipboard(curl);
                resultado.push({'curl': curl, 'titulo': 'Proceso inicial', 'hora': new Date()});
                validacion=true;
                break;
            case '2':
                if (validar(cookie, 2)) {
                    curl= curlString("misLineas");
                    copyToClipboard(curl);
                    resultado.push({'curl': curl, 'titulo': 'Mis Lineas', 'hora': new Date()});
                    validacion=true;
                }
                break;
            case '3':
                if (validar(cookie, 2)) {
                    curl= curlString("misLineasV2");
                    copyToClipboard(curl);
                    resultado.push({'curl': curl, 'titulo': 'Mis LineasV2', 'hora': new Date()});
                    validacion=true;
                }
                break;
            case '4':
                if (validar(cookie, 2)) {
                    curl= curlString("misDatos");
                    copyToClipboard(curl);
                    resultado.push({'curl': curl, 'titulo': 'Mis Datos', 'hora': new Date()});
                    validacion=true;
                }
            case '5':
                if (validar(cookie, 2)) {
                    curl=curlString('todosMisConsumos/linea/');
                    copyToClipboard(curl);
                    resultado.push({'curl': curl, 'titulo': 'Todos Mis Consumos', 'hora': new Date()});
                    validacion=true;
                }
                break;
            case '7': //Otra
                if (apiUser == '' || apiUser == null) {
                    alert('Debes de especificar una api');
                    validacion = false;
                }else{
                   
                    curl= curlString(apiUser);
                    copyToClipboard(curl);
                    resultado.push({'curl': curl, 'titulo': apiUser, 'hora': new Date()});
                    validacion=true;
                }
                break;
        }

        if(validacion){
        mostrarEnElHistorial(resultado);
        } 
    }
    }




function mostrarEnElHistorial(texto) {

    ultimoElemento=texto.length-1;
    before=document.getElementById('resultado').innerHTML;
    resultadoPantalla =  " <div style='border-radius:20px;'  class='card card-stretch mt-2 mb-2 rounded-5 fadein '>"+
    " <small class='text-right pr-5'>" + texto[ultimoElemento]['hora'].toTimeString().split(' ')[0] + "</small>"+
      " <div class='card-body '>" + "<small class='copiado'>Copiado</small><h1 class='fw-bolder text-dark fs-3'>" + texto[ultimoElemento]['titulo'] + "</h1>  <span onClick='copyCurl(event)'  class='fw-bold text-gray-800 ps-3'>" +
      texto[ultimoElemento]['curl']+ "</span> </div> </div>";
    document.getElementById('resultado').innerHTML=resultadoPantalla+before;
    //Animación de aparecer
    jQuery(".fadein").eq(0).hide();
    jQuery(".fadein").eq(0).fadeIn("slow");

    //Cambia color cuando pasas por encima
    $(".fadein").hover( function() {
       
        $(this).css('background-color', '#89b9e41f');
        },function () {
            $(this).css('background-color', '#687a78');
        });

         //Función de copiado
        $(".fadein").click( function() {
           
           if(!  $(this).find("small .copiado").is(":visible")){
            $(this).find(".copiado").css('display', 'block');
            navigator.clipboard.writeText($(this).find(".ps-3").get(0).innerHTML);
            //Animación de rebote
            $(this).addClass("animate__animated animate__bounceIn");
            $(this).delay(1000).queue(function() {  // Wait for 1 second.
                $(this).removeClass("animate__animated animate__bounceIn").dequeue();
            });
                }    
           
           });   
}

document.addEventListener("DOMContentLoaded", asociar);




function copyToClipboard(texto) {
    const el = document.createElement("textarea");
    el.value = 'texto';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    navigator.clipboard.writeText(texto);
    el.value = '';
    el.hidden = true;
}

function clean() {
    $(".fadein").addClass("animate__animated animate__fadeOutRight")
    $(".fadein").delay(1000).queue(function() {  // Wait for 1 second.
        $("div#resultado").text("");
    });
    resultado = [];
}
function copyCurl(event){
    objeto=event.target.attributes.onclick.ownerElement.innerHTML;
    navigator.clipboard.writeText(objeto);
}

function mostrarEnElHistorial(texto) {

        ultimoElemento=texto.length-1;
        before=document.getElementById('resultado').innerHTML;
        resultadoPantalla =  " <div style='border-radius:20px;'  class='card card-stretch mt-2 mb-2 rounded-5 fadein '>"+
        " <small class='text-right pr-5'>" + texto[ultimoElemento]['hora'].toTimeString().split(' ')[0] + "</small>"+
          " <div class='card-body '>" + "<small class='copiado'>Copiado</small><h1 class='fw-bolder text-dark fs-3'>" + texto[ultimoElemento]['titulo'] + "</h1>  <span onClick='copyCurl(event)'  class='fw-bold text-gray-800 ps-3'>" +
          texto[ultimoElemento]['curl']+ "</span> </div> </div>";
        document.getElementById('resultado').innerHTML=resultadoPantalla+before;
        //Animación de aparecer
        jQuery(".fadein").eq(0).hide();
        jQuery(".fadein").eq(0).fadeIn("slow");

        //Cambia color cuando pasas por encima
        $(".fadein").hover( function() {
            $(this).css('background-color', '#89b9e41f');
            },function () {
                $(this).css('background-color', '#687a78');
        });

            $(".fadein").click( function() {
                //Función de copiado
               if(!  $(this).find("small .copiado").is(":visible")){
                $(this).find(".copiado").css('display', 'block');
                $(this).find(".ps-3").val();
                navigator.clipboard.writeText($(this).find(".ps-3").get(0).innerHTML);
                //Animación de rebote
                $(this).addClass("animate__animated animate__bounceIn");
                $(this).delay(1000).queue(function() {  // Wait for 1 second.
                    $(this).removeClass("animate__animated animate__bounceIn").dequeue();
                });
                    }    
               
               });   
}

function validar(value, input) {
    valido = true;
    switch (input) {
        case 1: //token
            if (value == '' || value == null) {
                alert('Debes de especificar un token');
                valido = false;
            }
            break;
        case 2: //cookie
            if (value == '' || value == null) {
                alert('Debes de especificar una cookie');
                valido = false;
            }
            break;
        case 3: //api
            if (value < 0 || value == null) {
                alert('Debes de especificar una api');
                valido = false;
            }
            break;
        case 4: //entorno
            if (value == '' || value == null) {
                alert('Debes de especificar un entorno');
                valido = false;
            }
            break;
        case 5: //destino
            if (value == '' || value == null) {
                alert('Debes de especificar un destino');
                valido = false;
            }
            break;

    }
    return valido;
}

function replace2(datos, regex) {
    var result = '';
    if (regex === '\u003d') { //=
        chars = datos.split(/\\u003d/g);
        result = chars.join('=')

    } else if (regex === '\u0026') { //&
        chars = datos.split(/\\u0026/g);
        result = chars.join('&')
    }
    return result;
}