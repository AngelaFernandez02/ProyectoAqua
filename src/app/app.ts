import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./componentes/componente/componente-homepage/header/header";
import { ComponenteInicio } from "./componentes/componente/componente-homepage/componente-inicio/componente-inicio";
import { Footer } from "./componentes/componente/componente-homepage/footer/footer";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 Importa esto
import { Routes } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ComponenteInicio, Footer, HttpClientModule,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ProyectoAqua';
}
