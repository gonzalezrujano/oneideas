<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="api-base-url" content="{{ url('/') }}" />
        <link rel="icon" type="image/png" href="{{ asset('images/favicon.ico') }}">

        <title>{{ config('oneshow.title') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,bolditalic">
        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:regular,bold,italic,bolditalic" rel="stylesheet">

        <link rel="stylesheet" href="{{ asset('css/vendor.css') }}">
        <link rel="stylesheet" href="{{ asset('css/main.css') }}">

    </head>
    <body>

        <div class="wrapper">

            <div class="page-wrapper">


                <div id="login-hidden" class="container" style="display: none;">
                    <div class="absolute-center">

                        <form class="form-login form">

                            <!-- logo-->
                            <div class="text-center mb-4">
                                <img src="{{ asset('images/logo-oneshow.png') }}" class="img-fluid logo-login" alt="Responsive image" />
                            </div>

                            <div class="form-group">
                                <input type="text" class="form-control input-lg" id="email" placeholder="Ingresa tu correo">
                            </div>

                            <div class="form-group">
                                <input type="password" class="form-control input-lg" id="password" placeholder="Ingresa tu contraseña">
                            </div>

                            <a href="{{ route('dashboard') }}"><button type="button" class="btn btn-block btn-red-one">Ingresar</button></a>

                            <ul class="login-bottom-links">
                                <li><a href="#">¿Olvidaste tu contraseña?</a></li>
                            </ul>


                        </form>

                    </div>
                </div>


            </div>

        </div>

        <script src="{{ asset('js/app.js') }}"></script>
        <script src="{{ asset('js/vendor.js') }}"></script>

    </body>
</html>
