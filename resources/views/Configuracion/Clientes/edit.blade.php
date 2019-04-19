@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-user-tie page-header-heading-icon"></i>Editar Cliente</h1>
@endsection

@section('content')

    <div class="col-lg-12">

        <div class="widget widget-default">

            <div class="widget-body">

                @if($existe)

                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="pills-datos-tab" data-toggle="pill" href="#pills-datos" role="tab" aria-controls="pills-datos" aria-selected="true">Datos</a>
                        </li>

                    </ul>

                    <hr class="line-gray"/>

                    <form id="form-edit-cliente" class="form-change-password form" enctype="multipart/form-data">

                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">

                                <input type="hidden" id="cliente-id" name="cliente-id" value="{{(string)$cliente->_id}}">

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Nombre</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$cliente->Nombre}}" id="cliente-nombre" name="cliente-nombre" placeholder="Ingrese el nombre">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Apellido</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$cliente->Apellido}}" id="cliente-apellido" name="cliente-apellido" placeholder="-">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Correo</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$cliente->Correo}}" id="cliente-correo" name="cliente-correo" placeholder="Ingrese el correo">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Fecha de Nacimiento</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$cliente->Edad ? $cliente->Edad : '-' }}" id="cliente-fn" name="cliente-fn" placeholder="-">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Sexo</label>
                                    <div class="col-sm-4">

                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" value="m" id="customRadioInline1" name="cliente-sexo"  {{ ($cliente->Sexo=='m')? "checked" : "" }} class="custom-control-input">
                                            <label class="custom-control-label" for="customRadioInline1">Masculino</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio"  value="f" id="customRadioInline2" name="cliente-sexo"  {{ ($cliente->Sexo=='f')? "checked" : "" }} class="custom-control-input">
                                            <label class="custom-control-label" for="customRadioInline2">Femenino</label>
                                        </div>

                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Teléfono</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$cliente->Telefono == '' ? '-' : $cliente->Telefono }}" id="cliente-telefono" name="cliente-telefono" placeholder="-">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">País</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="cliente-pais" name="cliente-pais" >
                                            @foreach($paises as $pais)
                                                <option value="{{ $pais->_id }}" @if((string)$cliente->Pais_id == $pais->_id) selected='selected' @endif>{{ $pais->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Equipo</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="cliente-equipo" name="cliente-equipo" >
                                            @foreach($equipos as $equipo)
                                                <option value="{{ $equipo->id }}" @if($cliente->Equipo == $equipo->id) selected='selected' @endif>{{ $equipo->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Cuenta</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$cliente->TipoCuenta}}" id="cliente-cuenta" name="cliente-cuenta" placeholder="Ingrese el tipo de cuenta" disabled>
                                    </div>
                                </div>


                            </div>

                        </div>

                        <div class="form-group row">
                            <div class="col-sm-4">
                                <button type="button" id="update-cliente" class="btn btn-sm btn-dark mr-2">Guardar</button>

                                <a href="{{ route('configuracion.cliente') }}"><button type="button" class="btn btn-sm btn-dark">Volver</button></a>
                            </div>
                        </div>

                    </form>

                @else

                    <div class="alert alert-danger mb-4" role="alert">
                        <i class="fas fa-info-circle"></i>&nbsp;No existe cliente.
                    </div>

                @endif

            </div>

        </div>

    </div>

@endsection

@section('javascript')

    <script type="text/javascript">

        $(function(){

            var linkReturn = "{{ route('configuracion.cliente') }}";

            $('#cliente-fn').datetimepicker({
                format: 'DD/MM/YYYY'
            });

            $("#update-cliente").on("click",function(){

                let formData = new FormData();

                formData.append("cliente-id", $('#form-edit-cliente input[name=cliente-id]').val());
                formData.append("cliente-nombre", $('#form-edit-cliente input[name=cliente-nombre]').val());
                formData.append("cliente-apellido", $('#form-edit-cliente input[name=cliente-apellido]').val());
                formData.append("cliente-correo", $('#form-edit-cliente input[name=cliente-correo]').val());
                formData.append("cliente-fn", $('#form-edit-cliente input[name=cliente-fn]').val());
                formData.append("cliente-sexo", $('input[name=cliente-sexo]:checked', '#form-edit-cliente').val());
                formData.append("cliente-telefono", $('#form-edit-cliente input[name=cliente-telefono]').val());
                formData.append("cliente-cuenta", $('#form-edit-cliente input[name=cliente-cuenta]').val());
                formData.append("cliente-pais", $('#form-edit-cliente select[name=cliente-pais]').val());
                formData.append("cliente-equipo", $('#form-edit-cliente select[name=cliente-equipo]').val());

                $.ajax({
                    type: 'POST',
                    url: '../ajax-cliente-update',
                    data: formData,
                    //dataType: 'json',
                    contentType: false,
                    cache: false,
                    processData:false,
                    beforeSend: function(){
                        $('button#update-cliente').prepend('<i class="fa fa-spinner fa-spin"></i> ');
                    },
                    success: function(json){

                        $('button#update-cliente').find('i.fa').remove();

                        if(json.code === 200) {

                            Swal.fire({
                                text: "Cliente editado exitosamente",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#343a40",
                                confirmButtonText: "OK",
                                target: document.getElementById('sweet')
                            }).then((result) => {

                                if (result.value) {
                                    window.location.href = linkReturn;
                                }

                            });

                        }else if(json.code === 500){
                            sweetalert('Error al editar cliente. Consulte al Administrador.', 'error', 'sweet');
                        }
                    },
                    error: function(json){

                        $('button#update-cliente').find('i.fa').remove();

                        if(json.status === 422){
                            let errors = json.responseJSON;
                            sweetalert(errors, 'error', 'sweet');
                        }
                    }
                });
            });


            $('#cliente-pais').on('change', function(){

                var pais = $(this).val();

                if(pais){

                    $.ajax({
                        url: '../ajax/equipos/'+pais,
                        type: "GET",
                        dataType: "json",
                        success:function(data){

                            $('#cliente-equipo').empty();

                            var select = '<option value="">Seleccione</option>';

                            $.each(data, function(key ,value){
                                select +='<option value="'+value.id+'">'+value.Nombre+'</option>';
                            });

                            $("#cliente-equipo").html(select);

                        }
                    });

                }else{
                    $('#cliente-equipo').empty();
                }

            });


        });


    </script>

@endsection
