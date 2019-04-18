@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-user-cog page-header-heading-icon"></i>Usuarios</h1>
@endsection

@section('content')


    <div class="col-lg-12">

        <div class="widget widget-default">

            <div class="widget-body">

                <table class="table table-hover table-condensed table-dark-theme table-responsive-sm" id="dt-usuarios">
                    <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>CORREO</th>
                        <th>EMPRESA</th>
                        <th>EVENTO</th>
                        <th>ROL</th>
                        <th>ESTADO</th>
                        <th class="text-center">ACCIONES</th>
                    </tr>
                    </thead>
                </table>

            </div>
        </div>

    </div>


@endsection

@section('javascript')

    <script type="text/javascript">

        $(function(){

            let linkAdd        =  "{{ route('usuario-add')  }}";
            var addAction      = "{{ Auth::user()->hasPermission('usuario', 'add')  }}";
            var showAction     = "{{ Auth::user()->hasPermission('usuario', 'show')  }}";
            var editAction     = "{{ Auth::user()->hasPermission('usuario', 'edit')  }}";
            var deleteAction   = "{{ Auth::user()->hasPermission('usuario', 'delete')  }}";

            $('#dt-usuarios').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    {
                        text: 'Agregar Usuario',
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
                "paging": false,
                "deferRender": true,
                "ajax": {
                    "url": "./ajax-usuario",
                    "type": "POST"
                },
                "columns":[
                    {"width": "10%", data: 'Nombre', "searchable": true, "bSortable": true},
                    {"width": "10%", data: 'Apellido', "searchable": true, "bSortable": true},
                    {"width": "12%", data: 'Correo', "searchable": true, "bSortable": true},
                    {"width": "12%", data: 'Empresa', "searchable": true, "bSortable": true},
                    {"width": "12%", data: 'Evento', "searchable": true, "bSortable": true},
                    {"width": "10%", data: 'Rol', "searchable": true, "bSortable": true},
                    {
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

                            let linkShow   = './usuario-show/' + row._id;
                            let linkEdit   = './usuario-edit/' + row._id;

                            var ver      = showAction ? '<a href=" ' +linkShow+ ' "><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Ver" class="fas fa-eye"></i></a>&nbsp;&nbsp;&nbsp;' : '';
                            var editar   = editAction ? '<a href=" ' +linkEdit+ ' "><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Editar" class="fas fa-edit" ></i></a>&nbsp;&nbsp;&nbsp;' : '';
                            var borrar   = deleteAction ? '<a onclick="modalDelete(\''+row._id+'\')"><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Borrar" class="fas fa-trash-alt"></i></a>&nbsp;&nbsp;&nbsp;' : '';

                            var acciones = '<div class="text-center">' + ver + editar + borrar + '</div>';

                            return acciones;
                        }
                    }
                ]
            });


        }); //CIERRE


        function modalDelete(id){

            Swal.fire({
                text: "¿Está seguro que desea borrar el usuario?",
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
                        url: './ajax-usuario-delete',
                        data: {'id': id},
                        dataType: 'json',
                        beforeSend: function() {
                        },
                        success: function(rs) {

                            if(rs.code === 200) {
                                sweetalert("Item eliminado correctamente", "success", "sweet");
                                $('#dt-usuarios').DataTable().ajax.reload();
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
