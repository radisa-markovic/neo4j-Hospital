import React from "react";
import { Doktor } from "../models/Doktor";
import { RootStanje } from "../store";
import { Dispatch } from "redux";
import { A_RegistracijaDoktoraPokusaj } from "../store/doktori/akcije";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import vojaParlamentarniIzbori from '../slikeZaHome/VojaParlamentarniIzbori.jpg';

interface Props
{
    korisnickoImeJeZauzeto: boolean,
    nekoJePrijavljen: boolean,
    prijavaSeObradjuje: boolean
}

interface ActionProps
{
    registrujDoktora: (noviDoktor: Doktor) => void
}

interface State
{
    ime: string,
    prezime: string,
    specijalnost: string,
    korisnickoIme: string,
    lozinka: string
}

class RegistracijaDoktor extends React.Component<Props & ActionProps, State>
{
    render(): JSX.Element
    {
        if(this.props.nekoJePrijavljen)
            return <Redirect to="/" />

        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <h1>Napravi nalog</h1>
                {
                    this.props.prijavaSeObradjuje && this.renderujLoading()
                }
                <div className="form-group">
                    <label className="control-label" style={{fontWeight: "bold"}}>Ime:</label>
                        <input type="text" 
                                name="ime" 
                                className="form-control" 
                                placeholder="Unesi ime"
                                style={{textAlign: "center"}}
                                onChange={this.onChangeInput}/>
                    <label className="control-label" style={{fontWeight: "bold"}}>Prezime:</label>
                        <input type="text" 
                                name="prezime" 
                                className="form-control" 
                                placeholder="Unesi prezime"
                                style={{textAlign: "center"}}
                                onChange={this.onChangeInput}/>
                    <label className="control-label" style={{fontWeight: "bold"}}>Specijalnost:</label>
                        <input type="text" 
                               name="specijalnost" 
                               className="form-control" 
                               placeholder="Unesi specijalnost"
                               style={{textAlign: "center"}}
                               onChange={this.onChangeInput}/>
                    <label className="control-label" style={{fontWeight: "bold"}}>Korisničko ime:</label>
                        <input type="korisnickoIme" 
                                name="korisnickoIme" 
                                className="form-control"
                                placeholder="Unesi korisničko ime" 
                                style={{textAlign: "center"}}
                                onChange={this.onChangeInput}/>
                        {
                            this.props.korisnickoImeJeZauzeto && <p style={{color: 'red'}}>Korisničko ime je zauzeto</p>
                        }
                    <label className="control-label" style={{fontWeight: "bold"}}>Lozinka:</label>
                        <input type="password" 
                                name="lozinka" 
                                className="form-control" 
                                placeholder="Unesi lozinku"
                                style={{textAlign: "center"}}
                                onChange={this.onChangeInput}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg"
                            onClick={this.kreirajNalog}
                            disabled={this.props.prijavaSeObradjuje}>
                        Kreiraj nalog
                    </button>
                </div>
            </div>
        );
    }

    onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ [event.target.name]: event.target.value} as Pick<State, any>);
    }

    kreirajNalog = (): void => {
        let noviDoktor: Doktor = {
            ime: this.state.ime,
            prezime: this.state.prezime,
            korisnickoIme: this.state.korisnickoIme,
            lozinka: this.state.lozinka,
            specijalnost: this.state.specijalnost
        };

        this.props.registrujDoktora(noviDoktor);
    }

    renderujLoading(): JSX.Element
    {
        return (
            <React.Fragment>
                <h3 className="col-sm-6 offset-sm-3 text-center border">PRIJAVA SE OBRAĐUJE...</h3>
                <img src={vojaParlamentarniIzbori} alt="Nema slike" className="col-sm-12 offset-sm-1 text-center"/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (rootStanje: RootStanje): Props => {
    const { doktorDetalji } = rootStanje;
    return {
        prijavaSeObradjuje: doktorDetalji.prijavaSeObradjuje,
        korisnickoImeJeZauzeto: doktorDetalji.korisnickoImeJeZauzeto,
        nekoJePrijavljen: doktorDetalji.doktorJePrijavljen
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
    return {
        registrujDoktora: (noviDoktor: Doktor) => dispatch(A_RegistracijaDoktoraPokusaj(noviDoktor))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistracijaDoktor);