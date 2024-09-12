import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Producto } from '../home/utils/producto';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private router: Router, private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  onClickProducto(producto: Producto): void {
    this.router.navigate(['/producto', producto.id]);
  }
}
