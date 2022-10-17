export type OrderSide = "buy" | "sell";

export type TakeProfitType = { 
  id:number,
  profit:number,
  targetePrise:number,
  amoundToBye: number,
  addTakeProfit?:any,
  deleteTakeProfit?:any,
  addNewProfitValue?: any,
  onSubmit?:any;
  isSubmit?:boolean,
}
