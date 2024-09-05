import { Component, OnInit } from '@angular/core';
import * as productoData from '../../../../public/json/productoData.json';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Producto } from '../home/utils/producto';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], // Agrega CommonModule aquí
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent  {
  producto?: Producto;
  id: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.producto = ((productoData as any).default as Producto[]).find(producto => producto.id === this.id)!;
    });
  }
}
