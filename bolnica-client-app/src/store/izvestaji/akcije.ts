import { DodajIzvestaj, AkcijeIzvestaji, VratiPacijentoveIzvestaje, ProslediIzvestajeReduceru, ProsledjivanjeIzvestajaReduceruGreska, ResetujStatuseZaUcitavanje } from "./model";
import { Izvestaj } from "../../models/Izvestaj";

export const A_DodajIzvestaj = (noviIzvestaj: Izvestaj): DodajIzvestaj => {
    return {
        type: AkcijeIzvestaji.DODAJ_IZVESTAJ,
        noviIzvestaj: noviIzvestaj
    }
}

export const A_VratiPacijentoveIzvestaje = (idPacijenta: string): VratiPacijentoveIzvestaje => {
    return {
        type: AkcijeIzvestaji.VRATI_IZVESTAJE_PACIJENTA,
        IDPacijenta: idPacijenta
    }
}

export const A_ProslediIzvestajeReduceru = (izvestaji: Izvestaj[]): ProslediIzvestajeReduceru => {
    return {
        type: AkcijeIzvestaji.PROSLEDI_IZVESTAJE_REDUCERU,
        izvestaji: izvestaji
    }
}

export const A_ProsledjivanjeIzvestajaGreska = (): ProsledjivanjeIzvestajaReduceruGreska => {
    return {
        type: AkcijeIzvestaji.PROSLEDI_IZVESTAJE_REDUCERU_GRESKA
    }
}

export const A_ResetujStatuseAkcija = (): ResetujStatuseZaUcitavanje => {
    return {
        type: AkcijeIzvestaji.VRATI_STATUSE_ZA_UCITAVANJE
    }
}