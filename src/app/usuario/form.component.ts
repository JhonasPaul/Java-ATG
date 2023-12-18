import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit{
  public usuario: Usuario = new Usuario();
  public errores: string[];


  constructor(private acticatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.acticatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.usuarioService.obtenerUsuarioPorId(id)
          .subscribe((usuario) => {
            this.usuario = usuario
          })
      }
    });

  }

  crearUsuario(): void {
    this.usuarioService.crearUsuario(this.usuario)
      .subscribe(json => {
        this.router.navigate(['/usuarios'])
        swal.fire('Nuevo Usuario', `${json.mensaje}`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
        }
      );
  }

}
