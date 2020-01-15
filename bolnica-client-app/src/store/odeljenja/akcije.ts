import { DodavanjePacijenta, OtpustanjePacijenta, UcitavanjeOdeljenjaIzBaze, ProsledjivanjeOdeljenjaUReducer } from "../odeljenja/model";
import { Pacijent } from "../../models/Pacijent";
import { AkcijeOdeljenja } from "./model";

export const DodajPacijenta = (noviPacijent: Pacijent): DodavanjePacijenta => {
    return {
        type: AkcijeOdeljenja.DODAJ_PACIJENTA,
        pacijent: noviPacijent
    }
}

export const OtpustiPacijenta = (idPacijenta: string): OtpustanjePacijenta => {
    return {
        type: AkcijeOdeljenja.OTPUSTI_PACIJENTA,
        IDPacijenta: idPacijenta
    }
}

export const UcitajOdeljenjeIzBaze = (nazivOdeljenja: string): UcitavanjeOdeljenjaIzBaze => {
    return {
        type: AkcijeOdeljenja.UCITAJ_ODELJENJE_IZ_BAZE,
        nazivOdeljenja: nazivOdeljenja
    }
}

export const ProslediOdeljenjeReduceru = (pacijenti: Pacijent[]): ProsledjivanjeOdeljenjaUReducer => {
    return {
        type: AkcijeOdeljenja.PROSLEDI_ODELJENJE_U_REDUCER,
        pacijenti: pacijenti
    }
}