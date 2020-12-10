import { v4 as uuid } from 'uuid'
import { validateString, throwErrorIsClassIsNotSameInstance } from './validation'
import { isElementExistInArray, findWrapperFunction } from './utils'
import Product from './Product'

class Cart {
  constructor() {
    this.id = uuid();
    this.items = [];
    this.discountCodes = ["nike10", "nike20"];
    this.selectedCode = null
    this.sum = { price: 0, quantity: 0 };
  }

  addProduct(product) {
    throwErrorIsClassIsNotSameInstance(product, Product)
    const findMyProduct = findWrapperFunction(product)

    const foundIndex = this.items.findIndex(findMyProduct);

    if (foundIndex !== -1) {
      this.items[foundIndex].quantity += 1;
    } else {
      this.items.push(product);
    }
    return `Product ${product.id} was updated`;
  }


  deleteFromCart(product) {
    throwErrorIsClassIsNotSameInstance(product, Product)
    const isItemSameProduct = findWrapperFunction(product) // factory

    const itemIndexToRemove = this.items.findIndex(isItemSameProduct);
    if (itemIndexToRemove === -1) {
      throw new Error('No product')
    }

    this.items.splice(itemIndexToRemove, 1);
    return `Product ${product.id} was deleted`;
  }

  addDiscountCode(code) {
    validateString(code)

    if (isElementExistInArray(code, this.discountCodes)) {
      throw new Error('Code does not exist')
    }
    this.selectedCode = code
  }


  sumCart() {
    const totals = this.items.reduce(function (accumulator, { discountedPrice, quantity }) {
      accumulator.price += discountedPrice
      accumulator.quantity += quantity
      return accumulator
    }, { price: 0, quantity: 0 });

    if (this.selectedCode !== null) {
      const codeNumbers = /\d{2}$/;
      const getCodeNumbers = this.selectedCode.match(codeNumbers)
      const priceWithDiscount = totals.price - (totals.price * getCodeNumbers) / 100
      totals.price = priceWithDiscount
      this.sum = totals
      return `Cart was updated`;
    }

    this.sum = totals
    return `Cart was updated`;
  }


}

export default Cart
