import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  currentCard: 'signin' | 'signup' = 'signin';
  accountCreationHint = "Don't have an account?";

  handleChangeCard(): void {
    this.currentCard =
      this.currentCard === 'signin' ? 'signup' : 'signin';
  }
}
