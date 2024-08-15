/*
 * Restaurant restaurant fetched from BE will came in format:
    - id
    - name
    - address
    - city
    - restaurantDescription
  => JSON will map exactly to this format
 */

// Since there will not be any logic go through this TS file, I will not define a class here, but an interface
// This will be same as DTO/Entity as in Backend MS
export interface Restaurant {
  id: number;
  name?: string;
  address?: string;
  city?: string;
  restaurantDescription?: string;
}
