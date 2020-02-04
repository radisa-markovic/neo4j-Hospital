import * as saga from 'redux-saga/effects';
import { AkcijeIzvestaji, VratiPacijentoveIzvestaje, DodajIzvestaj } from './model';
import { A_ProslediIzvestajeReduceru, A_ProsledjivanjeIzvestajaGreska } from './akcije';

const IzvestajiOsnovniURL: string = "https://localhost:44389/api/Izvestaj";

export function* rootSagaZaIzvestaje()
{
    yield saga.all([saga.fork(posmatrajZahteve)]);
}

function* posmatrajZahteve()
{
    yield saga.takeEvery(AkcijeIzvestaji.VRATI_IZVESTAJE_PACIJENTA, ucitajIzvestaje);
    yield saga.takeEvery(AkcijeIzvestaji.DODAJ_IZVESTAJ, dodajIzvestaj);
}

function* ucitajIzvestaje(akcija: VratiPacijentoveIzvestaje)
{
    let { IDPacijenta } = akcija;
    
    //--->> ovo vraca ona dva koda, ono da je sve OK, i da nije
    const pacijentoviIzvestaji: any = yield uputiZahtevKaBazi("GET", 
                                                   `${IzvestajiOsnovniURL}/VratiPacijentoveIzvestaje/${IDPacijenta}`); 
    
    if(pacijentoviIzvestaji === 1001)
        yield saga.put(A_ProsledjivanjeIzvestajaGreska())
    else
        yield saga.put(A_ProslediIzvestajeReduceru(pacijentoviIzvestaji));
}

function* dodajIzvestaj(akcija: DodajIzvestaj)
{
    const { noviIzvestaj } = akcija;
    
    yield uputiZahtevKaBazi("POST", `${IzvestajiOsnovniURL}/DodajIzvestaj`, noviIzvestaj);
}

function* uputiZahtevKaBazi(metoda: string, URL: string, podaci?: any)//podaci su opcioni, valjda ovako ide
{
    let HTTPZahtev: RequestInit = {
        method: metoda,
        headers:
        {
            'Content-Type': 'application/json',
            'mode': 'no-cors',
            'Accept': 'application/json, text/plain, */*'
        }
    };

    if(podaci)
        HTTPZahtev.body = JSON.stringify(podaci);

    let ishodFetcha = yield fetch(URL, HTTPZahtev);
    
    if(metoda !== "POST" && metoda !== "DELETE")
        return yield ishodFetcha.json();
    else
        return ishodFetcha.status.toString();
}