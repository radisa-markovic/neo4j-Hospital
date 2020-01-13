import { LoginDoktoraPodaci, LoginDoktoraProba, AkcijeDoktor, LoginDoktoraUspesan, LoginDoktoraPogresanUsername, LoginDoktoraPogresnaSifra, RegistracijaDoktoraPokusaj, RegistracijaDoktoraUspeh, RegistracijaDoktoraZauzetUsername, OdjaviDoktora } from "./model";
import { Doktor } from "../../models/Doktor";

export const LoginDoktoraPokusaj = (loginDetalji: LoginDoktoraPodaci): LoginDoktoraProba => {
    return {
        type: AkcijeDoktor.LOGIN_DOKTORA_POKUSAJ,
        loginPodaci: loginDetalji
    }
}

//moram malo da doradim API da vraca doktora i da vraca ove kodove nekako
export const LoginDoktoraUspeh = (doktor: Doktor): LoginDoktoraUspesan => {
    return {
        type: AkcijeDoktor.LOGIN_DOKTOR_USPEH,
        doktor: doktor
    }
}

export const LoginDoktoraLosUsername = (): LoginDoktoraPogresanUsername => {
    return {
        type: AkcijeDoktor.LOGIN_DOKTORA_NEPOSTOJECI_USERNAME,
        usernameJeLos: true
    }
}

export const LoginDoktoraLosaSifra = (): LoginDoktoraPogresnaSifra => {
    return {
        type: AkcijeDoktor.LOGIN_DOKTORA_POGRESNA_SIFRA,
        lozinkaJeLosa: true
    }
}

export const RegistracijaDoktoraUspesna = (doktor: Doktor): RegistracijaDoktoraUspeh => {
    return {
        type: AkcijeDoktor.REGISTRACIJA_DOKTORA_USPEH,
        doktor: doktor
    }
}

export const RegistracijeDoktoraLosUsername = (): RegistracijaDoktoraZauzetUsername => {
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