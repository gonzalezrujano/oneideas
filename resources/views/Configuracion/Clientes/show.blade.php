@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-user-tie page-header-heading-icon"></i>Ver Cliente</h1>
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

                    </ul>

                    <hr class="line-gray"/>

                    <form id="form-add-usuario" class="form-change-password form" enctype="multipart/form-data">

                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">


                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Nombre</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$cliente->Nombre}}" id="cliente-nombre" name="cliente-nombre" placeholder="Ingrese el nombre" disabled>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Apellido</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$cliente->Apellido}}" id="cliente-apellido" name="cliente-apellido" placeholder="-" disabled>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Correo</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$cliente->Correo}}" id="cliente-correo" name="cliente-correo" placeholder="Ingrese el correo" disabled>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Teléfono</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$cliente->Telefono == '' ? '-' : $cliente->Telefono }}" id="cliente-telefono" name="cliente-telefono" placeholder="-" disabled>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">País</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="cliente-pais" name="cliente-pais" disabled>
                                            @foreach($paises as $pais)
                                                <option value="{{ $pais->_id }}">{{ $pais->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Cuenta</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$cliente->TipoCuenta}}" id="cliente-cuenta" name="cliente-cuenta" placeholder="Ingrese el tipo de cuenta" disabled>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="form-group row">
                            <div class="col-sm-4">
                                <a href="{{ route('configuracion.cliente') }}"><button type="button" class="btn btn-sm btn-dark">Volver</button></a>
                            </div>
                        </div>

                    </form>

                @else

                    <div class="alert alert-danger mb-4" role="alert">
                        <i class="fas fa-info-circle"></i>&nbsp;No existe cliente.
                    </div>

                @endif

            </div>

        </div>

    </div>

@endsection

@section('javascript')

    <script type="text/javascript">

        $(function(){

        });


    </script>

@endsection
