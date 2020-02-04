import React from "react";
import { LoginDoktoraPodaci } from "../store/doktori/model";
import { Dispatch } from 'redux';
import { connect } from "react-redux";
import { A_LoginDoktoraProba } from "../store/doktori/akcije";
import { RootStanje } from "../store";
import { Redirect } from "react-router-dom";

import vojaSrecan from '../slikeZaHome/VojaSrecan.jpg'

interface Props
{
    korisnickoImeJePogresno: boolean,
    lozinkaJePogresna: boolean,
    prijavaJeUspela: boolean,
    prijavaSeObradjuje: boolean
}

interface ActionProps
{
    ulogujDoktora: (loginPodaci: LoginDoktoraPodaci) => void
}

interface State
{
    korisnickoIme: string,
    lozinka: string
}

class LoginDoktor extends React.Component<Props & ActionProps, State>
{
    readonly state = {
        korisnickoIme: "",
        lozinka: ""
    };

    render(): JSX.Element
    {
        //ne znam sto nece da odradi zastitu,...
        if(this.props.prijavaJeUspela === true)
            return <Redirect exact to="/" />
        
        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <h1>Prijavljivanje</h1>
                {
                    this.props.prijavaSeObradjuje && this.renderujLoading() 
                }
                <div className="form-group">
                    <label className="control-label" style={{fontWeight: "bold"}}>Ime:</label>
                    <input type="text" 
                           name="korisnickoIme" 
                           placeholder="Unesi korisničko ime" 
                           className="form-control"
                           style={{textAlign: "center"}}
                           onChange={this.onChangeInput}/>
                    {
                        this.props.korisnickoImeJePogresno && <p style={{color: 'red'}}>Nepostojeće korisničko ime</p>
                    }
                    <label className="control-label" style={{fontWeight: "bold"}}>Lozinka:</label>
                    <input type="password" 
                           name="lozinka" 
                           placeholder="Unesi lozinku" 
                           className="form-control"
                           style={{textAlign: "center"}}
                           onChange={this.onChangeInput}/>
                    {
                        this.props.lozinkaJePogresna && <p style={{color: 'red'}}>Pogrešna lozinka</p>
                    }
                    <button className="btn btn-primary btn-lg"
                            onClick={this.prijaviSe}
                            disabled={this.props.prijavaSeObradjuje}>
                        Prijavi se
                    </button>
                </div>
            </div>
        );
    }

    onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ [event.target.name] : event.target.value} as Pick<State, any>);
    }

    prijaviSe = (event: React.MouseEvent<HTMLButtonElement>): void => {
        let loginPodaci: LoginDoktoraPodaci = {
            korisnickoIme: this.state.korisnickoIme,
            lozinka: this.state.lozinka
        };

        this.props.ulogujDoktora(loginPodaci);
    }

    renderujLoading(): JSX.Element
    {
        return (
            <React.Fragment>
                <h3 className="col-sm-6 offset-sm-3 text-center border">PRIJAVA SE OBRAĐUJE...</h3>
                <img src={vojaSrecan} alt="Nema slike" className="col-sm-18 offset-sm-1 text-center"/>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
    return {
        ulogujDoktora: (loginDetalji: LoginDoktoraPodaci) => dispatch(A_LoginDoktoraProba(loginDetalji))
    }
}

const mapStateToProps = (rootStanje: RootStanje): Props => {
    const { doktorDetalji } = rootStanje;
    return {
        korisnickoImeJePogresno: doktorDetalji.korisnickoImeNePostoji,
        lozinkaJePogresna: doktorDetalji.lozinkaJePogresna,
        prijavaJeUspela: doktorDetalji.doktorJePrijavljen,
        prijavaSeObradjuje: doktorDetalji.prijavaSeObradjuje
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDoktor);