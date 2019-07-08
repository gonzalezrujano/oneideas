
@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-industry page-header-heading-icon"></i>Empresas</h1>
@endsection

@section('content')


    <div class="col-lg-12">

        <div class="widget widget-default">

            <div class="widget-body">

                <table class="table table-hover table-condensed table-dark-theme table-responsive-sm" id="dt-empresas">
                    <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>CORREO</th>
                        <th>TELÉFONO</th>
                        <th>PAÍS</th>
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

            let linkAdd        =  "{{ route('empresa-add')  }}";
            var addAction      = "{{ Auth::user()->hasPermission('empresa', 'add')  }}";
            var showAction     = "{{ Auth::user()->hasPermission('empresa', 'show')  }}";
            var editAction     = "{{ Auth::user()->hasPermission('empresa', 'edit')  }}";
            var deleteAction   = "{{ Auth::user()->hasPermission('empresa', 'delete')  }}";
            var eventoAction   = "{{ Auth::user()->hasPermission('empresa', 'evento')  }}";

            $('#dt-empresas').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    {
                        text: 'Agregar Empresa',
                        className: "btn-sm btn-dark button-add",
                        action: function ( e, dt, node, config ) {

                            if(addAction){

                                window.location.href = linkAdd;

                            }else{
                                sweetalert('Accion prohibida', 'error', 'sweet');
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
                    "url": "./ajax-empresa",
                    "type": "POST"
                },
                "columns":[
                    {"width": "12%", data: 'Nombre', "searchable": true, "bSortable": false},
                    {"width": "10%", data: 'Correo', "searchable": true, "bSortable": false},
                    {"width": "7%", data: 'Telefono', "searchable": true, "bSortable": false},
                    {"width": "7%", data: 'Pais', "searchable": true, "bSortable": false},
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

                            let linkShow   = './empresa-show/' + row._id;
                            let linkEdit   = './empresa-edit/' + row._id;
                            let linkEvento = './evento/' + row._id;

                            var ver      = showAction ? '<a href=" ' +linkShow+ ' "><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Ver" class="fas fa-eye"></i></a>&nbsp;&nbsp;&nbsp;' : '';
                            var editar   = editAction ? '<a href=" ' +linkEdit+ ' "><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Editar" class="fas fa-edit" ></i></a>&nbsp;&nbsp;&nbsp;' : '';
                            var borrar   = deleteAction ? '<a onclick="modalDelete(\''+row._id+'\')"><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Borrar" class="fas fa-trash-alt"></i></a>&nbsp;&nbsp;&nbsp;' : '';
                            var evento = eventoAction ? '<a href=" '+ linkEvento + ' "><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Evento" class="fas fa-calendar-week"></i></a>&nbsp;&nbsp;&nbsp;' : '';

                            var acciones = '<div class="text-center">' + ver + editar + borrar + evento + '</div>';

                            return acciones;
                        }
                    }
                ]
            });


        }); //CIERRE


        function modalDelete(id){

            Swal.fire({
                text: "¿Está seguro que desea borrar la empresa? Al decir que si, se eliminará todo lo relacionado con la misma (eventos).",
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
                        url: './ajax-empresa-delete',
                        data: {'id': id},
                        dataType: 'json',
                        beforeSend: function() {
                        },
                        success: function(rs) {

                            if(rs.code === 200) {
                                sweetalert("Item eliminado correctamente", "success", "sweet");
                                $('#dt-empresas').DataTable().ajax.reload();
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
