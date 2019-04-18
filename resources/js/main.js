$(function() {

    //mascaras para validar la entrada de texto acorde a lo que necesitemos
    Inputmask.extendDefinitions({
        'X': {
            validator: "[A-Za-z ]",
            cardinality: 1,
            casing: "upper" //auto uppercasing
        }
    });

    //mascara para ingresar solo texto
    Inputmask.extendAliases({
        'texto': {
            autoUnmask: true,
            placeholder: "",
            repeat: 50,
            mask: "A"
        }
    });

    //mascara para ingresar solo numeros de telefono con el formato dado
    Inputmask.extendAliases({
        'telefono': {
            autoUnmask: true,
            mask: "(9999)-9999999"
        }
    });

    //mascara para introducir solo numeros
    Inputmask.extendAliases({
        'numeric': {
            autoUnmask: true,
            placeholder: "",
            numericInput: true,
            repeat: 50,
            mask: "9"
        }
    });

    //inicializamos las mascaras en los input que lo usaran
    $(":input").inputmask();

    bs_input_file();

});


//funcion para mostrar alert
function sweetalert(message, type, target){

    Swal.fire({
        text: message,
        type: type,
        allowOutsideClick: false,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#343a40',
        target: document.getElementById(target)
    });

}

function generateSelect(etiqueta, datos, dato){

    var select = '<option value="">Seleccione</option>';

    $.each(datos, function(key, val){

        if(val.Valor==dato){
            select+="<option value='" + val.Valor + "' selected>" + val.Nombre + "</option>";
        }else{
            select+="<option value='" + val.Valor + "'>" + val.Nombre + "</option>";
        }

    });

    $(etiqueta).html(select);

}

function bs_input_file(){

    $(".input-file").before(

        function() {
            if ( ! $(this).prev().hasClass('input-ghost') ) {
                var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
                element.attr("name",$(this).attr("name"));
                element.change(function(){
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                });
                $(this).find("button.btn-choose").click(function(){
                    element.click();
                });
                $(this).find("button.btn-reset").click(function(){
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                $(this).find('input').css("cursor","pointer");
                $(this).find('input').mousedown(function() {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;
            }
        }
    );
}

function showPreview (element, tag) {
    var file = element.files[0];
    var preview = document.getElementById(tag);
    var fr = new FileReader();

    fr.addEventListener("load", function () {
        preview.src = fr.result;
    });

    if (file) {
        fr.readAsDataURL(file);
    }
}

function getRandomNumber(low, high) {
    var r = Math.floor(Math.random() * (high - low + 1)) + low;
    return r;
}
