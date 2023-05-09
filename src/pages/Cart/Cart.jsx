import React, { useState, useEffect } from 'react';
import './Cart.scss';
import ProductInCart from './componet/ProductInCart';
import ProductRecommendation from './componet/ProductRecommendation';

const DELIVERY_FEE = 3000;

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [recommandList, setRecommandList] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [checkItems, setCheckItems] = useState([]);

  const checkAll = checked => {
    checked ? setCheckItems(cartList.map(item => item.id)) : setCheckItems([]);
  };

  const checkSingle = (checked, id) => {
    checked
      ? setCheckItems(prev => [...prev, id])
      : setCheckItems(checkItems.filter(item => item !== id));
  };

  useEffect(() => {
    fetch('/data/cartData.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setCartList(data);
      });

    fetch('/data/recommandData.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setRecommandList(data);
      });
  }, [checkItems]);

  return (
    <div className="cart">
      <div className="cart-container">
        <section className="shopping-basket">
          <h1 className="shopping-basket-title">장바구니</h1>
          <div>
            <input
              id="check-all"
              className="check-box"
              type="checkbox"
              onChange={e => checkAll(e.target.checked)}
              checked={checkItems.length === cartList.length}
            />
            <label htmlFor="check-all" className="select-all">
              전체 선택
            </label>
            <button className="delete-button-select">삭제</button>
          </div>
          <ul>
            {cartList.map(item => (
              <ProductInCart
                key={item.id}
                id={item.id}
                checkItems={checkItems}
                checkSingle={checkSingle}
                cartList={cartList}
                setProductPrice={setProductPrice}
                productPrice={productPrice}
              />
            ))}
          </ul>
        </section>
        <section className="order-history">
          <h1 className="order-history-title">주문 내역</h1>
          <div className="price-info order-price">
            <span>상품 금액</span>
            <span>{productPrice}원</span>
          </div>
          <div className="price-info delivery-price">
            <span>배송비</span>
            <span>{DELIVERY_FEE}원</span>
          </div>
          <div className="price-info total-price">
            <span>총 결제 금액</span>
            <span>{productPrice + DELIVERY_FEE}원</span>
          </div>
          <button className="order-button">주문결제</button>
        </section>
      </div>
      <section className="product-recommendation-list">
        <div className="product-recommendation-list-title-box">
          <h2 className="product-recommendation-list-title">추천상품</h2>
        </div>
        <ul className="product-in-recommendation">
          {recommandList.map(item => (
            <ProductRecommendation
              key={item.id}
              recommandList={recommandList}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Cart;
