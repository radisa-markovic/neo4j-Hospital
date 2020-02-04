import { Pacijent } from "../../models/Pacijent";

export enum AkcijeOdeljenja
{
    DODAJ_PACIJENTA = "[Akcije odeljenja] Dodaj pacijenta",
    OTPUSTI_PACIJENTA = "[Akcije odeljenja] Otpusti pacijenta",
    UCITAJ_ODELJENJE_IZ_BAZE = "[Akcije odeljenja] Ucitaj odeljenje iz baze",
    PROSLEDI_ODELJENJE_U_REDUCER = "[Akcije odeljenja] Prosledi odeljenje u reducer",
    PROSLEDI_PRAZNO_ODELJENJE_U_REDUCER = "[Akcije odeljenja] Prosledi prazno odeljenje u reducer",
    VRATI_STATUSE_NA_POCETNO = "[Akcije odeljenja] Vrati statuse na pocetno"
}

export interface DodajPacijenta
{
    type: AkcijeOdeljenja,
    pacijent: Pacijent //on u sebi sadrzi naziv odeljenja gde ce da se smesti
}

export interface OtpustiPacijenta
{
    type: AkcijeOdeljenja,
    IDPacijenta: string
}

export interface UcitajOdeljenjaIzBaze //ovo moze preko Route parametara
{
    type: AkcijeOdeljenja,
    nazivOdeljenja: string
}

export interface ProslediOdeljenjeReduceru
{
    type: AkcijeOdeljenja,
    pacijenti: Pacijent[]
}

export interface ProslediPraznoOdeljenje
{
    type: AkcijeOdeljenja
}

export interface VratiStatuseNaPocetno
{
    type: AkcijeOdeljenja
}