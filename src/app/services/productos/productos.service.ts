import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productosCollection;

  constructor(private firestore: Firestore) {
    // Inicializa la colección aquí
    this.productosCollection = collection(this.firestore, 'productos');
  }

  getProductos(): Observable<any[]> {
    return from(getDocs(this.productosCollection).then(snapshot => 
      snapshot.docs.map(doc => doc.data())
    ));
  }
}
