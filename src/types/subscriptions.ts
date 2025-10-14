export type Category = "snacks" | "lunch" | "breakfast";

export type Subscriptions = {
  [K in Category]: number;
};

export type MonthlyReport =  {
    [month: string]: {
      total: number;
      breakfast: number;
      lunch: number;
      snacks: number;
    };
  
};
