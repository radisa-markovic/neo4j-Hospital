import React from "react";
import { Izvestaj } from "../models/Izvestaj";

//prezentaciona komponenta koja ne zna za redux...
interface Props
{
    izvestaj: Izvestaj
}

class IzvestajView extends React.Component<Props>
{
    render(): JSX.Element
    {
        const { IDIzvestaja, KorisnickoImeDoktora, sadrzaj, datumPisanja } = this.props.izvestaj;
        return(
            <React.Fragment>
                <h1 className="col-sm-6 offset-sm-3 text-center border">Izvestaji: </h1>
                <div className="col-sm-6 offset-sm-3 text-center border">
                    <p>ID: { IDIzvestaja }</p>
                    <p>Napisao: { KorisnickoImeDoktora }</p>
                    <p>Nalaz: { sadrzaj }</p>
                    <p>Datum pisanja: { datumPisanja }</p>
                </div>
            </React.Fragment>
        );
    }
}

export default IzvestajView;