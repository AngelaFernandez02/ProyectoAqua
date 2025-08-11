import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./componentes/componente/componente-homepage/header/header";
import { Footer } from "./componentes/componente/componente-homepage/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ProyectoAqua';
}
