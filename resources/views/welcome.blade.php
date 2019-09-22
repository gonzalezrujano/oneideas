@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-tachometer-alt page-header-heading-icon"></i>Dashboard</h1>
@endsection

@section('content')

    <div class="col-lg-12">

        <div class="widget widget-default">

            <div class="widget-body">

                <div class="alert alert-success" role="alert">
                    <i class="fas fa-info-circle"></i>&nbsp;<strong>Bienvenido</strong> a ONE Show Console.
                </div>

            </div>
        </div>

    </div>

@endsection

@section('javascript')

    <script type="text/javascript">

        $(function(){
            localStorage.setItem("auto_load_agenda", "0");        });


    </script>

@endsection
