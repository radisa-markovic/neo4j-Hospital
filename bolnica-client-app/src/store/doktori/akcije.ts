import { LoginDoktoraPodaci, LoginDoktoraProba, AkcijeDoktor } from "./model";

export const LoginDoktoraPokusaj = (loginDetalji: LoginDoktoraPodaci): LoginDoktoraProba => {
    return {
        type: AkcijeDoktor.LOGIN_DOKTORA_POKUSAJ,
        loginPodaci: loginDetalji
    }
}