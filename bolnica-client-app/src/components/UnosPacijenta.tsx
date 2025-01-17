import React from "react";
import { Pacijent } from "../models/Pacijent";
import uniqid from 'uniqid';
import { RootStanje } from "../store";
import { Dispatch } from "redux";
import { A_DodajPacijenta } from "../store/odeljenja/akcije";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

interface Props
{
    nekoJePrijavljen: boolean
}

interface ActionProps
{
    unesiPacijenta: (noviPacijent: Pacijent) => void
}

interface State
{
    identifikacija: string,
    ime: string,
    prezime: string,
    odeljenje: string,
    datumSmestanja: string
}

class UnosPacijenta extends React.Component<Props & ActionProps, State>
{
    readonly state: State = {
        identifikacija: "", 
        ime: "",
        prezime: "",
        odeljenje: "Kardiovaskularno", //hardkodovano je, to je ono iz select-a pa option selected
        datumSmestanja: ""
    };

    render(): JSX.Element
    {
        if(!this.props.nekoJePrijavljen)
            return <Redirect to="/" />
        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <h1>Unesi detalje o pacijentu</h1>
                <div className="form-group">
                    <label className="control-label">Ime:</label>
                    <input type="text" 
                           name="ime" 
                           placeholder="Unesi ime" 
                           className="form-control"
                           onChange={this.onChangeInput}/>
                    <label className="control-label">Prezime:</label>
                    <input type="text" 
                           name="prezime" 
                           placeholder="Unesi prezime" 
                           className="form-control"
                           onChange={this.onChangeInput}/>
                    <p>Odeljenje</p>
                    <select className="form-control" 
                            onChange={this.onChangeOdeljenje}> 
                        <option defaultValue="Kardiovaskularno">Kardiovaskularno</option>
                        <option value="Gastroenterologija">Gastroenterologija</option>
                        <option value="Grudno">Grudno</option>
                        <option value="Ortopedija">Ortopedija</option>
                        <option value="Fizikalno">Fizikalno</option>
                        <option value="Ostalo">Ostalo</option>
                    </select>
                    <button className="btn btn-primary btn-lg"
                            onClick={this.potvrdiPacijenta}>
                        Potvrdi detalje
                    </button>
                </div>
            </div>
        );
    }

    //neki pokusaj da za mnogo onChange eventova imam jedan hendler
    onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ [event.target.name] : event.target.value } as Pick<State, any>);
    }

    onChangeOdeljenje = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        this.setState({odeljenje: event.target.value});
    }

    potvrdiPacijenta = (): void => {

        let noviPacijent: Pacijent = {
            idPacijenta: uniqid("pacijent-"),
            ime: this.state.ime,
            prezime: this.state.prezime,
            odeljenje: this.state.odeljenje,
            datumSmestanja: this.regulisiDatum()
        };
        
        this.props.unesiPacijenta(noviPacijent);
    }

    regulisiDatum = (): string => {
        let danasnjiDatum = new Date();
        let dan = danasnjiDatum.getDate().toString();
        let mesec = (danasnjiDatum.getMonth() + 1).toString();
        let godina = danasnjiDatum.getFullYear().toString();

        if(parseInt(dan) < 10)
            dan = '0' + dan;
        
        if(parseInt(mesec) < 10)
            mesec = '0' + mesec;

        return `${dan}-${mesec}-${godina}`;
    }
}

const mapStateToProps = (rootStanje: RootStanje): Props => {
    const { doktorDetalji } = rootStanje;
    return {
        nekoJePrijavljen: doktorDetalji.doktorJePrijavljen 
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
    return {
        unesiPacijenta: (noviPacijent: Pacijent) => dispatch(A_DodajPacijenta(noviPacijent))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(UnosPacijenta);