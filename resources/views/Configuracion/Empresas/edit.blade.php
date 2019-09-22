@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-industry page-header-heading-icon"></i>Editar Empresa</h1>
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
                        <li class="nav-item">
                            <a class="nav-link" id="pills-logo-tab" data-toggle="pill" href="#pills-logo" role="tab" aria-controls="pills-logo" aria-selected="false">Logo</a>
                        </li>

                    </ul>

                    <hr class="line-gray"/>

                    <form id="form-edit-empresa" class="form-change-password form" enctype="multipart/form-data">

                        <input type="hidden" id="emp-id" name="emp-id" value="{{ $empresa->_id }}">

                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Identificación</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{ $empresa->Cuit_rut }}" id="identificacion" name="identificacion" placeholder="Ingrese el numero de identificacion fiscal"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Nombre</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$empresa->Nombre}}" id="nombre" name="nombre" placeholder="Ingrese el nombre de la empresa"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Correo</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$empresa->Correo}}" id="correo" name="correo"  placeholder="Ingrese el correo de la empresa"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Teléfono</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$empresa->Telefono}}" id="telefono" name="telefono"  placeholder="Ingrese el teléfono de la empresa"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">País</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="pais" name="pais" >
                                            <option value="">Seleccione</option>
                                            @foreach($paises as $pais)
                                                <option value="{{ $pais->_id }}"  @if((string)$empresa->Pais_id == $pais->_id) selected='selected' @endif >{{ $pais->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Estado</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="estatus" name="estatus" >
                                            <option value="">Seleccione</option>
                                            @foreach($estados as $estado)
                                                <option value="{{ $estado->Valor == true ? 1 : 0 }}" @if($empresa->Activo == $estado->Valor) selected='selected' @endif>{{ $estado->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                            </div>


                            <div class="tab-pane fade" id="pills-logo" role="tabpanel" aria-labelledby="pills-logo-tab">

                                <div class="alert alert-primary mb-4" role="alert">
                                    <i class="fas fa-info-circle"></i>&nbsp;
                                    La imagén a subir debe tener una resolución de <strong>200x200</strong>, en formato <strong>.jpg</strong> o <strong>.png</strong> y un peso aproximado entre <strong>10KB</strong> y <strong>5MB</strong>.
                                </div>

                                <div class="text-center btn-upload-image mb-5">
                                    <span class="btn btn-dark btn-file">Subir Imagen <input type="file" id="emp-logo-edit" name="emp-logo"></span>
                                </div>

                                <div id="div-edit-emp-img-preview" class="text-center">
                                    <img id="preview-emp-logo-edit" src="{{ $empresa->Logo }}" class="rounded img-example preview-emp-logo-edit" alt="">
                                </div>

                                <div id="div-edit-emp-img-new" class="text-center area-cropper">
                                    <img id="preview-emp-logo-edit-new" src="" class="rounded img-example preview-emp-edit-new" alt="">
                                </div>

                                <input type="hidden" id="emp-edit-x">
                                <input type="hidden" id="emp-edit-y">
                                <input type="hidden" id="emp-edit-w">
                                <input type="hidden" id="emp-edit-h">

                            </div>

                        </div>

                        <div class="form-group row">
                            <div class="col-sm-4">
                                <button type="button" id="update-empresa" class="btn btn-sm btn-dark mr-2">Guardar</button>

                                <a href="{{ route('configuracion.empresa') }}"><button type="button" class="btn btn-sm btn-dark">Volver</button></a>
                            </div>
                        </div>

                    </form>

                @else

                    <div class="alert alert-danger mb-4" role="alert">
                        <i class="fas fa-info-circle"></i>&nbsp;No existe empresa.
                    </div>

                @endif

            </div>

        </div>

    </div>

@endsection

@section('javascript')

    <script type="text/javascript">

        $(function(){

            var linkReturn = "{{ route('configuracion.empresa') }}";

            $('#div-edit-emp-img-preview').show();
            $('#div-edit-emp-img-new').hide();

            $('#emp-logo-edit').on('change', function(){

                var $image = $('#preview-emp-logo-edit-new');

                var oFReader = new FileReader();

                oFReader.readAsDataURL(this.files[0]);

                oFReader.onload = function (oFREvent) {

                    // Destroy the old cropper instance
                    $image.cropper('destroy');

                    // Replace url
                    $image.attr('src', this.result);

                    // Start cropper
                    $image.cropper({
                        viewMode: 1,
                        minContainerWidth: 200,
                        minContainerHeight: 200,
                        autoCropArea: 1,
                        crop: function(event) {
                            $('#emp-edit-x').val(event.detail.x);
                            $('#emp-edit-y').val(event.detail.y);
                            $('#emp-edit-w').val(event.detail.width);
                            $('#emp-edit-h').val(event.detail.height);
                        }
                    });

                };

                $('#div-edit-emp-img-new').show();
                $('#div-edit-emp-img-preview').hide();
            });


            $("#update-empresa").on("click",function(){

                //var datos = $("form#form-edit-empresa").serialize();

                let formData = new FormData();

                formData.append("emp-id", $('#form-edit-empresa input[name=emp-id]').val());
                formData.append("identificacion", $('#form-edit-empresa input[name=identificacion]').val());
                formData.append("nombre", $('#form-edit-empresa input[name=nombre]').val());
                formData.append("correo", $('#form-edit-empresa input[name=correo]').val());
                formData.append("telefono", $('#form-edit-empresa input[name=telefono]').val());
                formData.append("pais", $('#form-edit-empresa select[name=pais]').val());
                formData.append("estatus", $('#form-edit-empresa select[name=estatus]').val());
                formData.append("logo", $('#form-edit-empresa input[name=emp-logo]')[0].files[0]);
                formData.append("x", $('#emp-edit-x').val());
                formData.append("y", $('#emp-edit-y').val());
                formData.append("w", $('#emp-edit-w').val());
                formData.append("h", $('#emp-edit-h').val());

                $.ajax({
                    type: 'POST',
                    url: '../ajax-empresa-update',
                    data: formData,
                    //dataType: 'json',
                    contentType: false,
                    cache: false,
                    processData:false,
                    beforeSend: function(){
                        $('button#update-empresa').prepend('<i class="fa fa-spinner fa-spin"></i> ');
                    },
                    success: function(json){

                        $('button#update-empresa').find('i.fa').remove();

                        if(json.code === 200) {

                            Swal.fire({
                                text: "Empresa editada exitosamente",
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
                            sweetalert('Error al editar la empresa. Consulte al Administrador.', 'error', 'sweet');
                        }
                    },
                    error: function(json){

                        $('button#update-empresa').find('i.fa').remove();

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
