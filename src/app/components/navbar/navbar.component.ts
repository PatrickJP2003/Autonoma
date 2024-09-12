import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showCart = false;

  constructor(private usersService: UsersService) {}

  isLogged(): boolean {
    return this.usersService.getCurrentUser() !== null;
  }

  onClickLogout(): void {
    this.usersService.logout();
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }
}
