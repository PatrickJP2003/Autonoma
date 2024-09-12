import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { CarritoComponent } from './pages/carrito/carrito.component'; // Importa el CarritoComponent
import { permissionsGuard } from './guards/permissions.guard';
import { warningsGuard } from './guards/warnings.guard';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },  
    { path: 'productos', component: ProductosComponent, canActivate: [permissionsGuard] },
    { path: 'nosotros', component: NosotrosComponent, ...canActivate(() => redirectUnauthorizedTo(['home'])) },
    { path: 'producto/:id', component: ProductoComponent }, // Ruta para el producto con ID
    { path: 'carrito', component: CarritoComponent }, // Ruta para el carrito
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canDeactivate: [warningsGuard] },
    { path: '**', component: Error404Component }, // Ruta para errores 404
];
