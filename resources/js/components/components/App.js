import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

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

function App() {
    return (
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
            </Switch>
        </BrowserRouter>
    );
}

export default App;
