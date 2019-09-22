@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-industry page-header-heading-icon"></i>Agregar Empresa</h1>
@endsection

@section('content')

    <div class="col-lg-12">

        <div class="widget widget-default">

            <div class="widget-body">

                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="pills-datos-tab" data-toggle="pill" href="#pills-datos" role="tab" aria-controls="pills-datos" aria-selected="true">Datos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-logo-tab" data-toggle="pill" href="#pills-logo" role="tab" aria-controls="pills-logo" aria-selected="false">Logo</a>
                    </li>

                </ul>

                <hr class="line-gray"/>

                <form id="form-add-empresa" class="form-change-password form" enctype="multipart/form-data">

                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Identificación</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control form-control-sm" id="identificacion" name="identificacion" placeholder="Ingrese el numero de identificacion fiscal"  />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Nombre</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control form-control-sm" id="nombre" name="nombre" placeholder="Ingrese el nombre de la empresa"  />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Correo</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control form-control-sm" id="correo" name="correo"  placeholder="Ingrese el correo de la empresa"  />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Teléfono</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control form-control-sm" id="telefono" name="telefono"  placeholder="Ingrese el teléfono de la empresa"  />
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
                                <label class="col-sm-2 col-form-label col-form-label-sm">Estado</label>
                                <div class="col-sm-4">
                                    <select class="form-control form-control-sm" id="estatus" name="estatus" >
                                        <option value="">Seleccione</option>
                                        @foreach($estados as $estado)
                                            <option value="{{ $estado->Valor == true ? 1 : 0 }}">{{ $estado->Nombre }}</option>
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
                                <span class="btn btn-dark btn-file">Subir Imagen <input type="file" id="emp-logo" name="emp-logo"></span>
                            </div>

                            <div id="div-add-emp-img" class="text-center area-cropper">
                                <img id="preview-add-emp" src="" class="rounded img-example preview-add" alt="">
                            </div>

                            <input type="hidden" id="emp-add-x">
                            <input type="hidden" id="emp-add-y">
                            <input type="hidden" id="emp-add-w">
                            <input type="hidden" id="emp-add-h">

                        </div>

                    </div>

                    <div class="form-group row">
                        <div class="col-sm-4">
                            <button type="button" id="save-empresa" class="btn btn-sm btn-dark mr-2">Guardar</button>

                            <a href="{{ route('configuracion.empresa') }}"><button type="button" class="btn btn-sm btn-dark">Volver</button></a>
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

            var linkReturn = "{{ route('configuracion.empresa') }}";

            $('#div-add-emp-img').hide();

            $('#emp-logo').on('change', function(){

                var $image = $('#preview-add-emp');

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

                            $('#emp-add-x').val(event.detail.x);
                            $('#emp-add-y').val(event.detail.y);
                            $('#emp-add-w').val(event.detail.width);
                            $('#emp-add-h').val(event.detail.height);
                        }
                    });


                };

                $('#div-add-emp-img').show();
            });

            $("#save-empresa").on("click",function(){

                let formData = new FormData();

                formData.append("identificacion", $('#form-add-empresa input[name=identificacion]').val());
                formData.append("nombre", $('#form-add-empresa input[name=nombre]').val());
                formData.append("correo", $('#form-add-empresa input[name=correo]').val());
                formData.append("telefono", $('#form-add-empresa input[name=telefono]').val());
                formData.append("pais", $('#form-add-empresa select[name=pais]').val());
                formData.append("estatus", $('#form-add-empresa select[name=estatus]').val());
                formData.append("logo", $('#form-add-empresa input[name=emp-logo]')[0].files[0] === undefined ? '' : $('#form-add-empresa input[name=emp-logo]')[0].files[0] );
                formData.append("x", $('#emp-add-x').val());
                formData.append("y", $('#emp-add-y').val());
                formData.append("w", $('#emp-add-w').val());
                formData.append("h", $('#emp-add-h').val());

                $.ajax({
                    type: 'POST',
                    url: './ajax-empresa-add',
                    data: formData,
                    //dataType: 'json',
                    contentType: false,
                    cache: false,
                    processData:false,
                    beforeSend: function(){
                        $('button#save-empresa').prepend('<i class="fa fa-spinner fa-spin"></i> ');
                    },
                    success: function(json){

                        $('button#save-empresa').find('i.fa').remove();

                        if(json.code === 200) {

                            Swal.fire({
                                text: "Empresa agregada exitosamente",
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
                            sweetalert('Error al agregar empresa. Consulte al Administrador.', 'error', 'sweet');
                        }
                    },
                    error: function(json){

                        $('button#save-empresa').find('i.fa').remove();

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
