import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username = 'Iris';
  isLoggedIn = true;

  constructor(private router: Router) { }

  toggleHome() {
    this.router.navigate(['']);
  }
}
