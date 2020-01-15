import { Izvestaj } from "../../models/Izvestaj";
import { Action } from "redux";
import { AkcijeIzvestaji, ProsledjivanjeIzvestajaReduceru, VracanjeIzvestajaPacijenta, DodavanjeIzvestaja } from "./model";

export interface StanjeIzvestaja
{
    IDPacijenta: string,
    izvestaji: Izvestaj[]
}

const pocetnoStanje: StanjeIzvestaja = {
    IDPacijenta: '',
    izvestaji: []
};

export default function reducer(stanje: StanjeIzvestaja = pocetnoStanje, akcija: Action<any>): StanjeIzvestaja
{
    switch(akcija.type)
    {
        case AkcijeIzvestaji.VRATI_IZVESTAJE_PACIJENTA:
        {
            const { IDPacijenta } = akcija as VracanjeIzvestajaPacijenta;
            return {
                ...stanje,
                IDPacijenta: IDPacijenta
            }
        }

        case AkcijeIzvestaji.PROSLEDI_IZVESTAJE_REDUCERU:
        {
            const { izvestaji } = akcija as ProsledjivanjeIzvestajaReduceru;
            return {
                ...stanje,
                izvestaji: izvestaji
            }
        }

        case AkcijeIzvestaji.DODAJ_IZVESTAJ:
        {
            const { noviIzvestaj } = akcija as DodavanjeIzvestaja;
            return {
                ...stanje,
                izvestaji: [...stanje.izvestaji, noviIzvestaj]
            }
        }

        default:
            return stanje;
    }
}