import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FooterComponent, HomeComponent, CommonModule, NgxPaginationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'realestate-pro';
}

