import { Pacijent } from "../../models/Pacijent";

export enum AkcijeOdeljenja
{
    DODAJ_PACIJENTA = "[Akcije odeljenja] Dodaj pacijenta",
    OTPUSTI_PACIJENTA = "[Akcije odeljenja] Otpusti pacijenta",
    UCITAJ_ODELJENJE_IZ_BAZE = "[Akcije odeljenja] Ucitaj odeljenje iz baze",
    PROSLEDI_ODELJENJE_U_REDUCER = "[Akcije odeljenja] Prosledi odeljenje u reducer"
}

export interface DodavanjePacijenta
{
    type: AkcijeOdeljenja,
    pacijent: Pacijent //on u sebi sadrzi naziv odeljenja gde ce da se smesti
}

export interface OtpustanjePacijenta
{
    type: AkcijeOdeljenja,
    IDPacijenta: string
}

export interface UcitavanjeOdeljenjaIzBaze //ovo moze preko Route parametara
{
    type: AkcijeOdeljenja,
    nazivOdeljenja: string
}

export interface ProsledjivanjeOdeljenjaUReducer
{
    type: AkcijeOdeljenja,
    pacijenti: Pacijent[]
}