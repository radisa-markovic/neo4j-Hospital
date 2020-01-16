import React from "react";
import { Link } from "react-router-dom";

class ListaSaOdeljenjima extends React.Component<{}, {}>
{
    render(): JSX.Element
    {
        return(
            <div className="col-sm-6 offset-sm-3 text-center">
                <h1 className="col-sm-6 offset-sm-3 text-center">Odeljenja</h1>
                <div className="form-group">
                    <Link to="/Odeljenja/Kardiovaskularno"
                          className="col-sm-6 offset-sm-3 text-center">
                        <h4>Kardiovaskularno</h4>
                    </Link>
                    <Link to="/Odeljenja/Gastroenterologija"
                          className="col-sm-6 offset-sm-3 text-center">
                        <h4>Gastroenterologija</h4>
                    </Link>
                    <Link to="/Odeljenja/Grudno"
                          className="col-sm-6 offset-sm-3 text-center">
                        <h4>Grudno</h4>
                    </Link>
                    <Link to="/Odeljenja/Ortopedija"
                          className="col-sm-6 offset-sm-3 text-center">
                        <h4>Ortopedija</h4>
                    </Link>
                    <Link to="/Odeljenja/Fizikalno"
                          className="col-sm-6 offset-sm-3 text-center">
                        <h4>Fizikalno</h4>
                    </Link>
                </div>
            </div>
        );
    }
}

export default ListaSaOdeljenjima;