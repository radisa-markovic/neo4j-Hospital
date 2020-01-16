import React from "react";
import { Izvestaj } from "../models/Izvestaj";
import { RouteComponentProps, Link } from "react-router-dom";
import { RootStanje } from "../store";
import { connect } from "react-redux";
import IzvestajView from "./IzvestajView";
import { Dispatch } from "redux";
import { VratiPacijentoveIzvestaje, ResetujStatuseAkcija } from "../store/izvestaji/akcije";

import vojaKalas from '../slikeZaHome/VojaKalas.jpg'

interface Props
{
    izvestaji: Izvestaj[],
    izvestajiSuUcitani: boolean,
    izvestajiPostoje: boolean
}

interface ActionProps
{
    ucitajPacijentoveIzvestaje: (IDPacijenta: string) => void,
    povratakUOdeljenje: () => void 
}

class Izvestaji extends React.Component<Props & ActionProps & RouteComponentProps<{IDPacijenta: string}>, {}>
{
    componentDidMount(): void
    {
        if(!this.props.izvestajiSuUcitani)
            this.props.ucitajPacijentoveIzvestaje(this.props.match.params.IDPacijenta);
    }

    componentWillUnmount()
    {
        this.props.povratakUOdeljenje();
    }

    render(): JSX.Element
    {
        if(!this.props.izvestajiSuUcitani)
            return this.renderujLoading();
        
        return (
            <div>
                <h1 className="col-sm-6 offset-sm-3 text-center border">
                    Izvestaji pacijenta: {this.props.match.params.IDPacijenta}
                </h1>
                <h1 className="col-sm-6 offset-sm-3 text-center border">
                     <Link to="/Odeljenja">Nazad u odeljenja</Link> 
                </h1>
                {
                    this.props.izvestajiPostoje === true?
                         this.props.izvestaji.map((izvestaj: Izvestaj, redniBroj: number) => {
                         return <IzvestajView key={redniBroj} izvestaj={izvestaj}/>
                         })
                        : <h1 className="com-sm-6 offset-sm-1 text-center">Pacijent nema izveštaje</h1> 
                }
            </div>
        );
    }

    renderujLoading(): JSX.Element
    {
        return(
            <div className="col-sm-6 offset-sm-3 text-center border">
                <h1 className="col-sm-6 offset-sm-3 text-center border">LOADING...</h1>
                <img src={vojaKalas} alt="Nema slike" className="col-sm-12 offset-sm-1 text-center"/>
            </div>
        );
    }
}

const mapStateToProps = (rootStanje: RootStanje): Props => {
    const { izvestajDetalji } = rootStanje;
    return {
        izvestaji: izvestajDetalji.izvestaji,
        izvestajiSuUcitani: izvestajDetalji.izvestajiSuUcitani,
        izvestajiPostoje: izvestajDetalji.izvestajiPostoje
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
    return {
        ucitajPacijentoveIzvestaje: (IDPacijenta: string) => dispatch(VratiPacijentoveIzvestaje(IDPacijenta)),
        povratakUOdeljenje: () => dispatch(ResetujStatuseAkcija())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Izvestaji);