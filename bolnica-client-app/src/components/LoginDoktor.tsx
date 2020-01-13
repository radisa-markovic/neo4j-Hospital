import React from "react";
import { LoginDoktoraPodaci } from "../store/doktori/model";
import { Dispatch } from 'redux';
import { connect } from "react-redux";
import { LoginDoktoraPokusaj } from "../store/doktori/akcije";
import { RootStanje } from "../store";

interface Props
{
    korisnickoImeJePogresno: boolean,
    lozinkaJePogresna: boolean
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
        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <h1>Prijavljivanje</h1>
                <div className="form-group">
                    <label className="control-label">Ime:</label>
                    <input type="text" 
                           name="korisnickoIme" 
                           placeholder="Unesi korisničko ime" 
                           className="form-control"
                           onChange={this.onChangeInput}/>
                    {
                        this.props.korisnickoImeJePogresno && <p style={{color: 'red'}}>Nepostojeće korisničko ime</p>
                    }
                    <label className="control-label">Lozinka:</label>
                    <input type="password" 
                           name="lozinka" 
                           placeholder="Unesi lozinku" 
                           className="form-control"
                           onChange={this.onChangeInput}/>
                    {
                        this.props.lozinkaJePogresna && <p style={{color: 'red'}}>Pogrešna lozinka</p>
                    }
                    <button className="btn btn-primary btn-lg"
                            onClick={this.prijaviSe}>
                        Prijavi se
                    </button>
                </div>
            </div>
        );
    }

    onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ [event.target.name] : event.target.value} as Pick<State, any>);
    }

    prijaviSe = (): void => {
        alert(`Prijava dr ${this.state}`);
        let loginPodaci: LoginDoktoraPodaci = {
            korisnickoIme: this.state.korisnickoIme,
            lozinka: this.state.lozinka
        };

        console.log(loginPodaci);

        this.props.ulogujDoktora(loginPodaci);
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
    return {
        ulogujDoktora: (loginDetalji: LoginDoktoraPodaci) => dispatch(LoginDoktoraPokusaj(loginDetalji))
    }
}

const mapStateToProps = (rootStanje: RootStanje): Props => {
    const { doktorDetalji } = rootStanje;
    return {
        korisnickoImeJePogresno: doktorDetalji.korisnickoImeNePostoji,
        lozinkaJePogresna: doktorDetalji.lozinkaJePogresna
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDoktor);