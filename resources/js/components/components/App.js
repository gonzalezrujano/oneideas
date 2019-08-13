import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './../../redux';
/**
 * A continuacion se importan todos los componentes que seran
 * utili ados como paginas y rutas del front end
 */
import Login from "../Pages/Login";
import Welcome from "../Pages/Welcome";
import Multimedia from "../Pages/Multimedia";
import Biblioteca from "../Pages/configuracion/Biblioteca/Biblioteca";
import ViewEventoBiblioteca from "../Pages/configuracion/Biblioteca/Show";
import AddEventoBiblioteca from "../Pages/configuracion/Biblioteca/Add";
import Empresas from "../Pages/configuracion/Empresas/Empresas";
import AddEmpresa from "../Pages/configuracion/Empresas/Add";
import ShowEmpresas from "../Pages/configuracion/Empresas/Show";
import EditEmpresas from "../Pages/configuracion/Empresas/Edit";
import Eventos from "../Pages/configuracion/Eventos/Eventos";
import EventosAdd from "../Pages/configuracion/Eventos/Add";
import EventoEdit from "../Pages/configuracion/Eventos/Edit";
import EventoShow from "../Pages/configuracion/Eventos/Show";
import Usuarios from "../Pages/configuracion/Usuarios/Usuarios";
import UsuariosAdd from "../Pages/configuracion/Usuarios/Add";
import UsuariosEdit from "../Pages/configuracion/Usuarios/Edit";
import UsuariosShow from "../Pages/configuracion/Usuarios/Show";
import Invitacion from "../Pages/configuracion/Invitados/invitacion/invitacion";
import InvitacionShow from "../Pages/configuracion/Invitados/invitacion/Show";
import InvitacionAdd from "../Pages/configuracion/Invitados/invitacion/Add";
import Invitados from "../Pages/configuracion/Invitados/invitados/Invitados";
import InvitadosAdd from "../Pages/configuracion/Invitados/invitados/Add";
import InvitadosShow from "../Pages/configuracion/Invitados/invitados/Show";
import InvitadosEdit from "../Pages/configuracion/Invitados/invitados/Edit";
import Grupos from "../Pages/configuracion/Grupos/Grupos";
import GruposAdd from "../Pages/configuracion/Grupos/Add";
import GruposEdit from "../Pages/configuracion/Grupos/Edit";
import Etapas from "../Pages/configuracion/Eventos/Etapas/Etapas";
import EtapasAdd from "../Pages/configuracion/Eventos/Etapas/Add";
import EtapasEdit from "../Pages/configuracion/Eventos/Etapas/Edit";

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Switch>
              {/**A continuacion se presentan todas las rutas registradas del front end
              asi como sus respectivos componentes renderi ados en cada una */}
              <Route exact path="/" component={Login} />
              <Route exact path="/welcome" component={Welcome} />
              <Route exact path="/multimedia" component={Multimedia} />
              <Route exact path="/biblioteca" component={Biblioteca} />
              <Route
                  exact
                  path="/biblioteca/evento/:id"
                  component={ViewEventoBiblioteca}
              />
              <Route
                  exact
                  path="/biblioteca/evento/add-file/:id"
                  component={AddEventoBiblioteca}
              />
              <Route exact path="/empresas" component={Empresas} />
              <Route exact path="/empresas/add" component={AddEmpresa} />
              <Route
                  exact
                  path="/empresas/show/:id"
                  component={ShowEmpresas}
              />
              <Route
                  exact
                  path="/empresas/edit/:id"
                  component={EditEmpresas}
              />
              <Route exact path="/empresa/eventos/:id" component={Eventos} />
              <Route exact path="/eventos/add/:id" component={EventosAdd} />
              <Route exact path="/eventos/edit/:id" component={EventoEdit} />
              <Route exact path="/eventos/show/:id" component={EventoShow} />
              <Route exact path="/eventos/etapas/:id" component={Etapas} />
              <Route
                  exact
                  path="/eventos/etapas/add/:id"
                  component={EtapasAdd}
              />
              <Route
                  exact
                  path="/eventos/etapas/edit/:id"
                  component={EtapasEdit}
              />
              <Route exact path="/usuarios" component={Usuarios} />
              <Route exact path="/usuarios/add" component={UsuariosAdd} />
              <Route
                  exact
                  path="/usuarios/edit/:id"
                  component={UsuariosEdit}
              />
              <Route
                  exact
                  path="/usuarios/show/:id"
                  component={UsuariosShow}
              />
              <Route exact path="/invitacion" component={Invitacion} />
              <Route
                  exact
                  path="/invitacion/show/:id"
                  component={InvitacionShow}
              />
              <Route exact path="/invitacion/add" component={InvitacionAdd} />
              <Route exact path="/invitados" component={Invitados} />
              <Route exact path="/invitados/add" component={InvitadosAdd} />
              <Route
                  exact
                  path="/invitados/edit/:id"
                  component={InvitadosEdit}
              />
              <Route
                  exact
                  path="/invitados/show/:id"
                  component={InvitadosShow}
              />
              <Route exact path="/grupos" component={Grupos} />
              <Route exact path="/grupos/add" component={GruposAdd} />
              <Route exact path="/grupos/edit/:id" component={GruposEdit} />
          </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
