import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Producto } from '../home/utils/producto';
import { ProductosService } from '../../services/productos/productos.service';
import { CarritoService } from '../../services/carrito/carrito.service';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  productos: Producto[] = [];

  constructor(
    private router: Router,
    private productosService: ProductosService,
    private carritoService: CarritoService // Inyecta el servicio de carrito
  ) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  onClickProducto(producto: Producto): void {
    this.router.navigate(['/producto', producto.id]);
  }

  addToCart(producto: Producto): void {
    this.carritoService.addToCart(producto); // Añade el producto al carrito y abre la barra lateral
  }
}
