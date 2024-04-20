import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isClickedAbout = false;
  isClickedShop = false;
  userLoggedIn = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      this.userLoggedIn = true;
    } else {
      this.openLoginDialog();
    }
  }

  toggleClicked(btn: string) {
    if (btn === 'shop') {
      this.isClickedShop = !this.isClickedShop;
      this.isClickedAbout = false;
    } else {
      this.isClickedAbout = !this.isClickedAbout;
      this.isClickedShop = false;
    }
  }

  userSigned() {
    if (this.userLoggedIn) {
      // Perform logout
      localStorage.removeItem('userDetails');
      this.userLoggedIn = false;
    } else {
      // Open login dialog
      this.openLoginDialog();
    }
  }

  private openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Check if login was successful
      console.log(result)
      if (result && result.success) {
        this.userLoggedIn = true;
      }
    });
  }
}