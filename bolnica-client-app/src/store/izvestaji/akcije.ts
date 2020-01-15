import { DodavanjeIzvestaja, AkcijeIzvestaji, VracanjeIzvestajaPacijenta, ProsledjivanjeIzvestajaReduceru } from "./model";
import { Izvestaj } from "../../models/Izvestaj";

export const DodajIzvestaj = (noviIzvestaj: Izvestaj): DodavanjeIzvestaja => {
    return {
        type: AkcijeIzvestaji.DODAJ_IZVESTAJ,
        noviIzvestaj: noviIzvestaj
    }
}

export const VratiPacijentoveIzvestaje = (idPacijenta: string): VracanjeIzvestajaPacijenta => {
    return {
        type: AkcijeIzvestaji.VRATI_IZVESTAJE_PACIJENTA,
        IDPacijenta: idPacijenta
    }
}

export const ProslediIzvestajeReduceru = (izvestaji: Izvestaj[]): ProsledjivanjeIzvestajaReduceru => {
    return {
        type: AkcijeIzvestaji.PROSLEDI_IZVESTAJE_REDUCERU,
        izvestaji: izvestaji
    }
}