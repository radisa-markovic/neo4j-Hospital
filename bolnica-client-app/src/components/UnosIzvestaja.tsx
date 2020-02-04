import React from "react";
import { Izvestaj } from "../models/Izvestaj";
import { Dispatch } from "redux";
import { A_DodajIzvestaj } from "../store/izvestaji/akcije";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import uniqid from 'uniqid';
import { RootStanje } from "../store";

interface Props
{
    korisnickoImeDoktora: string
}

interface ActionProps
{
    potvrdiIzvestaj: (noviIzvestaj: Izvestaj) => void
}

interface State
{
    IDIzvestaja: string,
    novaDijagnoza: string
}

type KompletanProps = Props & ActionProps & RouteComponentProps<{IDPacijenta: string}>;

//Odeljenja/:Naziv/:IDPacijenta
class UnosIzvestaja extends React.Component<KompletanProps, State>
{
    render(): JSX.Element
    {
        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <h1>Unesi izveštaj za {this.props.match.params.IDPacijenta}</h1>
                <div className="form-group">
                <label className="control-label">Unesi novu dijagnozu:</label>
                    <textarea name="novaDijagnoza" 
                              placeholder="Unesi dijagnozu" 
                              className="form-control"
                              onChange={this.onChangeDijagnoza}/>
                    <button className="btn btn-primary btn-lg"
                            onClick={this.podnesiIzvestaj}>
                        Potvrdi izveštaj
                    </button>
                </div>
            </div>
        );
    }

    onChangeDijagnoza = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        this.setState({ novaDijagnoza: event.target.value });
    }

    podnesiIzvestaj = (event: React.MouseEvent<HTMLButtonElement>): void => {
        let noviIzvestaj: Izvestaj = {
            korisnickoImeDoktora: this.props.korisnickoImeDoktora,
            idPacijenta: this.props.match.params.IDPacijenta,
            idIzvestaja: uniqid("izvestaj-"),
            datumPisanja: this.vratiDatumPisanja(),
            sadrzaj: this.state.novaDijagnoza
        };

        this.props.potvrdiIzvestaj(noviIzvestaj);
        alert(`Uspesno dodat izvestaj`);
        this.props.history.push("/Odeljenja");
    }

    vratiDatumPisanja = (): string => {
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
    return {
        korisnickoImeDoktora: rootStanje.doktorDetalji.doktor.korisnickoIme
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
    return {
        potvrdiIzvestaj: (noviIzvestaj: Izvestaj) => dispatch(A_DodajIzvestaj(noviIzvestaj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnosIzvestaja);