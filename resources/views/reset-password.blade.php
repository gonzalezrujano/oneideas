@extends('Layouts.template-outside')

@section('content')

    <div id="reset-password" data-url="{{ url('/') }}" data-token="{{ $token }}" data-tokenValido="{{ $tokenValido }}"></div>

@endsection
