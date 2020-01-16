import { DodavanjePacijenta, OtpustanjePacijenta, UcitavanjeOdeljenjaIzBaze, ProsledjivanjeOdeljenjaUReducer, ProslediPraznoOdeljenjeUReducer, VratiStatuseNaPocetno } from "../odeljenja/model";
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

export const ProslediPraznoOdeljenjeAkcija = (): ProslediPraznoOdeljenjeUReducer => {
    return {
        type: AkcijeOdeljenja.PROSLEDI_PRAZNO_ODELJENJE_U_REDUCER
    }
}

export const VratiStatuseNaPocetnoAkcija = (): VratiStatuseNaPocetno => {
    return {
        type: AkcijeOdeljenja.VRATI_STATUSE_NA_POCETNO
    }
}