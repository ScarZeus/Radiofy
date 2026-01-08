import { Component } from '@angular/core';
import { Navbar } from "../../component/navbar/navbar";

@Component({
  selector: 'app-home',
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    username: string = "Bro"
}
