@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-user-friends page-header-heading-icon"></i>&nbsp;<a href="{{ route('invitados.invitacion') }}">Invitación</a>  / Agregar Archivo</h1>
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

                <form id="form-add" class="form-change-password form" enctype="multipart/form-data">

                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">

                            <input type="hidden" id="id-evento" value="{{ $evento }}">

                            <div class="alert alert-primary mb-4" role="alert">
                                <i class="fas fa-info-circle"></i>&nbsp;
                                La imagén de la invitación a subir debe tener una resolución de <strong>1200x800</strong>, en formato <strong>.jpg</strong> o <strong>.png</strong> y un peso aproximado entre <strong>10KB</strong> y <strong>10MB</strong>.
                                <br><i class="fas fa-info-circle"></i>&nbsp;&nbsp;El Pdf  debe estar en formato <strong>.pdf</strong> y un peso aproximado entre <strong>10KB</strong> y <strong>10MB</strong>.

                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Posición Invitación</label>
                                <div class="col-sm-5">
                                    <select class="form-control form-control-sm" id="tipo" name="tipo" >
                                        <option value="">Seleccione</option>
                                        <option value="h" >Horizontal</option>
                                        <option value="v" >Vertical</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Invitación (Imagen)</label>
                                <div class="col-sm-5">
                                    <input type="file" class="form-control-file" id="archivoimg" name="archivoimg" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Invitación (PDF)</label>
                                <div class="col-sm-5">
                                    <input type="file" class="form-control-file" id="archivopdf" name="archivopdf" >
                                </div>
                            </div>

                        </div>


                    </div>

                    <div class="form-group row">
                        <div class="col-sm-4">
                            <button type="button" id="save-file" class="btn btn-sm btn-dark mr-2">Guardar</button>

                            <a href="{{ route('invitacion-show', ['evento' => $evento] ) }}"><button type="button" class="btn btn-sm btn-dark">Volver</button></a>
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

            var linkReturn = "{{ route('invitacion-show', ['evento' => $evento] ) }}";

            $("#save-file").on("click",function(){

                let formData = new FormData();

                formData.append("id-evento", $('#id-evento').val());
                formData.append("tipo", $('#form-add select[name=tipo]').val());
                formData.append("archivoimg", $('#form-add input[name=archivoimg]')[0].files[0] === undefined ? '' : $('#form-add input[name=archivoimg]')[0].files[0] );
                formData.append("archivopdf", $('#form-add input[name=archivopdf]')[0].files[0] === undefined ? '' : $('#form-add input[name=archivopdf]')[0].files[0] );

                $.ajax({
                    type: 'POST',
                    url: '../ajax-invitacion-add-files',
                    data: formData,
                    //dataType: 'json',
                    contentType: false,
                    cache: false,
                    processData:false,
                    beforeSend: function(){
                        $('button#save-file').prepend('<i class="fa fa-spinner fa-spin"></i> ');
                    },
                    success: function(json){

                        $('button#save-file').find('i.fa').remove();

                        if(json.code === 200) {

                            Swal.fire({
                                text: "Archivos agregados exitosamente",
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
                            sweetalert('Error al agregar archivo. Consulte al Administrador.', 'error', 'sweet');
                        }
                    },
                    error: function(json){

                        $('button#save-file').find('i.fa').remove();

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
