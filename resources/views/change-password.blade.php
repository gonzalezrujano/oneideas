@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-key page-header-heading-icon"></i>Cambiar Contraseña</h1>
@endsection

@section('content')

    <div id="change-password" data-url="{{ url('/') }}" data-changepassword="{{ $changepassword }}"></div>

@endsection
