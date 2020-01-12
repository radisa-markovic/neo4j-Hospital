import React from "react";
import { NavLink } from "react-router-dom";

interface Props
{
    nekoJePrijavljen: boolean,
    usernamePrijavljenog: string
}

interface ActionProps
{
    odjavaKorisnika: Function
}

class NavigacionaTraka extends React.Component<any/*Props & ActionProps*/, any>
{
    render(): JSX.Element
    {
        return (
            <nav className="navbar navbar-default">
                <h4>Bolnica dr Vojislav Koštunica - Nismo obavešteni o tome ko ste, šta ste i šta vam je</h4>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <NavLink exact to="/" 
                            className="navbar-brand"
                            activeClassName="btn btn-outline-warning">
                            <h3>Home</h3>
                        </NavLink>
                        {this.props.nekoJePrijavljen? this.renderZaUlogovane() : this.renderZaIzlogovane() }
                    </div>
                </div>
            </nav>
        )
    }

    renderZaUlogovane(): JSX.Element
    {
        return(
            <React.Fragment>
                <NavLink exact to="/loginDoktor" 
                         className="navbar-brand"
                         activeClassName="btn btn-outline-warning">
                         <h3>Chat sobe</h3>
                </NavLink>
                <a href="/" onClick={this.odjaviKorisnika} 
                         className="navbar-brand"
                         >
                         <h3>({ 
                            this.props.usernamePrijavljenog? <span style={{color: 'orange'}}> {this.props.usernamePrijavljenog} </span> : <React.Fragment/>
                            }): Izloguj se
                         </h3>
                </a>
        
            </React.Fragment>
        );
    }

    renderZaIzlogovane(): JSX.Element
    {
        return(
            <React.Fragment>
                <NavLink exact to="/loginDoktor" 
                         className="navbar-brand" 
                         activeClassName="btn btn-outline-warning">
                         <h3>Prijavi se</h3>
                </NavLink>                    
                <NavLink exact to="/registracijaDoktor" 
                         className="navbar-brand"
                         activeClassName="btn btn-outline-warning">
                         <h3>Registracija</h3>
                </NavLink>
            </React.Fragment>
        );
    }

    odjaviKorisnika = () => {

    }
}

export default NavigacionaTraka;