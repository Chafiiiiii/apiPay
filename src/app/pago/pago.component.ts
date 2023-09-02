import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit{
  public defaultPrice: string = '9.99';
  public payPalConfig?: IPayPalConfig;

  public customerName = '';
  public customerEmail = '';
  public customerAddress = '';
  public selectedPaymentMethod = '';
  public cart: any[] = [];
  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;

  items: {
    name: any;
    quantity: any;
    category: string;
    unit_amount: { currency_code: string; value: any };
  }[] = [];
  total = 0;

  @ViewChild('priceElem', { static: false }) priceElem?: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.initConfig('0');
  }

  addItemToCart(item: any): void {
    let itemIndex = this.cart.findIndex((cartItem) => cartItem.id === item.id);
    if (itemIndex === -1) {
      this.cart.push({ ...item, quantity: 1 });
    } else {
      this.cart[itemIndex].quantity++;
    }
    this.updateTotal();
  }

  removeItemFromCart(item: any): void {
    let itemIndex = this.cart.findIndex((cartItem) => cartItem.id === item.id);
    if (itemIndex > -1) {
      if (this.cart[itemIndex].quantity === 1) {
        this.cart.splice(itemIndex, 1);
      } else {
        this.cart[itemIndex].quantity--;
      }
    }
    this.updateTotal();
  }

  updateTotal() {
    this.cart.forEach((cartItem) => {
      this.items.push({
        name: cartItem.name,
        quantity: cartItem.quantity,
        category: 'DIGITAL_GOODS',
        unit_amount: {
          currency_code: 'USD',
          value: cartItem.price,
        },
      });
      this.total += parseFloat(cartItem.price) * cartItem.quantity;
    });
    this.initConfig(this.total + '');
  }

  private initConfig(price: string): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AYfU82BZXXaVv95vSW87p5wF45RWZIqDAqnaTpebkw91wd6s5lCZTJa0uikOXZhuSQwH4iITxhRzC0bX',
      createOrderOnClient: (data: any) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: price,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: price,
                  },
                },
              },
              items: this.items,
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        shape: 'pill',
        color: 'blue',
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (
        data: any,
        actions: { order: { get: () => Promise<any> } }
      ) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data: any) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data: any, actions: any) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;
      },
      onError: (err: any) => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data: any, actions: any) => {
        console.log('onClick', data, actions);
        this.resetStatus();
      },
      onInit: (data: any, actions: any) => {
        console.log('onInit', data, actions);
      },
    };
  }

  private resetStatus(): void {
    this.items = [];
    this.total = 0;
    this.showError = false;
    this.showSuccess = false;
  }
}
