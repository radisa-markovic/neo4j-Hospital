import React from "react";

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
class IzvestajForma extends React.Component<{}, {}>
{
    render(): JSX.Element
    {
        return(
            <React.Fragment>

            </React.Fragment>
        );
    }
}

export default IzvestajForma;