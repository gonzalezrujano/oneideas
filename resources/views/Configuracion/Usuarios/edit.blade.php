@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-user-cog page-header-heading-icon"></i>Editar Usuario</h1>
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

                    <form id="form-add-usuario" class="form-change-password form" enctype="multipart/form-data">

                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">

                                <input type="hidden" id="usuario-id" name="usuario-id" value="{{(string)$usuario->_id}}">

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Tipo Documento</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="tipo-documento" name="tipo-documento">
                                            <option value="">Seleccione</option>
                                            @foreach($tipodocumentos as $td)
                                                <option value="{{ $td->_id }}" @if((string)$usuario->TipoDocumento_id == $td->_id) selected='selected' @endif>{{ $td->TipoDocumento }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>


                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Documento</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$usuario->Documento}}" id="documento" name="documento" placeholder="Ingrese el documento">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Nombre</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$usuario->Nombre}}" id="nombre" name="nombre" placeholder="Ingrese el nombre">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Apellido</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$usuario->Apellido}}" id="apellido" name="apellido" placeholder="Ingrese el apellido">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Correo</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$usuario->Correo}}" id="correo" name="correo" placeholder="Ingrese el correo">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Teléfono</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$usuario->Telefono}}" id="telefono" name="telefono" placeholder="Ingrese el telefono">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">País</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="pais" name="pais">
                                            <option value="">Seleccione</option>
                                            @foreach($paises as $pais)
                                                <option value="{{ $pais->_id }}" @if((string)$usuario->Pais_id == $pais->_id) selected='selected' @endif>{{ $pais->Nombre }}</option>
                                            @endforeach

                                        </select>
                                    </div>
                                </div>


                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Rol</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="rol" name="rol">
                                            <option value="">Seleccione</option>
                                            @foreach($roles as $rol)
                                                <option value="{{ $rol->_id }}" @if((string)$usuario->Rol_id == $rol->_id) selected='selected' @endif>{{ $rol->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>


                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Empresa</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="empresa" name="empresa">
                                            <option value="">Seleccione</option>
                                            @foreach($empresas as $empresa)
                                                <option value="{{ $empresa->_id }}" @if((string)$usuario->Empresa_id == $empresa->_id) selected='selected' @endif>{{ $empresa->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Evento</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="evento" name="evento">
                                            <option value="">Seleccione</option>
                                        </select>
                                    </div>
                                </div>


                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Estado</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="estatus" name="estatus">
                                            <option value="">Seleccione</option>
                                            @foreach($estados as $estado)
                                                <option value="{{ $estado->Valor == true ? 1 : 0 }}" @if($usuario->Activo == $estado->Valor) selected='selected' @endif>{{ $estado->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>


                            </div>

                        </div>

                        <div class="form-group row">
                            <div class="col-sm-4">
                                <button type="button" id="update-usuario" class="btn btn-sm btn-dark mr-2">Guardar</button>

                                <a href="{{ route('configuracion.usuario') }}"><button type="button" class="btn btn-sm btn-dark">Volver</button></a>
                            </div>
                        </div>

                    </form>

                @else

                    <div class="alert alert-danger mb-4" role="alert">
                        <i class="fas fa-info-circle"></i>&nbsp;No existe usuario.
                    </div>

                @endif

            </div>

        </div>

    </div>

@endsection

@section('javascript')

    <script type="text/javascript">

        $(function(){

            var linkReturn = "{{ route('configuracion.usuario') }}";

            $("#update-usuario").on("click",function(){

                let formData = new FormData();

                formData.append("usuario-id", $('#form-add-usuario input[name=usuario-id]').val());
                formData.append("tipo-documento", $('#form-add-usuario select[name=tipo-documento]').val());
                formData.append("documento", $('#form-add-usuario input[name=documento]').val());
                formData.append("nombre", $('#form-add-usuario input[name=nombre]').val());
                formData.append("apellido", $('#form-add-usuario input[name=apellido]').val());
                formData.append("correo", $('#form-add-usuario input[name=correo]').val());
                formData.append("telefono", $('#form-add-usuario input[name=telefono]').val());
                formData.append("pais", $('#form-add-usuario select[name=pais]').val());
                formData.append("rol", $('#form-add-usuario select[name=rol]').val());
                formData.append("empresa", $('#form-add-usuario select[name=empresa]').val());
                formData.append("evento", $('#form-add-usuario select[name=evento]').val());
                formData.append("estatus", $('#form-add-usuario select[name=estatus]').val());

                $.ajax({
                    type: 'POST',
                    url: '../ajax-usuario-update',
                    data: formData,
                    //dataType: 'json',
                    contentType: false,
                    cache: false,
                    processData:false,
                    beforeSend: function(){
                        $('button#update-usuario').prepend('<i class="fa fa-spinner fa-spin"></i> ');
                    },
                    success: function(json){

                        $('button#update-usuario').find('i.fa').remove();

                        if(json.code === 200) {

                            Swal.fire({
                                text: "Usuario editado exitosamente",
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
                            sweetalert('Error al editar usuario. Consulte al Administrador.', 'error', 'sweet');
                        }
                    },
                    error: function(json){

                        $('button#update-usuario').find('i.fa').remove();

                        if(json.status === 422){
                            let errors = json.responseJSON;
                            sweetalert(errors, 'error', 'sweet');
                        }
                    }
                });
            });



        });


    </script>

@endsection
