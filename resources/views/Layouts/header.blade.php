
<header class="top-header">
    <a href="index.html" class="top-header-logo">
        <img class="logo-inside" src="{{ asset('images/logo-oneshow.png') }}" />
    </a>

    <nav id="navbar-principal" class="navbar navbar-default">

        <div class="container-fluid">

            <div class="navbar-header">
                <button type="button" class="navbar-sidebar-toggle" data-toggle-sidebar>
                    <span class="fas fa-arrow-left fa-xs icon-arrow visible-sidebar-sm-open"></span>
                    <span class="fas fa-arrow-right fa-xs icon-arrow visible-sidebar-sm-closed"></span>
                    <span class="fas fa-arrow-left fa-xs icon-arrow visible-sidebar-md-open"></span>
                    <span class="fas fa-arrow-right fa-xs icon-arrow visible-sidebar-md-closed"></span>
                </button>
            </div>



            <ul class="navbar-nav ml-auto">

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-user"></i>&nbsp;{{ Str::limit('Luisleonardo2', 15) }}
                    </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-sm-right" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#"><i class="fas fa-address-card"></i>&nbsp;Perfil</a>
                        <a class="dropdown-item" href="#"><i class="fas fa-key"></i>&nbsp;Cambiar Contraseña</a>
                        <a class="dropdown-item" href="{{ route('login') }}"><i class="fas fa-sign-out-alt"></i>&nbsp;Salir</a>
                    </div>
                </li>

            </ul>

        </div>
    </nav>

</header>
