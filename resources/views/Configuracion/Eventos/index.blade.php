@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-calendar-week page-header-heading-icon"></i>&nbsp;<a href="{{ route('configuracion.empresa') }}">Empresa</a>  / Eventos</h1>
@endsection

@section('content')


    <div class="col-lg-12">

        <div class="widget widget-default">

            <div class="widget-body">

                <table class="table table-hover table-condensed table-dark-theme table-responsive-sm" id="dt-eventos">
                    <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>ID EVENTO</th>
                        <th>FECHA</th>
                        <th>PAÍS</th>
                        <th>APP</th>
                        <th>ESTADO</th>
                        <th class="text-center">ACCIONES</th>
                    </tr>
                    </thead>
                </table>

                <input type="hidden" id="id_emp" value="{{ $empresa->_id }}">

            </div>
        </div>

    </div>


@endsection

@section('javascript')

    <script type="text/javascript">

        $(function(){

            var id_emp  = $('#id_emp').val();

            let linkAdd        =  "{{ route('evento-add', ['empresa' => $empresa->_id])  }}";
            var addAction      = "{{ Auth::user()->hasPermission('evento', 'add')  }}";
            var showAction     = "{{ Auth::user()->hasPermission('evento', 'show')  }}";
            var editAction     = "{{ Auth::user()->hasPermission('evento', 'edit')  }}";
            var deleteAction   = "{{ Auth::user()->hasPermission('evento', 'delete')  }}";
            var appAction      = "{{ Auth::user()->hasPermission('evento', 'app')  }}";

            $('#dt-eventos').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    {
                        text: 'Agregar Evento',
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
                    "url": "../ajax-evento",
                    "type": "POST",
                    "data": {
                        "id_emp" : id_emp
                    }
                },
                "columns":[
                    {"width": "14%", data: 'Nombre', "searchable": true, "bSortable": false},
                    {"width": "5%", data: 'IDEvento', "searchable": true, "bSortable": false},
                    {"width": "7%", data: 'Fecha', "searchable": true, "bSortable": false},
                    {"width": "6%", data: 'Pais', "searchable": true, "bSortable": false},
                    {
                        "width": "5%",
                        data: 'App',
                        "searchable": false,
                        "bSortable": true,
                        "render": function(data, type, row, meta){

                            if(row.App == true){
                                return '<i style="color: #449d44" class="fa fa-check fa-lg" aria-hidden="true"></i>';
                            }else{
                                return '<i style="color: #d9534f" class="fa fa-times fa-lg" aria-hidden="true"></i>';
                            }
                        }
                    },                    {
                        "width": "4%",
                         data: 'Activo',
                        "searchable": false,
                        "bSortable": true,
                        "render": function(data, type, row, meta){

                            if(row.Activo == true){
                                return '<span class="badge badge-success badge-dt">activo</span>';
                            }else{
                                return '<span class="badge badge-danger badge-dt">inactivo</span>';
                            }
                        }
                    },


                    {
                        "width": "9%",
                        data: 'opciones',
                        "searchable": false,
                        "bSortable": false,
                        "render": function(data, type, row, meta){

                            let linkShow   = '../evento-show/' + row._id;
                            let linkEdit   = '../evento-edit/' + row._id;

                            var ver      = showAction ? '<a href=" ' +linkShow+ ' "><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Ver" class="fas fa-eye"></i></a>&nbsp;&nbsp;&nbsp;' : '';
                            var editar   = editAction ? '<a href=" ' +linkEdit+ ' "><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Editar" class="fas fa-edit" ></i></a>&nbsp;&nbsp;&nbsp;' : '';
                            var borrar   = deleteAction ? '<a onclick="modalDelete(\''+row._id+'\')"><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Borrar" class="fas fa-trash-alt"></i></a>&nbsp;&nbsp;&nbsp;' : '';
                            var app      = appAction ? '<a onclick="modalActive(\''+row._id+'\')"><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Cambiar Visibilidad App" class="fas fa-check-square"></i></a>&nbsp;&nbsp;&nbsp;' : '';

                            var acciones = '<div class="text-center">' + ver + editar + borrar + app +'</div>';

                            return acciones;
                        }
                    }
                ]
            });


        }); //CIERRE


        function modalDelete(id){

            Swal.fire({
                text: "¿Está seguro que desea borrar el evento?",
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
                        url: '../ajax-evento-delete',
                        data: {'id': id},
                        dataType: 'json',
                        beforeSend: function() {
                        },
                        success: function(rs) {

                            if(rs.code === 200) {
                                sweetalert("Item eliminado correctamente", "success", "sweet");
                                $('#dt-eventos').DataTable().ajax.reload();
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

        function modalActive(id){

            Swal.fire({
                text: "¿Está seguro que desea cambiar la visibilidad del evento en la App?",
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
                        url: '../ajax-evento-active',
                        data: {'id': id},
                        dataType: 'json',
                        beforeSend: function() {
                        },
                        success: function(rs) {

                            if(rs.code === 200) {
                                sweetalert("Evento cambiado correctamente", "success", "sweet");
                                $('#dt-eventos').DataTable().ajax.reload();
                            }else if(rs.code === 600){
                                sweetalert("Error en el Proceso de cambio de visibilidad. Consulte al Administrador", "error", "sweet");
                            }else if(rs.code == 500){
                                sweetalert("Error al cambiar visibilidad. Consulte al Administrador", "error", "sweet");
                            }
                        }
                    });
                }
            });

        }


    </script>

@endsection
