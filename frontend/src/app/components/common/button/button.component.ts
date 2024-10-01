import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label: string = 'Botón';
  @Input() onClick!: (params?: any) => void; // Permite que sea opcional
  @Input() params: any; // Parámteros opcionales para el clic

  handleClick() {
    if (this.onClick) {
      this.onClick(this.params); // Llama a la función con parámetros si existen
    }
  }
}
