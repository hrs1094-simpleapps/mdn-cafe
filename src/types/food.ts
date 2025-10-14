import { Subscriptions } from "./subscriptions";

export type Food = {
  snacksOnSpot: number;
  lunchOnSpot: number;
  breakfastOnSpot: number;
  snacksSubscriber: number;
  lunchSubscriber: number;
  breakfastSubscriber: number;
};

export type TotalRecord = {
  subscriptions: Subscriptions;
  food: Food;
  totalSubscribers: number;
  totalFood: number;
};
