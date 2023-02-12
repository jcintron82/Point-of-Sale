// import { OrderPadElements } from
import { useState } from "react";
import "../css/orderpad.css";
export { OrderPad, orderPadArr, orderFunc };

const orderPadArr = [];
const orderFunc = {};
const finalOrderArr = [];
const priceArr = [];
const qtyArr = [];

function OrderPad() {
  const [order, setArr] = useState();
  const [price1, setPrice] = useState();
  const [qty, setQty] = useState();

  orderFunc.newOrder = () => {
    orderPadArr.forEach((item, index) => {
      //Parsing the decimal value to be displayed
      const productPrice = JSON.stringify(item.message[0].Price);
      const parsedPrice = JSON.parse(productPrice);
      let numberDecimal = parsedPrice["$numberDecimal"];
      let priceString = parseInt(numberDecimal);

      let productItem = JSON.stringify(item.message[0].Item).replaceAll('"','');
      //Do not take out and try to do setArr() on line45  with something else, 
      //unexpected bug where first entry is skipped will arise
      const formattedItemlist = JSON.stringify(finalOrderArr)
        .replaceAll('"', "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll(/\\/g, "");

      const formattedQty = parseInt(item.message[0].qty);

      if (finalOrderArr.includes(productItem)) {
        let index = finalOrderArr.indexOf(productItem);
        const parsed = parseInt(priceArr[index]);
        priceArr[index] = parsed + priceString;
        setPrice(priceArr[index]);
        qtyArr[index] = (qtyArr[index] + 1)
      } else {
        finalOrderArr.push(productItem);
        priceArr.push(priceString);
        qtyArr.push(formattedQty)
        setArr(formattedItemlist);
        setPrice(priceString);
        console.log(finalOrderArr);

      }
      orderPadArr.splice(0);
    });
  };

  return (
    <div className="orderpadwrap">
      {/* <h1>Current Order</h1> */}
      <div className="orderpad-ols-wrap">
        <ol className="orderpad-items-wrap">
          {/* <li>{order}</li> */}
          {finalOrderArr.map((item, index) => (
            <li key={index}>{item}
   
            </li>
          ))}
        </ol>
        <ol>
          {qtyArr.map((qty, index) => (
            <li className="priceli" key={index}>Qty: {qty}</li>
          ))}
        </ol>
        <ol>
          {priceArr.map((price, index) => (
            <li className="priceli" key={index}>Total: {price}</li>
          ))}
        </ol>
        
      </div>
    </div>
  );
}

export default OrderPad;
