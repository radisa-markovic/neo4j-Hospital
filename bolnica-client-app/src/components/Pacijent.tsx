import React from "react";

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
    id: string,
    ime: string,
    prezime: string,
    dijagnoza: string,
    datumSmestanja: string
}

interface ActionProps
{
    otpustiPacijenta: (idPacijenta: string) => void
}

class Pacijent extends React.Component<Props & ActionProps, {}>
{
    render(): JSX.Element
    {
        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <p>ID: {this.props.id}</p>
                <p>Ime: {this.props.ime}</p>
                <p>Prezime: {this.props.prezime}</p>
                <p>Dijagnoza: </p>
                <p>Datum smeštanja: {this.props.datumSmestanja}</p>
            </div>
        );
    }
}

export default Pacijent;