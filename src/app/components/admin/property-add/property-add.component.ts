import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-property-add',
  imports: [RouterLink, CommonModule],
  templateUrl: './property-add.component.html',
  styleUrl: './property-add.component.css'
})
export class PropertyAddComponent {

}
