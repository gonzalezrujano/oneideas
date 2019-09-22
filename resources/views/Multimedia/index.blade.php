@extends('Layouts.template-inside-multimedia')

@section('content')

    <div id="multimedia" data-url="{{ url('/') }}" data-eventos="{{ json_encode($eventos) }}" data-sectores="{{ json_encode($sectores) }}" data-footer="{{ $footer }}"></div>

@endsection
