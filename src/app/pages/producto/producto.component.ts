import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos/productos.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Producto } from '../home/utils/producto'; // Ajusta la ruta
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  producto$: Observable<Producto | undefined> = of(undefined); // Cambiado a Observable<Producto | undefined>
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtener el id de los parámetros de la ruta
      this.loadProducto();
    });
  }

  private loadProducto(): void {
    this.producto$ = this.productosService.getProductos().pipe(
      map(productos => productos.find(p => p.id === this.id)), // Filtrar el producto por id
      catchError(() => of(undefined)) // Manejo de errores, devuelve undefined en caso de error
    );
  }
}
