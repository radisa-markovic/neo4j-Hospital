import React from "react";
import { Doktor } from "../models/Doktor";

interface Props
{
    korisnickoImeJeZauzeto: boolean,
    nekoJePrijavljen: boolean
}

interface ActionProps
{
    registrujDoktora: boolean
}

interface State
{
    ime: string,
    prezime: string,
    korisnickoIme: string,
    lozinka: string
}

class RegistracijaDoktor extends React.Component<Props & ActionProps, State>
{
    render(): JSX.Element
    {
        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <h3>Napravi nalog</h3>
                <div className="form-group">
                    <label className="control-label">Ime:</label>
                        <input type="text" 
                                name="ime" 
                                className="form-control" 
                                onChange={this.onChangeInput}/>
                    <label className="control-label">Prezime:</label>
                        <input type="text" 
                                name="prezime" 
                                className="form-control" 
                                onChange={this.onChangeInput}/>
                    <label className="control-label">Korisničko ime:</label>
                        <input type="korisnickoIme" 
                                name="inputKorisnickoIme" 
                                className="form-control" 
                                onChange={this.onChangeInput}/>
                        {
                            this.props.korisnickoImeJeZauzeto && <p style={{color: 'red'}}>Korisničko ime je zauzeto</p>
                        }
                    <label className="control-label">Lozinka:</label>
                        <input type="password" 
                                name="lozinka" 
                                className="form-control" 
                                onChange={this.onChangeInput}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg"
                            onClick={this.kreirajNalog}>
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
            specijalnost: "Podesiti nekako specijalnost..."
        };

        alert(`Paket paket trave`)
    }
}

export default RegistracijaDoktor;