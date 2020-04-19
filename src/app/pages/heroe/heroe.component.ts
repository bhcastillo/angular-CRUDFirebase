import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel();
  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.heroesService.getHeroe(id).subscribe((resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }
  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('fomulario no valido');
      return;
    }
    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false,
    });

    Swal.showLoading();

    let peticion: Observable<any>;
    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }
    peticion.subscribe((res) => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'se actualizo correctamente',
        icon: 'success',
      });
    });
    this.router.navigate(['/heroes']);
  }
}
