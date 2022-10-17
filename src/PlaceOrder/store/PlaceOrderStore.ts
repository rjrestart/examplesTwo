import { observable, computed, action, toJS } from "mobx";

import { OrderSide, TakeProfitType } from "../model";


export class PlaceOrderStore {
  @observable activeOrderSide: OrderSide = "buy";
  @observable price: number = 0;
  @observable amount: number = 0;
  @observable profit: number = 2;
  @observable amoundToBye: number = 20;
  @observable startTotal: number = 0;
  @observable progectProfit: number = 0;
  @observable targetPrice: number = 0;
  @observable allSummValueProfit: number=0;
  @observable allSummValueAmount: number =0;
  @observable isCheckSubmit: boolean = false;
  @observable resultSumm: number = 0
  @observable eventsButton: any;
  @observable takeProfitArray: TakeProfitType[] = []

  @computed get total(): number {
    return this.price * this.amount;
  }

  @action.bound
  public setOrderSide(side: OrderSide) {
    this.activeOrderSide = side;
    this.resultProfit()
  }
  @action.bound
  public addOneTakeProfit(id: number, odlProfit: number) {
    let newId = id + 1
    this.profit = odlProfit + 2
    let newTakeProfit = { id: newId, profit: this.profit, targetePrise: this.price + this.price * this.profit, amoundToBye: 100 }
    this.takeProfitArray = [newTakeProfit]
    this.resultProfit()
  }
  @action.bound
  public addTakeProfit(id: number, odlProfit: number) {
    let newId = id + 1
    this.profit = odlProfit + 2
    let newTakeProfit = { id: newId, profit: this.profit, targetePrise: this.price + this.price * this.profit, amoundToBye: this.amoundToBye }
    this.takeProfitArray = [...this.takeProfitArray, newTakeProfit]
    this.resultProfit()
  }
  @action.bound
  public setButtonEvent(event:any) { 
     this.eventsButton = event
  }

  @action.bound
  public CheckForm(check: boolean) {
    this.isCheckSubmit = check
    this.AllSummValueProfit()
    this.AllSummValueAmount()
  }

  @action.bound
  public resetResultSumm() {
    this.resultSumm = 0
  }

  @action.bound
  public deleteTakeProfit(id: number) {
    if (toJS(this.takeProfitArray).length === 1) return
    this.takeProfitArray = toJS(this.takeProfitArray).filter((item: TakeProfitType) => item.id !== id)
    this.resultProfit()
  }

  @action.bound
  public addNewProfitValue(id: number, newValue: string) {
    this.profit = +newValue
    this.takeProfitArray.map((item) => {
      if (item.id === id) {
        return item.profit = +newValue,
          item.targetePrise = this.price + this.price * this.profit
      }
    })
    this.resultProfit()
  }

  @action.bound
  public addNewTargetPriceValue(id: number, newValue: string) {
    this.targetPrice = +newValue
    this.takeProfitArray.map((item) => {
      if (item.id === id) {
        return item.targetePrise = +newValue
      }
    })
    this.resultProfit()
  }

  @action.bound
  public resultProfit() {
    this.resultSumm = 0
    if(this.takeProfitArray.length === 1) { 
      this.takeProfitArray.forEach((item) => {
        this.resultSumm  = this.activeOrderSide  == 'buy'?  item.amoundToBye * (item.targetePrise - this.price) : this.amount * (this.price - item.targetePrise)
    })}
    else {
    this.takeProfitArray.forEach((item) => {
      let result = item.targetePrise * this.amount - this.startTotal
      let summ = result * item.amoundToBye / 100
      this.resultSumm += summ
    })
    }
  }

  @action.bound
  public AllSummValueProfit() {
    this.allSummValueProfit = 0
    this.takeProfitArray.forEach((item): number => {

      let summ = item.profit
      return this.allSummValueProfit += summ
      })
    }

  @action.bound
  public AllSummValueAmount() {
    this.allSummValueAmount = 0
    this.takeProfitArray.forEach((item): number => {

      let summ = item.amoundToBye
      return this.allSummValueAmount += summ
      })
    }


  @action.bound
  public addamoundToByeValue(id: number, newValue: string) {
    this.amoundToBye = +newValue
    this.takeProfitArray.map((item) => {
      if (item.id === id) {
        return item.amoundToBye = +newValue
      }
    })
    this.resultProfit()
  }


  @action.bound
  public setAmount(amount: number) {
    this.amount = amount;
  }

  @action.bound
  public setTotal(total: number) {
    this.startTotal = total
    this.amount = this.price > 0 ? total / this.price : 0;
  }

  @action.bound
  public setPrice(price: number) {
    this.price = price;
    this.targetPrice = price;
  }
}
