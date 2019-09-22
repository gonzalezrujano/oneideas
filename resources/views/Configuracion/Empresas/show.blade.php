@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-industry page-header-heading-icon"></i>Ver Empresa</h1>
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

                    </ul>

                    <hr class="line-gray"/>

                    <form id="form-add-empresa" class="form-change-password form" enctype="multipart/form-data">

                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Identificación</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{ $empresa->Cuit_rut }}" id="identificacion" name="identificacion" placeholder="Ingrese el numero de identificacion fiscal" disabled  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Nombre</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$empresa->Nombre}}" id="nombre" name="nombre" placeholder="Ingrese el nombre de la empresa" disabled />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Correo</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$empresa->Correo}}" id="correo" name="correo"  placeholder="Ingrese el correo de la empresa" disabled />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Teléfono</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$empresa->Telefono}}" id="telefono" name="telefono"  placeholder="Ingrese el teléfono de la empresa" disabled />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">País</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="pais" name="pais" disabled>
                                            <option value="">Seleccione</option>
                                            @foreach($paises as $pais)
                                                <option value="{{ $pais->_id }}"  @if((string)$empresa->Pais_id == $pais->_id) selected='selected' @endif >{{ $pais->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Estado</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="estatus" name="estatus" disabled>
                                            <option value="">Seleccione</option>
                                            @foreach($estados as $estado)
                                                <option value="{{ $estado->Valor == true ? 1 : 0 }}" @if($empresa->Activo == $estado->Valor) selected='selected' @endif>{{ $estado->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                            </div>


                            <div class="tab-pane fade" id="pills-logo" role="tabpanel" aria-labelledby="pills-logo-tab">

                                <div class="text-center">
                                    <img id="preview-emp-logo-show" src="{{ $empresa->Logo }}" class="rounded img-example preview-add" alt="">
                                </div>

                            </div>

                        </div>

                        <div class="form-group row">
                            <div class="col-sm-4">
                                <a href="{{ route('configuracion.empresa') }}"><button type="button" class="btn btn-sm btn-dark">Volver</button></a>
                            </div>
                        </div>

                    </form>

                @else

                    <div class="alert alert-danger mb-4" role="alert">
                        <i class="fas fa-info-circle"></i>&nbsp;No existe empresa.
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
