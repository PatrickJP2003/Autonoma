import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Producto } from '../../utils/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productosCollection;

  constructor(private firestore: Firestore) {
    this.productosCollection = collection(this.firestore, 'productos');
  }

  getProductos(): Observable<Producto[]> {
    return from(getDocs(this.productosCollection).then(snapshot => {
      const productos = snapshot.docs.map(doc => doc.data() as Producto);
      console.log('Productos obtenidos:', productos); // Verifica que se obtienen los productos
      return productos;
    }));
  }
}
