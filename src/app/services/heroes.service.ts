import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://login-app-c77b1.firebaseio.com';
  constructor(private http: HttpClient) {}
  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((rest: any) => {
        heroe.id = rest.name;
        return heroe;
      })
    );
  }
  actualizarHeroe(heroe: HeroeModel) {
    const HEROETEMP = {
      ...heroe,
    };
    delete HEROETEMP.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, HEROETEMP);
  }
  Delete(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
  getHeroes() {
    return this.http
      .get(`${this.url}/heroes.json`)
      .pipe(map(this.crearArreglo), delay(1500));
  }
  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }
  private crearArreglo(heroesObj: object) {
    const heroes: HeroeModel[] = [];
    console.log(heroes);
    if (heroesObj === null) {
      return [];
    }
    Object.keys(heroesObj).forEach((key) => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }
}
