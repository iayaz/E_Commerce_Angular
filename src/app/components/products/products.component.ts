import { ApiService } from './../../service/api.service';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../service/auth/auth.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  public products: any[] = [];
  userLoggedIn = false;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.api.getAllProducts().subscribe((res) => {
      this.products = res;
    });
    this.auth.currentUser$.subscribe((user) => {
      this.userLoggedIn = !!user;
    });
  }
  private openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success) {
        this.userLoggedIn = true;
      }
    });
  }

  addToCart(selected: any) {
    if (!this.userLoggedIn) {
      this.openLoginDialog();
    } else {
      console.log(selected);
    }
  }
}
