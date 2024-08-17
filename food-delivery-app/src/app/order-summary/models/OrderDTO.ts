import { FoodItem } from "../../shared/models/FoodItem";
import { Restaurant } from "../../shared/models/restaurant";

export interface OrderDTO {
  // These fields must match OrderDTO from MS
  foodItemsList?: FoodItem[]; // Food items added to cart
  userId?: number; // User ID
  restaurant?: Restaurant; // Restaurant in which ordered dishes in cart
}
