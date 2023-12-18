import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
usuarios:Usuario[];
paginador:any;
  constructor(private usuarioService:UsuarioService,
    private acticatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.acticatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.usuarioService.listarUsuarios(page)
        .subscribe(response => {
          this.usuarios = response.content as Usuario[];
          this.paginador = response;
        });
    });
  }

  eliminarUsuario(usuario: Usuario): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro/a de eliminar a este/a usuario/a?',
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'CANCELAR',
      cancelButtonColor: '#d33',
      buttonsStyling: false, 
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarCliente(usuario.id).subscribe(
          response => {
/* no mostrar el usuario que se acaba de eliminar */
            this.usuarios = this.usuarios.filter(usu => usu !== usuario)
        swal.fire(
          'Usuario Eliminado!',
          `Usuario ${usuario.nombres} Eliminado con exito.`,
          'success'
        )
      }
    )

  }
})
}

  }




