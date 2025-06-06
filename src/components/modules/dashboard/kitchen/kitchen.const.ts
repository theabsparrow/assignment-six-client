import {
  FoodPreferenceOption,
  TCookingDay,
  TKitchenType,
  TMealTime,
} from "@/types/kitchenType";

export const weekDays: TCookingDay[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const kitchenType: TKitchenType[] = ["Home-based", "Commercial"];

export const mealTime: TMealTime[] = ["Breakfast", "Lunch", "Dinner"] as const;

export const foodPreferance: FoodPreferenceOption[] = [
  "Veg",
  "Non-Veg",
  "Mixed",
] as const;

export const dhakaAreas: string[] = [
  "Uttara",
  "Mirpur",
  "Pallabi",
  "Kazipara",
  "Kafrul",
  "Agargaon",
  "Sher-e-Bangla Nagar",
  "Cantonment Area",
  "Banani",
  "Gulshan",
  "Niketan",
  "Shahjadpur",
  "Mohakhali",
  "Bashundhara",
  "Banasree",
  "Aftab Nagar",
  "Baridhara",
  "Uttarkhan",
  "Dakshinkhan",
  "Bawnia",
  "Khilkhet",
  "Tejgaon",
  "Farmgate",
  "Mohammadpur",
  "Rampura",
  "Badda",
  "Satarkul",
  "Beraid",
  "Khilgaon",
  "Vatara",
  "Gabtali",
  "Hazaribagh",
  "Dhanmondi",
  "Segunbagicha",
  "Ramna",
  "Motijheel",
  "Sabujbagh",
  "Lalbagh",
  "Kamalapur",
  "Kakrail",
  "Kamrangirchar",
  "Islampur",
  "Sadarghat",
  "Wari",
  "Kotwali",
  "Sutrapur",
  "Jurain",
  "Dania",
  "Demra",
  "Shyampur",
  "Nimtoli",
  "Matuail",
  "Paribagh",
  "Shahbagh",
  "Paltan",
];
