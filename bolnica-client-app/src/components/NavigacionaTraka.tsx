import React from "react";
import { NavLink } from "react-router-dom";
import { RootStanje } from "../store";
import { Dispatch } from "redux";
import { OdjavaDoktora } from "../store/doktori/akcije";
import { connect } from "react-redux";

interface Props
{
    nekoJePrijavljen: boolean,
    usernamePrijavljenog: string
}

interface ActionProps
{
    odjavaKorisnika: Function
}

class NavigacionaTraka extends React.Component<Props & ActionProps>
{
    render(): JSX.Element
    {
        return (
            <nav className="navbar navbar-default bg-dark">
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
                <NavLink exact to="/unesiPacijenta" 
                         className="navbar-brand"
                         activeClassName="btn btn-outline-warning">
                         <h3>Unos pacijenta</h3>
                </NavLink>
                <NavLink exact to="/unesiIzvestaj" 
                         className="navbar-brand"
                         activeClassName="btn btn-outline-warning">
                         <h3>Unos pacijenta</h3>
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

const mapStateToProps = (rootStanje: RootStanje): Props => {
    const { doktorDetalji } = rootStanje;
    return {
        nekoJePrijavljen: doktorDetalji.doktorJePrijavljen,
        usernamePrijavljenog: doktorDetalji.doktor.korisnickoIme 
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
    return {
        odjavaKorisnika: () => dispatch(OdjavaDoktora())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigacionaTraka);