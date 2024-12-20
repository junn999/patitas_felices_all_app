import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NetworkGuard } from './guards/network.guard';

const routes: Routes = [
  {
    path: 'iniciosesionautenticado',
    loadChildren: () => import('./iniciosesionautenticado/iniciosesionautenticado.module').then( m => m.IniciosesionautenticadoPageModule)
  },
  {
    path: '',
    redirectTo: 'iniciosesionautenticado',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'formmascotaperdida',
    loadChildren: () => import('./formmascotaperdida/formmascotaperdida.module').then( m => m.FormmascotaperdidaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'ubicacion',
    loadChildren: () => import('./ubicacion/ubicacion.module').then( m => m.UbicacionPageModule)
  },
  {
    path: 'busqueda',
    loadChildren: () => import('./busqueda/busqueda.module').then( m => m.BusquedaPageModule)
  },
  {
    path: 'formmascotaadopcion',
    loadChildren: () => import('./formmascotaadopcion/formmascotaadopcion.module').then( m => m.FormmascotaadopcionPageModule)
  },
  {
    path: 'formulariosmascotas',
    loadChildren: () => import('./formulariosmascotas/formulariosmascotas.module').then( m => m.FormulariosmascotasPageModule)
  },
  {
    path: 'editarperfil',
    loadChildren: () => import('./editarperfil/editarperfil.module').then( m => m.EditarperfilPageModule)
  },
  {
    path: 'iniciosesionnormal',
    loadChildren: () => import('./iniciosesionnormal/iniciosesionnormal.module').then( m => m.InicioSesionNormalPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'tema',
    loadChildren: () => import('./tema/tema.module').then( m => m.TemaPageModule)
  },
  {
    path: 'autenticacion',
    loadChildren: () => import('./autenticacion/autenticacion.module').then( m => m.AutenticacionPageModule)
  },
  {
    path: 'cambiocontra',
    loadChildren: () => import('./cambiocontra/cambiocontra.module').then( m => m.CambiocontraPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./seguridad/seguridad.module').then( m => m.SeguridadPageModule)
  },
  {
    path: 'tema',
    loadChildren: () => import('./tema/tema.module').then( m => m.TemaPageModule)
  },
  {
    path: 'reestablecercontrasena',
    loadChildren: () => import('./reestablecercontrasena/reestablecercontrasena.module').then( m => m.ReestablecercontrasenaPageModule)

  },
  {
    path: 'detalles',
    loadChildren: () => import('./detalles/detalles.module').then(m => m.DetallesPageModule)
  },
  {
    path: 'temap',
    loadChildren: () => import('./temap/temap.module').then( m => m.TemapPageModule)
  },
  {
    path: 'idioma',
    loadChildren: () => import('./idioma/idioma.module').then( m => m.IdiomaPageModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./inbox/inbox.module').then( m => m.InboxPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'solicitud',
    loadChildren: () => import('./solicitud/solicitud.module').then( m => m.SolicitudPageModule)
  },
  {
    path: 'e404',
    loadChildren: () => import('./e404/e404.module').then(m => m.E404PageModule)
  },
  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }