import { LoginDoktoraPodaci, LoginDoktoraProba, AkcijeDoktor, LoginDoktoraUspeh, LoginDoktoraPogresanUsername as LoginDoktoraNepostojeciUsername, LoginDoktoraPogresnaSifra, RegistracijaDoktoraPokusaj, RegistracijaDoktoraUspeh, RegistracijaDoktoraZauzetUsername, OdjaviDoktora } from "./model";
import { Doktor } from "../../models/Doktor";

export const A_LoginDoktoraProba = (loginDetalji: LoginDoktoraPodaci): LoginDoktoraProba => {
    return {
        type: AkcijeDoktor.LOGIN_DOKTORA_POKUSAJ,
        loginPodaci: loginDetalji
    }
}

export const A_LoginDoktoraUspeh = (doktor: Doktor): LoginDoktoraUspeh => {
    return {
        type: AkcijeDoktor.LOGIN_DOKTOR_USPEH,
        doktor: doktor
    }
}

export const A_LoginDoktoraNepostojeciUsername = (): LoginDoktoraNepostojeciUsername => {
    return {
        type: AkcijeDoktor.LOGIN_DOKTORA_NEPOSTOJECI_USERNAME,
        usernameJeLos: true
    }
}

export const A_LoginDoktoraPogresnaSifra = (): LoginDoktoraPogresnaSifra => {
    return {
        type: AkcijeDoktor.LOGIN_DOKTORA_POGRESNA_SIFRA,
        lozinkaJeLosa: true
    }
}

export const A_RegistracijaDoktoraPokusaj = (noviDoktor: Doktor): RegistracijaDoktoraPokusaj => {
    return {
        type: AkcijeDoktor.REGISTRACIJA_DOKTORA_POKUSAJ,
        noviDoktor: noviDoktor
    }
}

export const A_RegistracijaDoktoraUspeh = (doktor: Doktor): RegistracijaDoktoraUspeh => {
    return {
        type: AkcijeDoktor.REGISTRACIJA_DOKTORA_USPEH,
        doktor: doktor
    }
}

export const A_RegistracijaDoktoraZauzetUsername = (): RegistracijaDoktoraZauzetUsername => {
    return {
        type: AkcijeDoktor.REGISTRACIJA_DOKTORA_ZAUZET_USERNAME,
        usernameJeZauzet: true
    }
}

export const OdjavaDoktora = (): OdjaviDoktora => {
    return {
        type: AkcijeDoktor.ODJAVI_DOKTORA
    }
}