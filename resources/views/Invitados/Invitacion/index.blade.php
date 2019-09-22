@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-envelope-open-text page-header-heading-icon"></i>Invitación</h1>
@endsection

@section('content')

    <div class="col-lg-12">

        <div class="widget widget-default">

            <div class="widget-body">

                <div class="form-inline mb-3">
                    <label class="my-1 mr-2 form-control-sm"><strong>Empresa</strong></label>
                    <select class="form-control form-control-sm my-1 mr-sm-2 col-2" id="pro-find-empresa" name="pro-find-empresa" {{ strtoupper(Auth::user()->nameRol()) == 'ADMINISTRADOR'  ? '' : 'disabled' }} >
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

                <table class="table table-hover table-condensed table-dark-theme table-responsive-sm" id="dt-eventos">
                    <thead>
                    <tr>
                        <th>EMPRESA</th>
                        <th>EVENTO</th>
                        <th>FECHA</th>
                        <th>APP</th>
                        <th>INVITACIONES</th>
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

            var showAction     = "{{ Auth::user()->hasPermission('biblioteca', 'show')  }}";
            var rol          = "{{ strtoupper(Auth::user()->nameRol())  }}";

            var tableEventos = $('#dt-eventos').DataTable({
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
                    "url": "./ajax-invitacion",
                    "type": "POST",
                    "data": function (d) {
                        d.empresa     = $('#pro-find-empresa').val();
                    }
                },
                "columns":[
                    {"width": "10%", data: 'Empresa', "searchable": true, "bSortable": false},
                    {"width": "14%", data: 'Evento', "searchable": true, "bSortable": false},
                    {"width": "8%", data: 'Fecha', "searchable": true, "bSortable": false},
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
                    },

                    {"width": "5%", data: 'Archivos', "searchable": true, "bSortable": false},

                    {
                        "width": "9%",
                        data: 'opciones',
                        "searchable": false,
                        "bSortable": false,
                        "render": function(data, type, row, meta){

                            let linkShow   = './invitacion-show/' + row._id;

                            var ver      = showAction ? '<a href=" ' +linkShow+ ' "><i style="color: #ffffff; cursor: pointer" data-toggle="tooltip" data-placement="top" title="Ver" class="fas fa-eye"></i></a>' : '';

                            var acciones = '<div class="text-center">' + ver + '</div>';

                            return acciones;
                        }
                    }
                ]
            });

            $("#p-buscar").on("click",function(e){

                tableEventos.draw();

            });

            $("#p-limpiar").on("click",function(e){

                $('#pro-find-empresa').prop('selectedIndex',0);

                if(rol == 'ADMINISTRADOR'){
                    $('#pro-find-sucursal').find('option').remove().end().append('<option value="">Seleccione</option>');
                }

                tableEventos.draw();
            });


        }); //CIERRE


    </script>

@endsection
