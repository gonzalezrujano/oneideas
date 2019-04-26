@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-book page-header-heading-icon"></i>&nbsp;<a href="{{ route('configuracion.biblioteca') }}">Biblioteca</a>  / Ver Archivos</h1>
@endsection

@section('content')

    <div class="col-lg-12">

        <div class="widget widget-default">

            <div class="widget-body">

                <input type="hidden" id="id-evento" name="id-evento" value="{{ $evento->_id }}">

                @if($existe)

                    <table class="table table-hover table-condensed table-dark-theme table-responsive-sm" id="dt-files">
                        <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <!--<th>TIPO</th>-->
                            <th>TAMAÑO</th>
                            <th>CATEGORIA</th>
                            <th class="text-center">ACCIONES</th>
                        </tr>
                        </thead>
                    </table>

                @else

                    <div class="alert alert-danger mb-4" role="alert">
                        <i class="fas fa-info-circle"></i>&nbsp;No existen archivos.
                    </div>

                @endif

            </div>

        </div>

    </div>

@endsection

@section('javascript')

    <script type="text/javascript">

        $(function(){

            let linkAdd        =  "{{ route('biblioteca-add', ['evento' => $evento->_id])  }}";
            var addAction      = "{{ Auth::user()->hasPermission('biblioteca', 'add')  }}";
            var deleteAction   = "{{ Auth::user()->hasPermission('biblioteca', 'delete')  }}";

            $('#dt-files').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    {
                        text: 'Agregar Archivo',
                        className: "btn-sm btn-dark button-add",
                        action: function ( e, dt, node, config ) {

                            if(addAction){

                                window.location.href = linkAdd;

                            }else{
                                sweetalert('Accion prohibida', 'error');
                            }


                        }
                    }
                ],
                "language": {
                    "url": "{{ asset('js/Spanish.json') }}"
                },
                "bLengthChange": false,
                "bFilter": true,
                "bInfo": false,
                "autoWidth": false,
                "processing": false,
                "serverSide": true,
                "ordering": false,
                "paging": true,
                "deferRender": true,
                "ajax": {
                    "url": "../ajax-biblioteca-files",
                    "type": "POST",
                    "data": function (d) {
                        d.evento     = $('#id-evento').val();
                    }
                },
                "columns":[
                    {"width": "15%", data: 'Nombre', "searchable": true, "bSortable": false},
                    //{"width": "10%", data: 'Tipo', "searchable": true, "bSortable": false},
                    {"width": "10%", data: 'Size', "searchable": true, "bSortable": false},
                    {"width": "10%", data: 'Categoria', "searchable": true, "bSortable": false},
                    {
                        "width": "9%",
                        data: 'opciones',
                        "searchable": false,
                        "bSortable": false,
                        "render": function(data, type, row, meta){

                            var borrar   = deleteAction ? '<a onclick="modalDelete(\''+row._id+'\')"><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Borrar" class="fas fa-trash-alt"></i></a>' : '';

                            var acciones = '<div class="text-center">' + borrar + '</div>';

                            return acciones;
                        }
                    }
                ]
            });


        });

        function modalDelete(id){

            Swal.fire({
                text: "¿Está seguro que desea borrar el archivo?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#343a40",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                target: document.getElementById('sweet')
            }).then((result) => {

                if (result.value) {

                    $.ajax({
                        type: 'POST',
                        url: '../ajax-biblioteca-delete-files',
                        data: {'id': id},
                        dataType: 'json',
                        beforeSend: function() {
                        },
                        success: function(rs) {

                            if(rs.code === 200) {
                                sweetalert("Item eliminado correctamente", "success", "sweet");
                                $('#dt-files').DataTable().ajax.reload();
                            }else if(rs.code === 600){
                                sweetalert("Error en el Proceso de Eliminacion. Consulte al Administrador", "error", "sweet");
                            }else if(rs.code == 500){
                                sweetalert("Error al Eliminar. Consulte al Administrador", "error", "sweet");
                            }
                        }
                    });
                }
            });

        }


    </script>

@endsection
