import { Component } from '@angular/core';
import { Restaurant } from '../../shared/models/restaurant';
import { Router } from '@angular/router';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-listing',
  templateUrl: './restaurant-listing.component.html',
  styleUrl: './restaurant-listing.component.css'
})
export class RestaurantListingComponent {
  /**
   * Need to get:
      1. restaurantList: list of all available restaurants.
      2. getRandomImage(): Generate random number of images.
      3. onOrderNowClick(restaurant.id): go to specific restaurant's food catalogue page.
   */

  // In here, in order to avoid having error when defining a variable without initialize value to it:
  //  go to tsconfig.json, add line: "strictPropertyInitialization": false,
  public restaurantList: Restaurant[];

  // When restaurant listing component gets loaded, we need all data to be loaded
  //  => In this method, call to service and get list of all restaurants and populate it here
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllRestaurants();
  }

  // We need 2 services here:
  //  - route: when clicking on OrderNow, forward to foodCatalogue page => need router
  //  - restaurantService: to call to defined services in restaurant.service.ts (getAllRestaurants())
  constructor(private router: Router, private restaurantService: RestaurantService) { }

  // Call on ngOnInit
  getAllRestaurants() {
    // Since the return type of getAllRestaurants() method is Observable => you have to subscribe it
    //  => Subscribe her: for all data that I am getting here on subscription to this method (a GET call to localhost:9091 to RestaurantList MS)
    //    whenever get the data, add it to restaurantList
    this.restaurantService.getAllRestaurants().subscribe(
      data => {
        this.restaurantList = data;
      }
    )
  }

  getRandomImage(): string {
    const imageCount = 9; // Adjust this number based on the number of iamges in your assets folder
    const randomIndex = this.getRandomNumber(1, imageCount);
    return `${randomIndex}.jpg`; // Replace with your image file name pattern
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max-min+1)) + min;
  }

  onOrderNowClick(id: number) {
    this.router.navigate(['/food-catalogue', id]);
  }
}
