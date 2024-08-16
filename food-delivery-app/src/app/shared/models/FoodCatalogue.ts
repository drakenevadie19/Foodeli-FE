import { FoodItem } from "./FoodItem";
import { Restaurant } from "./restaurant";

// Menu of a restaurant
export interface FoodCatalogue {
  //  - List of food items (Menu)
  foodItemsList: FoodItem[];
  //  - Restaurant details
  restaurant: Restaurant;
}
