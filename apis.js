function curlString( api){
  
    entorno=document.myForm.entorno.value;
    destino=document.myForm.destino.value;
    unix=new Date().getTime().toString();
    parametrosValue=document.myForm.parametros.value;
    if(parametrosValue==""){
        uid="?uniqueUID=";
        parametros="";
    }else{
        parametros="?"+parametrosValue;
        uid="&uniqueUID=";
    }
    uid+=document.getElementById("id").value==""?+unix:document.getElementById("id").value;
    if(api==''){
        return token2;
    }
   
    if(destino=='API'){
        if(api=='procesoInicial'){
            curl1 = ' curl -v -H "X-XSRF-TOKEN:' + token2 + '" -X GET ';
            switch(entorno){
                case "integracion":
                    curl1+="http://tehol001.prod.inte:31020/ccli/OperCon/service/privado/api/procesoInicial"+uid;
                    break;
                case "certificacion":
                    curl1+="http://b0wappccli.serv.test.dc.es.telefonica/tme-ccli-presentacion-web/service/api/procesoInicial"+uid;
                    break;
                case "muleto":
                    curl1+="http://bointeg.srv.osi:31020/cclimuleto/OperCon/service/privado/api/procesoInicial"+uid;
                    break;
                case "produccion":
                        curl1+="http://bointeg.srv.osi:31020/cclimuleto/OperCon/service/privado/api/procesoInicial"+uid;
                        break;
            }
        }else{
            curl1 = ' curl -v -H  "X-XSRF-TOKEN:' + token2 + '" --cookie \'' + cookie + '\'' + ' -X GET ';
            api=api+parametros;
            switch(entorno){
                case "integracion":
                    curl1+="http://tehol366.serv.dev.dc.es.telefonica:10010/tme-ccli-presentacion-web/service/api/"+api+uid;
                    break;
                case "certificacion":
                    curl1+="http://b0wappccli.serv.test.dc.es.telefonica/tme-ccli-presentacion-web/service/api/"+api+uid;
                    break;
                case "muleto":
                    curl1+="http://b0wappcclimuleto.serv.dc.es.telefonica/tme-ccli-presentacion-web/service/api/"+api+uid;
                    break;
                    case "produccion":
                        curl1+="http://bointeg.srv.osi:31020/cclimuleto/OperCon/service/privado/api/procesoInicial"+uid;
                        break;
                
            }

        }
    }
    if(destino=='BUS'){
        if(api=='procesoInicial'){
            curl1 = ' curl -v -H "X-XSRF-TOKEN:' + token2 + '" -X GET ';
            switch(entorno){
                case "integracion":
                    curl1+="http://tehol001.prod.inte:31020/ccli/OperCon/service/privado/api/procesoInicial"+uid;
                    break;
                case "certificacion":
                    curl1+="http://b0wappccli.serv.test.dc.es.telefonica/tme-ccli-presentacion-web/service/api/procesoInicial"+uid;
                    break;
                case "muleto":
                    curl1+="http://bointeg.srv.osi:31020/cclimuleto/OperCon/service/privado/api/procesoInicial"+uid;
                    break;
                case "produccion":
                    curl1+="http://bointeg.srv.osi:31020/cclimuleto/OperCon/service/privado/api/procesoInicial"+uid;
                    break;
            }
        }else{
            api=api+parametros;
            curl1 = ' curl -v -H  "X-XSRF-TOKEN:' + token2 + '" --cookie \'' + cookie + '\'' + ' -X GET ';
            switch(entorno){
                case "integracion":
                    curl1+="http://tehol001.prod.inte:31020/CCLI_OR_PRJ/"+api+uid;
                    break;
                case "certificacion":
                    curl1+="http://tehol003.prod.cert:31020/CCLI_OR_PRJ/"+api+uid;
                    break;
                case "muleto":
                    curl1+="http://bointeg.srv.osi:31020/CCLI_OR_PRJ/cclimuleto/"+api+uid;
                    break;
                case "produccion":
                    curl1+="http://bointeg.srv.osi:31020/CCLI_OR_PRJ/cclimuleto/"+api+uid;
                    break;
            }

        }
       
    }

    return curl1;

}
