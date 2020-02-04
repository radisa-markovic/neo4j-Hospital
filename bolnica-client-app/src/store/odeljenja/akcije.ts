import { DodajPacijenta, OtpustiPacijenta, UcitajOdeljenjaIzBaze, ProslediOdeljenjeReduceru, ProslediPraznoOdeljenje, VratiStatuseNaPocetno } from "../odeljenja/model";
import { Pacijent } from "../../models/Pacijent";
import { AkcijeOdeljenja } from "./model";

export const A_DodajPacijenta = (noviPacijent: Pacijent): DodajPacijenta => {
    return {
        type: AkcijeOdeljenja.DODAJ_PACIJENTA,
        pacijent: noviPacijent
    }
}

export const A_OtpustiPacijenta = (idPacijenta: string): OtpustiPacijenta => {
    return {
        type: AkcijeOdeljenja.OTPUSTI_PACIJENTA,
        IDPacijenta: idPacijenta
    }
}

export const A_UcitajOdeljenjeIzBaze = (nazivOdeljenja: string): UcitajOdeljenjaIzBaze => {
    return {
        type: AkcijeOdeljenja.UCITAJ_ODELJENJE_IZ_BAZE,
        nazivOdeljenja: nazivOdeljenja
    }
}

export const A_ProslediOdeljenjeReduceru = (pacijenti: Pacijent[]): ProslediOdeljenjeReduceru => {
    return {
        type: AkcijeOdeljenja.PROSLEDI_ODELJENJE_U_REDUCER,
        pacijenti: pacijenti
    }
}

export const A_ProslediPraznoOdeljenje = (): ProslediPraznoOdeljenje => {
    return {
        type: AkcijeOdeljenja.PROSLEDI_PRAZNO_ODELJENJE_U_REDUCER
    }
}

export const A_VratiStatuseNaPocetno = (): VratiStatuseNaPocetno => {
    return {
        type: AkcijeOdeljenja.VRATI_STATUSE_NA_POCETNO
    }
}