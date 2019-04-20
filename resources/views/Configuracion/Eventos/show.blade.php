@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-calendar-week page-header-heading-icon"></i>&nbsp;<a href="{{ route('configuracion.empresa') }}">Empresa</a>  / Ver Evento</h1>
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

                    <form id="form-add-evento" class="form-change-password form" enctype="multipart/form-data">

                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">

                                <input type="hidden" id="id-emp" value="{{ $empresa->_id }}">
                                <input type="hidden" id="id-evento" value="{{ $evento->_id }}">



                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">ID Evento</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$evento->IDEvento}}" id="idevento" name="idevento"  />
                                    </div>
                                </div>


                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Nombre Evento</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$evento->Nombre}}" id="nombre" name="nombre" placeholder="Ingrese el nombre del evento"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Fecha</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$evento->Fecha}}" id="fecha" name="fecha" placeholder="Ingrese la fecha del evento"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Hora</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$evento->Hora}}" id="hora" name="hora"  placeholder="Ingrese la hora del evento"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Licencias</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$evento->Licencias}}" id="licencias" name="licencias"  placeholder="Ingrese la cantidad de licencias del evento"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Latitud</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$evento->Latitud}}" id="latitud" name="latitud"  placeholder="Ingrese la latitud"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Longitud</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" value="{{$evento->Longitud}}" id="longitud" name="longitud"  placeholder="Ingrese la longitud"  />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Ubicación</label>
                                    <div class="col-sm-4">

                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" value="g" id="customRadioInline1" name="ubicacion" class="custom-control-input" {{ ($evento->Ubicacion=='GPS')? "checked" : "" }}  disabled>
                                            <label class="custom-control-label" for="customRadioInline1">GPS</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio"  value="m" id="customRadioInline2" name="ubicacion" class="custom-control-input" {{ ($evento->Ubicacion=='MANUAL')? "checked" : "" }} disabled>
                                            <label class="custom-control-label" for="customRadioInline2">Manual</label>
                                        </div>

                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">App</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="app" name="app" >
                                            <option value="">Seleccione</option>
                                            @foreach($estados as $estado)
                                                <option value="{{ $estado->Valor == true ? 1 : 0 }}" @if($evento->App == $estado->Valor) selected='selected' @endif>{{ $estado->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label col-form-label-sm">Estado</label>
                                    <div class="col-sm-4">
                                        <select class="form-control form-control-sm" id="estatus" name="estatus" >
                                            <option value="">Seleccione</option>
                                            @foreach($estados as $estado)
                                                <option value="{{ $estado->Valor == true ? 1 : 0 }}" @if($evento->Activo == $estado->Valor) selected='selected' @endif>{{ $estado->Nombre }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>

                            </div>


                            <div class="tab-pane fade" id="pills-logo" role="tabpanel" aria-labelledby="pills-logo-tab">

                                <div class="text-center">
                                    <img id="preview-emp-logo-show" src="{{ $evento->Logo }}" class="rounded img-example preview-add" alt="">
                                </div>

                            </div>

                        </div>

                        <div class="form-group row">
                            <div class="col-sm-4">

                                <a href="{{ route('configuracion.evento', ['id' => $empresa->_id]) }}"><button type="button" class="btn btn-sm btn-dark">Volver</button></a>
                            </div>
                        </div>

                    </form>

                @else

                    <div class="alert alert-danger mb-4" role="alert">
                        <i class="fas fa-info-circle"></i>&nbsp;No existe evento.
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
