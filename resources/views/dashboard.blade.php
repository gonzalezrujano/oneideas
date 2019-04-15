@extends('Layouts.template-inside')

@section('heading')
    <h1 class="page-header-heading"><i class="fas fa-tachometer-alt page-header-heading-icon"></i>Dashboard</h1>
@endsection

@section('content')

    <div class="col-lg-12">

        <div class="widget widget-default">
            <header class="widget-header">
                Lista de usuarios
            </header>
            <div class="widget-body">
                <table class="table table-hover table-dark-theme table-responsive-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Correo</th>
                        <th>Nombre</th>
                        <th class="text-right">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>john.doe@example.com</td>
                        <td>John Doe</td>
                        <td class="text-right">
                            <i class="fas fa-eye"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-edit"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>jeff.mann@example.com</td>
                        <td>Jeff Mann</td>
                        <td class="text-right">
                            <i class="fas fa-eye"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-edit"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>bob.jim@example.com</td>
                        <td>Bob Jim</td>
                        <td class="text-right">
                            <i class="fas fa-eye"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-edit"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>matt.vera@example.com</td>
                        <td>Matt Vera</td>
                        <td class="text-right">
                            <i class="fas fa-eye"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-edit"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-trash-alt"></i>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

@endsection
