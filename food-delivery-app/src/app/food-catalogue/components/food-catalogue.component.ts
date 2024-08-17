import { Component } from '@angular/core';
import { FooditemService } from '../service/fooditem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodCatalogue } from '../../shared/models/FoodCatalogue';
import { FoodItem } from '../../shared/models/FoodItem';

@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.component.html',
  styleUrl: './food-catalogue.component.css'
})
export class FoodCatalogueComponent {
  /**
   * Things need to create and get from BE support FE:
   1. onCheckOut() function: Handle function when "Check out" button is clicked
    => navigate to view summary order service page and show list of food items
   2. foodItemResponse: Get restaurant details and FoodItem of that particular restaurant by ID,
    given by (/food-catalogue, id from "Order Now" button of the Restaurant Listing Page)
    Contains of:
    - restaurant details: Restaurant
    - Menu of the restaurant: FoodCatalogue = FoodItem[]
   3. decrement(food) function: Minus quantity of chosen food by 1 => food.quantity --
   4. increment(food) function: Increase quantity of chosen food by 1 => food.quantity ++
   */

  restaurantId: number;
  foodItemResponse: FoodCatalogue;
  // List of all dishes we added to the cart (chosen dishes)
  foodItemCart: FoodItem[] = [];
  orderSummary: FoodCatalogue;

  // Inject Food Item Service Layer
  // router: to router to Order service page (Order Summary page)
  // route: fetch ID from activatedRoute =>Whoever call you, you will be using the activated route,
  //   which is going to provide you information from where you have been getting routed
  //   Use to get id from function of onOrderNowClicked(): this.router.navigate(['/food-catalogue', id]);
  constructor(private foodItemService: FooditemService, private router:Router, private route: ActivatedRoute) { }

  // Therer are 2 tasks to do: get ID and get all restaurant and foodItem list using this service
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe(params => {
      // Since type of params.get('id') is string | null => adding if else to make sure that type of it is not null
      //  (type string | null can not assign to type string) => paramID not null => convert to integer (+paramID)
      const paramID = params.get('id');
      if (paramID != null) {
        this.restaurantId = +paramID;
      }
    });

    this.getFoodItemsFromRestaurantID(this.restaurantId);
  }

  getFoodItemsFromRestaurantID(restaurantId: number) {
    this.foodItemService.getFoodItemsByRestaurantId(this.restaurantId).subscribe(
      data => {
        this.foodItemResponse = data;
      }
    )
  }

  onCheckOut() {
    // this.router.navigate(['/order', this.restaurantId]);

    // On checkout, we need to send the complete list of foodItem that we have incremented or decremented added to the food cart
    //  We also need to send restaurant Details to order service
    this.foodItemCart;
    this.orderSummary = {
      foodItemsList: [],
      restaurant: null
    }

    this.orderSummary.foodItemsList = this.foodItemCart;
    if (this.foodItemResponse.restaurant != null) this.orderSummary.restaurant = this.foodItemResponse.restaurant;
    // console.log(JSON.stringify(this.orderSummary));
    this.router.navigate(['/orderSummary'], { queryParams: { data: JSON.stringify(this.orderSummary) } });
  }

  increment(food: any) {
    console.log(this.foodItemCart);
    food.quantity++;
    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    // Check if the cart is empty?
    if (index === -1) {
      // If the record does not exist, add it to the array
      this.foodItemCart.push(food);
    } else {
      // If the record exist, update it in the array
      this.foodItemCart[index] = food;
    }
  }

  decrement(food: any) {
    console.log(this.foodItemCart);
    if (food.quantity > 0) {
      food.quantity --; // Each food a FoodItem interface

      const index = this.foodItemCart.findIndex(item => item.id === food.item);
      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        // Of the record exist, update it in the array
        // Update the existing food item in the cart's quantity
        this.foodItemCart[index] = food;
      }
    }
  }
}
