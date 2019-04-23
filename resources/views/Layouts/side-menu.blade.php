
<aside class="left-sidebar">

    <ul class="sidebar-nav mt-3">

        <li class="sidebar-nav-link active">
            <a href="{{ route('welcome') }}">
                <i class="fas fa-tachometer-alt sidebar-nav-link-logo"></i> Dashboard
            </a>
        </li>

        @if(Auth::user()->hasPermission('multimedia', 'show'))
            <li class="sidebar-nav-link">
                <a href="{{ route('multimedia') }}">
                    <i class="fas fa-compact-disc sidebar-nav-link-logo"></i> Multimedia
                </a>
            </li>
        @endif

        <li class="sidebar-nav-link sidebar-nav-link-group">
            <a data-subnav-toggle>
                <i class="fas fa-tools sidebar-nav-link-logo"></i> Configuración
                <span class="fa fa-chevron-right subnav-toggle-icon subnav-toggle-icon-closed"></span>
                <span class="fa fa-chevron-down subnav-toggle-icon subnav-toggle-icon-opened"></span>
            </a>

            <ul class="sidebar-nav">

                @if(Auth::user()->hasPermission('biblioteca', 'show'))
                    <li class="sidebar-nav-link">
                        <a href="{{ route('configuracion.biblioteca') }}">
                            <i class="fas fa-book sidebar-nav-link-logo"></i> Biblioteca
                        </a>
                    </li>
                @endif


                @if(Auth::user()->hasPermission('empresa', 'show'))
                    <li class="sidebar-nav-link">
                        <a href="{{ route('configuracion.empresa') }}">
                            <i class="fas fa-industry sidebar-nav-link-logo"></i> Empresas
                        </a>
                    </li>
                @endif

                @if(Auth::user()->hasPermission('cliente', 'show'))
                    <li class="sidebar-nav-link">
                        <a href="{{ route('configuracion.cliente') }}">
                            <i class="fas fa-user-tie sidebar-nav-link-logo"></i> Invitados
                        </a>
                    </li>
                @endif

                @if(Auth::user()->hasPermission('monitor', 'show'))
                    <li class="sidebar-nav-link">
                        <a href="{{ route('configuracion.monitor') }}">
                            <i class="fas fa-desktop sidebar-nav-link-logo"></i> Monitor
                        </a>
                    </li>
                @endif

                @if(Auth::user()->hasPermission('usuario', 'show'))
                    <li class="sidebar-nav-link">
                        <a href="{{ route('configuracion.usuario') }}">
                            <i class="fas fa-user-cog sidebar-nav-link-logo"></i> Usuarios
                        </a>
                    </li>
                @endif

            </ul>
        </li>

    </ul>

</aside>
