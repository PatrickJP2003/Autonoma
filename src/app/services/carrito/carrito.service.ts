import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoItems: any[] = [];
  private carritoItemsSubject = new BehaviorSubject<any[]>([]);
  private showCartSubject = new BehaviorSubject<boolean>(false);

  carritoItems$ = this.carritoItemsSubject.asObservable();
  showCart$ = this.showCartSubject.asObservable();

  addToCart(item: any): void {
    this.carritoItems.push(item);
    this.carritoItemsSubject.next(this.carritoItems);
    this.showCartSubject.next(true); // Abre el carrito automáticamente
  }

  getCartItems(): any[] {
    return this.carritoItems;
  }

  clearCart(): void {
    this.carritoItems = [];
    this.carritoItemsSubject.next(this.carritoItems);
    this.showCartSubject.next(false); // Cierra el carrito
  }

  toggleCartVisibility(): void {
    const currentStatus = this.showCartSubject.value;
    this.showCartSubject.next(!currentStatus);
  }
}
