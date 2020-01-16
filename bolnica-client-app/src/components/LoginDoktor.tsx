import React from "react";
import { LoginDoktoraPodaci } from "../store/doktori/model";
import { Dispatch } from 'redux';
import { connect } from "react-redux";
import { LoginDoktoraPokusaj } from "../store/doktori/akcije";
import { RootStanje } from "../store";
import { Redirect } from "react-router-dom";

interface Props
{
    korisnickoImeJePogresno: boolean,
    lozinkaJePogresna: boolean,
    prijavaJeUspela: boolean
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
        if(this.props.prijavaJeUspela)
            return <Redirect to="/" />
        
        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <h1>Prijavljivanje</h1>
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

    prijaviSe = (event: React.MouseEvent<HTMLButtonElement>): void => {
        let loginPodaci: LoginDoktoraPodaci = {
            korisnickoIme: this.state.korisnickoIme,
            lozinka: this.state.lozinka
        };

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
        lozinkaJePogresna: doktorDetalji.lozinkaJePogresna,
        prijavaJeUspela: doktorDetalji.doktorJePrijavljen
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDoktor);