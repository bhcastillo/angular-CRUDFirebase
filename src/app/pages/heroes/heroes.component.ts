import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = false;
  constructor(private heroesServices: HeroesService) {}

  ngOnInit(): void {
    this.cargando = true;
    this.heroesServices.getHeroes().subscribe((rest) => {
      this.heroes = rest;
      this.cargando = false;
    });
  }
  Delete(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: '¿Esá seguro?',
      text: `Está seguro que desea borrar a ${heroe.nombre}`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      showCancelButton: true,

      icon: 'warning',
    }).then((resp) => {
      if (resp.value) {
        this.heroes.splice(i, 1);
        this.heroesServices.Delete(heroe.id).subscribe();
      }
    });
  }
}
