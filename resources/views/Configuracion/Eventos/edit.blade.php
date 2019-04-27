@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-calendar-week page-header-heading-icon"></i>&nbsp;<a href="{{ route('configuracion.empresa') }}">Empresa</a>  / Editar Evento</h1>
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
                        <li class="nav-item">
                            <a class="nav-link" id="pills-invitados-tab" data-toggle="pill" href="#pills-invitados" role="tab" aria-controls="pills-invitados" aria-selected="false">APP Invitados</a>
                        </li>
                    </ul>

                    <hr class="line-gray"/>

                    <form id="form-add-evento" class="form-change-password form" enctype="multipart/form-data">

                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">

                                <input type="hidden" id="id-emp" value="{{ $empresa->_id }}">
                                <input type="hidden" id="id-evento" value="{{ $evento->_id }}">


                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Nombre Evento</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$evento->Nombre}}" id="nombre" name="nombre" placeholder="Ingrese el nombre del evento"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Fecha</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$evento->Fecha}}" id="fecha" name="fecha" placeholder="Ingrese la fecha del evento"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Hora</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$evento->Hora}}" id="hora" name="hora"  placeholder="Ingrese la hora del evento"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Licencias</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$evento->Licencias}}" id="licencias" name="licencias"  placeholder="Ingrese la cantidad de licencias del evento"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">País</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="pais" name="pais" >
                                            <option value="">Seleccione</option>
                                            @foreach($paises as $pais)
                                                <option value="{{ $pais->_id }}"  @if((string)$evento->Pais_id == $pais->_id) selected='selected' @endif >{{ $pais->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Latitud</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$evento->Latitud}}" id="latitud" name="latitud"  placeholder="Ingrese la latitud"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Longitud</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$evento->Longitud}}" id="longitud" name="longitud"  placeholder="Ingrese la longitud"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Ubicación</label>
                                    <div class="col-sm-4">

                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" value="g" id="customRadioInline1" name="ubicacion" class="custom-control-input" {{ ($evento->Ubicacion=='GPS')? "checked" : "" }} >
                                            <label class="custom-control-label" for="customRadioInline1">GPS</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio"  value="m" id="customRadioInline2" name="ubicacion" class="custom-control-input" {{ ($evento->Ubicacion=='MANUAL')? "checked" : "" }} >
                                            <label class="custom-control-label" for="customRadioInline2">Manual</label>
                                        </div>

                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Estado</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="estatus" name="estatus" >
                                            <option value="">Seleccione</option>
                                            @foreach($estados as $estado)
                                                <option value="{{ $estado->Valor == true ? 1 : 0 }}" @if($evento->Activo == $estado->Valor) selected='selected' @endif>{{ $estado->Nombre }}</option>
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
                                    <span class="btn btn-dark btn-file">Subir Imagen <input type="file" id="logo" name="logo"></span>
                                </div>

                                <div id="div-edit-emp-img-preview" class="text-center">
                                    <img id="preview-emp-logo-edit" src="{{ $evento->Logo }}" class="rounded img-example preview-emp-logo-edit" alt="">
                                </div>

                                <div id="div-edit-emp-img-new" class="text-center area-cropper">
                                    <img id="preview-emp-logo-edit-new" src="" class="rounded img-example preview-emp-edit-new" alt="">
                                </div>

                                <input type="hidden" id="add-x">
                                <input type="hidden" id="add-y">
                                <input type="hidden" id="add-w">
                                <input type="hidden" id="add-h">

                            </div>

                            <div class="tab-pane fade" id="pills-invitados" role="tabpanel" aria-labelledby="pills-invitados-tab">

                                <div class="alert alert-primary mb-4" role="alert">
                                    <i class="fas fa-info-circle"></i>&nbsp;
                                    Seleccione los menús que estaran habilitado en la App para el evento.
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Menús</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="menuapp" name="menuapp" multiple="multiple">
                                            @foreach($menusapp as $ma)
                                                <option value="{{ $ma->_id }}">{{ $ma->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="form-group row">
                            <div class="col-sm-4">
                                <button type="button" id="update-evento" class="btn btn-sm btn-dark mr-2">Guardar</button>

                                <a href="{{ route('configuracion.evento', ['id' => $empresa->_id]) }}"><button type="button" class="btn btn-sm btn-dark">Volver</button></a>
                            </div>
                        </div>

                    </form>

                @else

                    <div class="alert alert-danger mb-4" role="alert">
                        <i class="fas fa-info-circle"></i>&nbsp;No existe evento.
                    </div>

                @endif

            </div>

        </div>

    </div>

@endsection

@section('javascript')

    <script type="text/javascript">

        $(function(){

            var optionSelectMultiple = {
                placeholder: 'Seleccione',
                selectAllText: 'Todos',
                allSelected: 'Todos',
                countSelected: '# de % opciones'
            };

            var dataMenu = <?php echo '["' . implode('", "', $menuapp) . '"]'; ?>;

            $('#menuapp').multipleSelect(optionSelectMultiple).multipleSelect('setSelects', dataMenu);

            var linkReturn = "{{ route('configuracion.evento', ['id' => $empresa->_id]) }}";

            $('#licencias').inputmask({"mask": "9999999", greedy: false, "placeholder": ""});


            $('#fecha').datetimepicker({
                format: 'DD/MM/YYYY',
                minDate: new Date()
            });

            $('#hora').datetimepicker({
                format: 'LT'
            });

            $('#div-edit-emp-img-preview').show();
            $('#div-edit-emp-img-new').hide();

            $('#logo').on('change', function(){

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
                            $('#add-x').val(event.detail.x);
                            $('#add-y').val(event.detail.y);
                            $('#add-w').val(event.detail.width);
                            $('#add-h').val(event.detail.height);
                        }
                    });

                };

                $('#div-edit-emp-img-new').show();
                $('#div-edit-emp-img-preview').hide();
            });


            $("#update-evento").on("click",function(){

                let formData = new FormData();

                let ubicacion = $('input[name=ubicacion]:checked', '#form-add-evento').val();

                formData.append("id-emp", $('#id-emp').val());
                formData.append("id-evento", $('#id-evento').val());
                formData.append("nombre", $('#form-add-evento input[name=nombre]').val());
                formData.append("fecha", $('#form-add-evento input[name=fecha]').val());
                formData.append("hora", $('#form-add-evento input[name=hora]').val());
                formData.append("licencias", $('#form-add-evento input[name=licencias]').val());
                formData.append("pais", $('#form-add-evento select[name=pais]').val());
                formData.append("latitud", $('#form-add-evento input[name=latitud]').val());
                formData.append("longitud", $('#form-add-evento input[name=longitud]').val());
                formData.append("ubicacion",  ubicacion === undefined ? '' : ubicacion);
                formData.append("estatus", $('#form-add-evento select[name=estatus]').val());
                formData.append("logo", $('#form-add-evento input[name=logo]')[0].files[0] );
                formData.append("x", $('#add-x').val());
                formData.append("y", $('#add-y').val());
                formData.append("w", $('#add-w').val());
                formData.append("h", $('#add-h').val());

                var menu = $('#menuapp').multipleSelect('getSelects');

                formData.append("menuapp", menu);

                $.ajax({
                    type: 'POST',
                    url: '../ajax-evento-update',
                    data: formData,
                    //dataType: 'json',
                    contentType: false,
                    cache: false,
                    processData:false,
                    beforeSend: function(){
                        $('button#update-evento').prepend('<i class="fa fa-spinner fa-spin"></i> ');
                    },
                    success: function(json){

                        $('button#update-evento').find('i.fa').remove();

                        if(json.code === 200) {

                            Swal.fire({
                                text: "Evento editado exitosamente",
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
                            sweetalert('Error al editar el evento. Consulte al Administrador.', 'error', 'sweet');
                        }
                    },
                    error: function(json){

                        $('button#update-evento').find('i.fa').remove();

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
