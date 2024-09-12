import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, getDoc } from '@angular/fire/firestore';
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
      const productos = snapshot.docs.map(doc => ({
        id: Number(doc.id),
        ...(doc.data() as Omit<Producto, 'id'>)
      }));
      return productos;
    }));
  }

  getProductoById(id: number): Observable<Producto> {
    const productoDoc = doc(this.firestore, 'productos', id.toString());
    return from(getDoc(productoDoc).then(docSnap => {
      if (docSnap.exists()) {
        return { id: Number(docSnap.id), ...docSnap.data() as Omit<Producto, 'id'> } as Producto;
      } else {
        throw new Error('Producto no encontrado');
      }
    }));
  }
}
