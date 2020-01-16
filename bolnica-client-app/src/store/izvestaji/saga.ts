import * as saga from 'redux-saga/effects';
import { AkcijeIzvestaji, VracanjeIzvestajaPacijenta, DodavanjeIzvestaja } from './model';
import { ProslediIzvestajeReduceru, ProsledjivanjeIzvestajaGreska } from './akcije';

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

function* ucitajIzvestaje(akcija: VracanjeIzvestajaPacijenta)
{
    let { IDPacijenta } = akcija;
    
    //--->> ovo vraca ona dva koda, ono da je sve OK, i da nije
    const pacijentoviIzvestaji: any = yield uputiZahtevKaBazi("GET", 
                                                   `${IzvestajiOsnovniURL}/VratiPacijentoveIzvestaje/${IDPacijenta}`); 
    
    console.log(pacijentoviIzvestaji);
    if(pacijentoviIzvestaji === 1001)
        yield saga.put(ProsledjivanjeIzvestajaGreska())
    else
        yield saga.put(ProslediIzvestajeReduceru(pacijentoviIzvestaji));
}

function* dodajIzvestaj(akcija: DodavanjeIzvestaja)
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
    
    //------>> ovo mozda moze i da se promeni, malo sam umoran da ga stelujem, al ono, nek se nadje kao napomena
    if(metoda !== "POST" && metoda !== "DELETE") //novo krpljenje 
        return yield ishodFetcha.json();
    else
        return ishodFetcha.status.toString();
}