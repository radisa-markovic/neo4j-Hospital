import React from "react";
import { Izvestaj } from "../models/Izvestaj";
import { Dispatch } from "redux";
import { DodajIzvestaj } from "../store/izvestaji/akcije";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import uniqid from 'uniqid';
import { RootStanje } from "../store";

//ovo treba da bude vezano za pacijenta, i da na klik izlistam stranicu gde su pacijentovi izvestaji

//izvestaj forma treba da bude otprilike ovakvog sadrzaja:
/*
    idIzvestaja: {nesto sto se nekako samo generise} readonly autogen
    Ime pacijenta: {imePacijenta} //provaliti kako da se proslede pacijenti i kako napisati reducer za njih
    Prezime pacijenta: {prezimePacijenta}
    Odeljenje pacijenta: {odeljenjePacijenta} 
    DijagnozaPacijenta: {dijagnozaPacijenta}
    izvestaj napisao: {prijavljeni doktor u tom trenutku} readonly iz reducera
*/

//ovo je idealno da se izvuce iz one graf baze nekako, posto ovo mogu da vezem i za doktora (NAPISAO)..
//..i za pacijenta (POSEDUJE)

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
    componentDidMount(): void
    {
        console.log(this.props.match.params.IDPacijenta);
    }

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
            KorisnickoImeDoktora: this.props.korisnickoImeDoktora,
            idPacijenta: this.props.match.params.IDPacijenta,
            IDIzvestaja: uniqid("izvestaj-"),
            datumPisanja: this.vratiDatumPisanja(),
            sadrzaj: this.state.novaDijagnoza
        };

        console.log(noviIzvestaj);
        this.props.potvrdiIzvestaj(noviIzvestaj);
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
        potvrdiIzvestaj: (noviIzvestaj: Izvestaj) => dispatch(DodajIzvestaj(noviIzvestaj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnosIzvestaja);