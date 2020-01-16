import { Pacijent } from "../../models/Pacijent";
import { Action } from "redux";
import { AkcijeOdeljenja, DodavanjePacijenta, OtpustanjePacijenta, ProsledjivanjeOdeljenjaUReducer, UcitavanjeOdeljenjaIzBaze } from "./model";
import PacijentView from "../../components/PacijentView";

export interface StanjeOdeljenja
{
    nazivOdeljenja: string,
    pacijenti: Pacijent[]
}

const pocetnoStanje: StanjeOdeljenja = {
    nazivOdeljenja: '',
    pacijenti: []
};

export default function reducer(stanje: StanjeOdeljenja = pocetnoStanje, akcija: Action<any>): StanjeOdeljenja
{
    switch(akcija.type)
    {
        case AkcijeOdeljenja.UCITAJ_ODELJENJE_IZ_BAZE:
        {
            const { nazivOdeljenja } = akcija as UcitavanjeOdeljenjaIzBaze;
            return {
                ...stanje,
                nazivOdeljenja: nazivOdeljenja
            };
        }

        case AkcijeOdeljenja.PROSLEDI_ODELJENJE_U_REDUCER:
        {
            const { pacijenti } = akcija as ProsledjivanjeOdeljenjaUReducer;
            return {
                ...stanje,
                pacijenti: pacijenti
            }
        }

        case AkcijeOdeljenja.DODAJ_PACIJENTA:
        {
            const { pacijent } = akcija as DodavanjePacijenta;
            return {
                ...stanje,
                pacijenti: [...stanje.pacijenti, pacijent]
            }
        }

        case AkcijeOdeljenja.OTPUSTI_PACIJENTA:
        {
            const { IDPacijenta } = akcija as OtpustanjePacijenta;
            return {
                ...stanje,
                pacijenti: stanje.pacijenti.filter(pacijent => pacijent.idPacijenta !== IDPacijenta)
            }
        }

        default:
            return stanje;
    }
}