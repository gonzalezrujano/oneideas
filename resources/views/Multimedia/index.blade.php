@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-compact-disc page-header-heading-icon"></i>Multimedia</h1>
@endsection

@section('content')

    <div id="multimedia" data-url="{{ url('/') }}" data-eventos="{{ json_encode($eventos) }}"></div>

@endsection
