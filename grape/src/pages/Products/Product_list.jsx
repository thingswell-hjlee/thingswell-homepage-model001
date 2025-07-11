import React from "react";
import "./Product_list.css"; // 그리드 스타일을 여기에 추가
import welding from '../../assets/welding.jpg';
import grinding from '../../assets/grinding.jpg';
import construction from '../../assets/construction.jpg';
import manufacturing from '../../assets/manufacturing.jpg';
import fire from '../../assets/fire.jpg';
import dangerous from '../../assets/dangerous.jpg';
import falldown from '../../assets/falldown.jpg';
import collision from '../../assets/collision.jpg';
import collapse from '../../assets/collapse.jpg';
import poe from '../../assets/poe.jpg';
import { Link } from "react-router-dom";

const products = [
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: welding,
    link: "/product/1"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: grinding,
    link: "/product/2"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: construction,
    link: "/product/3"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: manufacturing,
    link: "/product/4"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: fire,  
    link: "/product/5"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: dangerous,
    link: "/product/6"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: falldown,
    link: "/product/7"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: collision,
    link: "/product/8"
  },
  {
    name: "DS-2CD2026G2-I(U)",
    desc: "2 MP AcuSense Fixed Mini Bullet Network Camera",
    img: collapse,
    link: "/product/9"
  },
  // 제품 추가 시 위 내용 복사하여 추가할 것
];

const ProductList = () => (
  <div className="page-container">
    <div className="page-content">
      <div className="page-layout">
        <div className="main-content">
          <div className="solutions-section">
            <div className="product-list-container">
              <h1 className="product-list-title">제품 리스트</h1>
              <div className="product-grid">
                {products.map((product, idx) => (
                    <Link to={product.link}>
                  <div className="product-card" key={idx}>
                      <img src={product.img} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{product.desc}</p>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductList;
