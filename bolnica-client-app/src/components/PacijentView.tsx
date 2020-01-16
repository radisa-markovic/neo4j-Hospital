import React from "react";
import { Pacijent } from "../models/Pacijent";
import { Dispatch } from "redux";
import { OtpustiPacijenta } from "../store/odeljenja/akcije";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//------->> ovo se sad moze nalaziti unutar neke druge komponente koja sadrzi sve te pacijente,
//---->> pa onda se tu ovaj djavo prikaze (znaci nova ruta i novi link ka toj ruti)

/*
    Ovo ce da ima sledeci izgled:
    idPacijenta: {idPacijenta}
    imePacijenta: {imePacijenta}
    prezimePacijenta: {prezimePacijenta}
    dijagnoza(odeljenje, bem ga): {dijagnoza/odeljenje}
    datumSmestanja: {datumSmestanja}

    prikaziDosadasnjeIzvestaje(), //<<--- treba da otvori neku listu i da izlista pojedinacne izvestaje 
    (prezentaciona komponenta koja "ne zna" za redux)
    dodajNoviIzvestaj(), //<<--- otvara onu IzvestajFormu i njoj preko parametara rute prosledjuje id, ime,..
    ..prezime (datum se sam generise u trenutku pisanja)
    otpustiPacijenta() //<<---- ovo i ono iznad ima neke fore sa akrobacijama oko graf baze, upita i brisanja
*/
interface Props
{
    pacijent: Pacijent,
    odeljenje: string
}

interface ActionProps
{
    otpustiPacijenta: (idPacijenta: string) => void
}

class PacijentView extends React.Component<Props & ActionProps, {}>
{
    render(): JSX.Element
    {
        const { idPacijenta: IDPacijenta, ime, prezime, datumSmestanja } = this.props.pacijent;
        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <p className="control-label">ID: {IDPacijenta}</p>
                <p className="control-label">Ime: {ime}</p>
                <p className="control-label">Prezime: {prezime}</p>
                <p className="control-label">Odeljenje: {this.props.odeljenje}</p>
                <p className="control-label">Datum smeštanja: {datumSmestanja}</p>
                <div className="btn-group-vertical">
                    <Link to={`/vratiIzvestaje/${IDPacijenta}`}
                            className="btn btn-primary btn-sm">
                        Pogledaj izveštaje
                    </Link>
                    <Link to={`/Odeljenja/${this.props.odeljenje}/${IDPacijenta}`} 
                          className="btn btn-warning btn-sm">
                            Dodaj izveštaj
                    </Link>
                    <button className="btn btn-danger btn-sm"
                            onClick={this.otpustiPacijenta}>
                            Otpusti pacijenta
                    </button>
                </div>
            </div>
        );
        //putanja do forme: `/Odeljenja/${this.props.odeljenje}/${IDPacijenta}`
    }

    otpustiPacijenta = (): void => {
        this.props.otpustiPacijenta(this.props.pacijent.idPacijenta);//da vidim dal je toliko prosto....
    }

    dodajIzvestaj = (): void => {
        //ideja je da ovde prvo opalim akciju koja ce da upise pacijenta u reducer za pacijenta "na obradi"
        //(koji cu da napravim), pa da preko history.push({negde}) ucitam onu komponentu koja ce istog pacijenta
        //...da pokupi iz reducera
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
    return {
        otpustiPacijenta: (idPacijenta: string) => dispatch(OtpustiPacijenta(idPacijenta))
    }
}

export default connect(null, mapDispatchToProps)(PacijentView);