@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-user-cog page-header-heading-icon"></i>Agregar Usuario</h1>
@endsection

@section('content')

    <div class="col-lg-12">

        <div class="widget widget-default">

            <div class="widget-body">

                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="pills-datos-tab" data-toggle="pill" href="#pills-datos" role="tab" aria-controls="pills-datos" aria-selected="true">Datos</a>
                    </li>

                </ul>

                <hr class="line-gray"/>

                <form id="form-add-usuario" class="form-change-password form" enctype="multipart/form-data">

                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Tipo Documento</label>
                                <div class="col-sm-4">
                                    <select class="form-control form-control-sm" id="tipo-documento" name="tipo-documento">
                                        <option value="">Seleccione</option>
                                        @foreach($tipodocumentos as $td)
                                            <option value="{{ $td->_id }}">{{ $td->TipoDocumento }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>


                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Documento</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control form-control-sm" id="documento" name="documento" placeholder="Ingrese el documento">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Nombre</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control form-control-sm" id="nombre" name="nombre" placeholder="Ingrese el nombre">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Apellido</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control form-control-sm" id="apellido" name="apellido" placeholder="Ingrese el apellido">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Correo</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control form-control-sm" id="correo" name="correo" placeholder="Ingrese el correo">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Teléfono</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control form-control-sm" id="telefono" name="telefono" placeholder="Ingrese el telefono">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">País</label>
                                <div class="col-sm-4">
                                    <select class="form-control form-control-sm" id="pais" name="pais">
                                        <option value="">Seleccione</option>
                                        @foreach($paises as $pais)
                                            <option value="{{ $pais->_id }}">{{ $pais->Nombre }}</option>
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
                                            <option value="{{ $rol->_id }}">{{ $rol->Nombre }}</option>
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
                                            <option value="{{ $empresa->_id }}">{{ $empresa->Nombre }}</option>
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
                                            <option value="{{ $estado->Valor == true ? 1 : 0 }}">{{ $estado->Nombre }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="alert alert-primary" role="alert">
                                El password por defecto es: <b>Numero de documento</b>
                            </div>


                        </div>

                    </div>

                    <div class="form-group row">
                        <div class="col-sm-4">
                            <button type="button" id="save-usuario" class="btn btn-sm btn-dark mr-2">Guardar</button>

                            <a href="{{ route('configuracion.usuario') }}"><button type="button" class="btn btn-sm btn-dark">Volver</button></a>
                        </div>
                    </div>

                </form>

            </div>

        </div>

    </div>

@endsection

@section('javascript')

    <script type="text/javascript">

        $(function(){

            var linkReturn = "{{ route('configuracion.usuario') }}";

            $("#save-usuario").on("click",function(){

                let formData = new FormData();

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
                    url: './ajax-usuario-add',
                    data: formData,
                    //dataType: 'json',
                    contentType: false,
                    cache: false,
                    processData:false,
                    beforeSend: function(){
                        $('button#save-usuario').prepend('<i class="fa fa-spinner fa-spin"></i> ');
                    },
                    success: function(json){

                        $('button#save-usuario').find('i.fa').remove();

                        if(json.code === 200) {

                            Swal.fire({
                                text: "Usuario agregado exitosamente",
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
                            sweetalert('Error al agregar usuario. Consulte al Administrador.', 'error', 'sweet');
                        }
                    },
                    error: function(json){

                        $('button#save-usuario').find('i.fa').remove();

                        if(json.status === 422){
                            let errors = json.responseJSON;
                            sweetalert(errors, 'error', 'sweet');
                        }
                    }
                });
            });


            $('#empresa').on('change', function(){

                var emp = $(this).val();

                if(emp){

                    $.ajax({
                        url: '../ajax/eventos/'+emp,
                        type: "GET",
                        dataType: "json",
                        success:function(data){

                            $('#evento').empty();

                            var select = '<option value="">Seleccione</option>';

                            $.each(data, function(key ,value){
                                select +='<option value="'+value._id+'">'+value.Nombre+'</option>';
                            });

                            $("#evento").html(select);

                        }
                    });

                }else{
                    $('#evento').empty();
                }

            });


        });


    </script>

@endsection
