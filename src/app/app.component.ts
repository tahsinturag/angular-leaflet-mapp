/*
Purpose of this file:
This is the main component of our Angular app called 'leaflet-map'.
It's like the homepage or starting point of our website.

Why we need this:
1. It sets up our basic app structure
2. It cleans up any old saved data when the app starts
3. It helps display our web pages
*/

// We import the tools we need from Angular
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// @Component tells Angular this is a special webpage component
@Component({
  selector: 'app-root',      // This is the name we use to show this component in HTML
  standalone: true,          // This means our component can work by itself
  imports: [RouterOutlet],   // This lets us show different pages in our app
  templateUrl: './app.component.html',  // This connects to our HTML file
  styleUrl: './app.component.css',      // This connects to our styling file
})
export class AppComponent {
  // This is the name of our app
  title = 'leaflet-map';

  // ngOnInit runs when our webpage first loads
  ngOnInit() {
    // Print a message to show the component has started
    console.log('app component');
    
    // Clear any old saved information from the web browser's storage
    // (like clearing your desk before starting new homework)
    localStorage.removeItem('divisionId');
    localStorage.removeItem('tabType');
  }
}
