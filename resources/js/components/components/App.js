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
            </Switch>
        </BrowserRouter>
    );
}

export default App;
