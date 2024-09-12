import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CarritoComponent implements OnInit {
  showCart = false;
  carritoItems: any[] = [];
  total = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.carritoItems$.subscribe(items => {
      this.carritoItems = items;
      this.calculateTotal();
    });

    this.carritoService.showCart$.subscribe(show => {
      this.showCart = show;
    });
  }

  toggleCart(): void {
    this.carritoService.toggleCartVisibility();
  }

  closeCart(): void {
    this.carritoService.clearCart();
  }

  removeFromCart(item: any): void {
    this.carritoItems = this.carritoItems.filter(cartItem => cartItem !== item);
    this.calculateTotal();
  }

  buyItems(): void {
    // Implementa la lógica para comprar los items
    console.log('Compra realizada');
    this.carritoService.clearCart(); // Limpia el carrito después de la compra
  }

  private calculateTotal(): void {
    this.total = this.carritoItems.reduce((sum, item) => sum + item.precio, 0);
  }
}
