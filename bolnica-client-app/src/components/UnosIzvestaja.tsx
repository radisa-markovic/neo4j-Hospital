import React from "react";
import { Doktor } from "../models/Doktor";
import { Izvestaj } from "../models/Izvestaj";
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
    idPacijenta: string,
    imePacijenta: string,
    prezimePacijenta: string,
    odeljenjePacijenta: string,
    korisnickoImeDoktora: string
}

interface ActionProps
{
    potvrdiIzvestaj: (noviIzvestaj: Izvestaj) => void
}

interface State
{
    identifikator: string,
    novaDijagnoza: string
}

//Odeljenja/:Naziv/:IDPacijenta
class UnosIzvestaja extends React.Component<Props & ActionProps, State>
{
    render(): JSX.Element
    {
        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <h1>Unesi izveštaj</h1>
                <div className="form-group">
                <label className="control-label">Ime pacijenta:</label>
                    <input readOnly={true}
                           type="text" 
                           name="ime" 
                           value={this.props.imePacijenta} 
                           className="form-control"/>
                    <label className="control-label">Prezime pacijenta:</label>
                    <input readOnly={true} 
                           type="text" 
                           name="prezime" 
                           value={this.props.prezimePacijenta} 
                           className="form-control"/>
                <label className="control-label">Unesi novu dijagnozu:</label>
                    <textarea name="novaDijagnoza" 
                              placeholder="Unesi dijagnozu" 
                              className="form-control"
                              onChange={this.onChangeDijagnoza}/>
                </div>
            </div>
        );
    }

    onChangeDijagnoza = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        this.setState({ novaDijagnoza: event.target.value });
    }
}

const mapStateToProps = (rootStanje: RootStanje): Props => {
    const { doktorDetalji, izvestajDetalji, odeljenjaDetalji } = rootStanje;
    return {
        idPacijenta: "prosledi preko rute",
        odeljenjePacijenta: odeljenjaDetalji.nazivOdeljenja,
        imePacijenta: "ili preko rute da unesem, ili da unesem preko reducera nekako",
        prezimePacijenta: "isto kao ime, tj isto vazi",
        korisnickoImeDoktora: doktorDetalji.doktor.korisnickoIme
    }
}

export default UnosIzvestaja;