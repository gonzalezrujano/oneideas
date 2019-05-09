@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-address-book page-header-heading-icon"></i>Agenda</h1>
@endsection

@section('content')


    <div class="col-lg-12">
        
        <div class="widget widget-default">

            <div class="widget-body">
                <div class="row">
                    <div class="form-inline mb-6 col-md-5">
                        <label class="my-1 mr-2 form-control-sm"><strong>Empresa</strong></label>
                        <select class="form-control form-control-sm my-1 mr-sm-4 col-6" id="pro-find-empresa" name="pro-find-empresa" {{ strtoupper(Auth::user()->nameRol()) == 'ADMINISTRADOR'  ? '' : 'disabled' }} >
                            @if(strtoupper(Auth::user()->nameRol()) == 'ADMINISTRADOR')
                                <option value="">Todas</option>
                            @endif

                            @foreach($empresas as $emp)
                                <option value="{{ $emp->_id }}">{{ $emp->Nombre }}</option>
                            @endforeach

                        </select>

                        <button id="p-buscar" class="btn btn-dark btn-sm mr-1" data-toggle="tooltip" data-placement="top" title="Buscar"><i class="fa fa-search" aria-hidden="true"></i></button>
                        <button id="p-limpiar" class="btn btn-dark btn-sm mr-1" data-toggle="tooltip" data-placement="top" title="Limpiar Busqueda"><i class="fa fa-trash" aria-hidden="true"></i></button>

                    </div>
                    <div class="form-inline mb-6 col-md-5">
                        <label class="my-1 mr-2 form-control-sm"><strong>Evento</strong></label>
                        <select class="form-control form-control-sm my-1 mr-sm-4 col-6" id="pro-find-evento" name="pro-find-evento" 
                        @if(strtoupper(Auth::user()->nameRol()) == 'ADMINISTRADOR')
                                disable
                            @endif
                        >
                                <option value="">Todos</option>

                        </select>

                        <button id="p-buscar" class="btn btn-dark btn-sm mr-1" data-toggle="tooltip" data-placement="top" title="Buscar"><i class="fa fa-search" aria-hidden="true"></i></button>
                        <button id="evento-limpiar" class="btn btn-dark btn-sm mr-1" data-toggle="tooltip" data-placement="top" title="Limpiar Busqueda"><i class="fa fa-trash" aria-hidden="true"></i></button>

                    </div>
                </div>
                <!-- <table class="table table-hover table-condensed table-dark-theme table-responsive-sm" id="dt-agendas">
                    <thead>
                    <tr>
                        <th>HORA</th>
                        <th>TÍTULO</th>
                        <th>DESCRIPCIÓN</th>
                        <th class="text-center">ACCIONES</th>
                    </tr>
                    </thead>
                </table> -->
            </div>
        </div>

    </div>


@endsection

@section('javascript')

    <script type="text/javascript">
        // Set variables helpers //
        var rol = "{{ strtoupper(Auth::user()->nameRol())  }}";
        // Events Reactions //
        $("#p-limpiar").on("click",function(e){

                $('#pro-find-empresa').prop('selectedIndex',0);

                if(rol == 'ADMINISTRADOR'){
                    $('#pro-find-sucursal').find('option').remove().end().append('<option value="">Seleccione</option>');
                }

                //tableEventos.draw();
            });
        // $(function(){

        //     let linkAdd        =  "{{ route('agenda-add')  }}";
        //     var addAction      = "{{ Auth::user()->hasPermission('agenda', 'add')  }}";
        //     var showAction     = "{{ Auth::user()->hasPermission('agenda', 'show')  }}";
        //     var editAction     = "{{ Auth::user()->hasPermission('agenda', 'edit')  }}";
        //     var deleteAction   = "{{ Auth::user()->hasPermission('agenda', 'delete')  }}";
        //     var eventoAction   = "{{ Auth::user()->hasPermission('agenda', 'evento')  }}";

        //     $('#dt-agendas').DataTable({
        //         dom: 'Bfrtip',
        //         buttons: [
        //             {
        //                 text: 'Agregar Agenda',
        //                 className: "btn-sm btn-dark button-add",
        //                 action: function ( e, dt, node, config ) {

        //                     if(addAction){

        //                         window.location.href = linkAdd;

        //                     }else{
        //                         sweetalert('Accion prohibida', 'error', 'sweet');
        //                     }


        //                 }
        //             }
        //         ],
        //         "language": {
        //             "url": "{{ asset('js/Spanish.json') }}"
        //         },
        //         "bLengthChange": false,
        //         "bFilter": true,
        //         "bInfo": false,
        //         "autoWidth": false,
        //         "processing": false,
        //         "serverSide": true,
        //         "ordering": false,
        //         "paging": true,
        //         "deferRender": true,
        //         "ajax": {
        //             "url": "./ajax-agenda",
        //             "type": "POST"
        //         },
        //         "columns":[
        //             {"width": "7%", data: 'Hora', "searchable": true, "bSortable": false},
        //             {"width": "12%", data: 'Titulo', "searchable": true, "bSortable": false},
        //             //{"width": "10%", data: 'Evento', "searchable": true, "bSortable": false},
        //             {"width": "7%", data: 'Descripcion', "searchable": true, "bSortable": false},
        //             {
        //                 "width": "9%",
        //                 data: 'opciones',
        //                 "searchable": false,
        //                 "bSortable": false,
        //                 "render": function(data, type, row, meta){

        //                     let linkShow   = './agenda-show/' + row._id;
        //                     let linkEdit   = './agenda-edit/' + row._id;
        //                     let linkEvento = './evento/' + row._id;

        //                     var ver      = showAction ? '<a href=" ' +linkShow+ ' "><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Ver" class="fas fa-eye"></i></a>&nbsp;&nbsp;&nbsp;' : '';
        //                     var editar   = editAction ? '<a href=" ' +linkEdit+ ' "><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Editar" class="fas fa-edit" ></i></a>&nbsp;&nbsp;&nbsp;' : '';
        //                     var borrar   = deleteAction ? '<a onclick="modalDelete(\''+row._id+'\')"><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Borrar" class="fas fa-trash-alt"></i></a>&nbsp;&nbsp;&nbsp;' : '';
        //                     var evento = eventoAction ? '<a href=" '+ linkEvento + ' "><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Evento" class="fas fa-calendar-week"></i></a>&nbsp;&nbsp;&nbsp;' : '';

        //                     var acciones = '<div class="text-center">' + ver + editar + borrar + evento + '</div>';

        //                     return acciones;
        //                 }
        //             }
        //         ]
        //     });


        // }); //CIERRE


        // function modalDelete(id){

        //     Swal.fire({
        //         text: "¿Está seguro que desea borrar la empresa? Al decir que si, se eliminará todo lo relacionado con la misma (eventos).",
        //         type: "warning",
        //         showCancelButton: true,
        //         confirmButtonColor: "#343a40",
        //         confirmButtonText: "Si",
        //         cancelButtonText: "No",
        //         target: document.getElementById('sweet')
        //     }).then((result) => {

        //         if (result.value) {

        //             $.ajax({
        //                 type: 'POST',
        //                 url: './ajax-empresa-delete',
        //                 data: {'id': id},
        //                 dataType: 'json',
        //                 beforeSend: function() {
        //                 },
        //                 success: function(rs) {

        //                     if(rs.code === 200) {
        //                         sweetalert("Item eliminado correctamente", "success", "sweet");
        //                         $('#dt-empresas').DataTable().ajax.reload();
        //                     }else if(rs.code === 600){
        //                         sweetalert("Error en el Proceso de Eliminacion. Consulte al Administrador", "error", "sweet");
        //                     }else if(rs.code == 500){
        //                         sweetalert("Error al Eliminar. Consulte al Administrador", "error", "sweet");
        //                     }
        //                 }
        //             });
        //         }
        //     });

        // }

    </script>

@endsection
