import * as saga from 'redux-saga/effects';
import { AkcijeDoktor, LoginDoktoraProba, RegistracijaDoktoraPokusaj } from './model';
import { A_LoginDoktoraNepostojeciUsername, A_LoginDoktoraPogresnaSifra, A_LoginDoktoraUspeh, A_RegistracijaDoktoraUspeh, A_RegistracijaDoktoraZauzetUsername } from './akcije';

const DoktoriOsnovniURL: string = "https://localhost:44389/api/Doktor";

export function* rootSagaZaDoktore()
{
    yield saga.all([saga.fork(posmatrajZahteve)]);
}

function* posmatrajZahteve()
{
    yield saga.takeEvery(AkcijeDoktor.REGISTRACIJA_DOKTORA_POKUSAJ, registrujDoktora);
    yield saga.takeEvery(AkcijeDoktor.LOGIN_DOKTORA_POKUSAJ, ulogujDoktora);
}

function* ulogujDoktora(akcija: LoginDoktoraProba)
{
    const { loginPodaci } = akcija;
    
    //ovo je ili broj ili Doktor, ruzna API metoda, al ono, sta je tu je
    let rezultatFetcha: any = yield uputiZahtevKaBazi("POST", 
                                                       `${DoktoriOsnovniURL}/UlogujDoktora`, 
                                                        loginPodaci);
    
    switch(rezultatFetcha)
    {
        case 1001: yield saga.put(A_LoginDoktoraNepostojeciUsername()); break;
        
        case 1002: yield saga.put(A_LoginDoktoraPogresnaSifra()); break;
         
        default: yield saga.put(A_LoginDoktoraUspeh(rezultatFetcha)); break;
         
    }

}

function* registrujDoktora(akcija: RegistracijaDoktoraPokusaj)
{
    let { noviDoktor } = akcija;
    
    //--->> ovo vraca ona dva koda, ono da je sve OK, i da nije
    const statusKodRegistracije: number = yield uputiZahtevKaBazi("POST", 
                                                   `${DoktoriOsnovniURL}/RegistrujDoktora`, 
                                                    noviDoktor);
    
    if(statusKodRegistracije === 1001)
        yield saga.put(A_RegistracijaDoktoraZauzetUsername());
    else
        yield saga.put(A_RegistracijaDoktoraUspeh(noviDoktor));
}

function* uputiZahtevKaBazi(metoda: string, URL: string, podaci?: any)//podaci su opcioni, valjda ovako ide
{
    let podaciZaPost: RequestInit = {
        body: JSON.stringify(podaci),
        method: metoda,
        headers:
        {
            'Content-Type': 'application/json',
            'mode': 'no-cors',
            'Accept': 'application/json, text/plain, */*'
        }
    };

    let podaciZaGet: RequestInit = {
        method: metoda,
        headers: 
        {
            'Content-Type': 'application/json',
            'mode': 'no-cors',
            'Accept': 'application/json, text/plain, */*'
        }
    };

    let ishodFetcha = podaci? yield fetch(URL, podaciZaPost) : yield fetch(URL, podaciZaGet);
    
    //------>> ovo mozda moze i da se promeni, malo sam umoran da ga stelujem, al ono, nek se nadje kao napomena
    if(ishodFetcha.ok)
        return yield ishodFetcha.json();
    else
        return ishodFetcha.status.toString();
}