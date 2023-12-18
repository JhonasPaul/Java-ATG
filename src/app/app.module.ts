import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PaginatorComponent } from './paginator/paginator.component';
import{HttpClientModule} from '@angular/common/http';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormComponent } from './usuario/form.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {path:'', redirectTo: 'usuarios', pathMatch:'full'},
  {path:'usuarios', component: UsuarioComponent},
  {path:'usuarios/page/:page', component:UsuarioComponent},
  {path:'usuarios/form/:id', component:FormComponent},
  {path:'usuarios/form', component:FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,

    PaginatorComponent,
    UsuarioComponent,
    FormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule

  ],
  providers: [
    provideClientHydration()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
