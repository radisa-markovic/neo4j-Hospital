import React from "react";
import { Pacijent } from "../models/Pacijent";
import { Dispatch } from "redux";
import { OtpustiPacijenta } from "../store/odeljenja/akcije";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
    
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
    return {
        otpustiPacijenta: (idPacijenta: string) => dispatch(OtpustiPacijenta(idPacijenta))
    }
}

export default connect(null, mapDispatchToProps)(PacijentView);