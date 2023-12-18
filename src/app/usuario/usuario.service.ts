import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Usuario } from './usuario';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoind:string ="http://localhost:8080/api/usuarios"

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })


  constructor(private http:HttpClient,
    private router:Router) { }


  listarUsuarios(page :number): Observable<any> {
    return this.http.get(this.urlEndPoind + '/page/' + page);
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoind}/${id}`)
      /*captar error desde el back*/
      .pipe(
        catchError(e => {


          this.router.navigate(['/usuarios'])
          /* e=exepcion, error=atributo de exception que contiene el error, mensaje viene del back*/
          swal.fire("Error al editar", e.error.message, 'error');
          return throwError(e);
        })
      )
  }

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.urlEndPoind, usuario, { headers: this.httpHeaders })
      .pipe(
        catchError(e => {

          if (e.status === 404) {
            return throwError(e);
          }
          swal.fire(e.error.mensaje, e.error.error, 'error')
          return throwError(e);
        })
      )
  }


  eliminarCliente(id: any): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoind}/${id}`, { headers: this.httpHeaders })
      .pipe(
        catchError(e => {
          swal.fire(e.error.mensaje, e.error.error, 'error')
          return throwError(e);
        })
      )
  }

}


