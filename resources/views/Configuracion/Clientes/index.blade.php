@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-user-tie page-header-heading-icon"></i>Clientes</h1>
@endsection

@section('content')


    <div class="col-lg-12">

        <div class="widget widget-default">

            <div class="widget-body">

                <table class="table table-hover table-condensed table-dark-theme table-responsive-sm" id="dt-clientes">
                    <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>CORREO</th>
                        <th>CUENTA</th>
                        <th>PAIS</th>
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

            var showAction     = "{{ Auth::user()->hasPermission('cliente', 'show')  }}";
            var editAction     = "{{ Auth::user()->hasPermission('cliente', 'edit')  }}";
            var deleteAction   = "{{ Auth::user()->hasPermission('cliente', 'delete')  }}";

            $('#dt-clientes').DataTable({
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
                    "url": "./ajax-cliente",
                    "type": "POST"
                },
                "columns":[
                    {"width": "10%", data: 'Nombre', "searchable": true, "bSortable": true},
                    {"width": "10%", data: 'Apellido', "searchable": true, "bSortable": true},
                    {"width": "12%", data: 'Correo', "searchable": true, "bSortable": true},
                    {"width": "12%", data: 'Cuenta', "searchable": true, "bSortable": true},
                    {"width": "12%", data: 'Pais', "searchable": true, "bSortable": true},
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

                            let linkShow   = './cliente-show/' + row._id;
                            let linkEdit   = './cliente-edit/' + row._id;

                            var ver      = showAction ? '<a href=" ' +linkShow+ ' "><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Ver" class="fas fa-eye"></i></a>&nbsp;&nbsp;&nbsp;' : '';
                            var editar   = editAction ? '<a href=" ' +linkEdit+ ' "><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Editar" class="fas fa-edit" ></i></a>&nbsp;&nbsp;&nbsp;' : '';
                            var active   = deleteAction ? '<a onclick="modalActive(\''+row._id+'\')"><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Cambiar estado" class="fas fa-power-off"></i></a>&nbsp;&nbsp;&nbsp;' : '';

                            var acciones = '<div class="text-center">' + ver + editar + active + '</div>';

                            return acciones;
                        }
                    }
                ]
            });


        }); //CIERRE


        function modalActive(id){

            Swal.fire({
                text: "¿Está seguro que desea cambiar el estado del cliente?",
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
                        url: './ajax-cliente-active',
                        data: {'id': id},
                        dataType: 'json',
                        beforeSend: function() {
                        },
                        success: function(rs) {

                            if(rs.code === 200) {
                                sweetalert("Estado cambiado exitosamente", "success", "sweet");
                                $('#dt-clientes').DataTable().ajax.reload();
                            }else if(rs.code === 600){
                                sweetalert("Error en el Proceso de Cambio de estado. Consulte al Administrador", "error", "sweet");
                            }else if(rs.code == 500){
                                sweetalert("Error al Cambiar de estado. Consulte al Administrador", "error", "sweet");
                            }
                        }
                    });
                }
            });

        }

    </script>

@endsection
