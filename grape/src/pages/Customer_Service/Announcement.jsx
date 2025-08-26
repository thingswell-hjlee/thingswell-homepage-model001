import React from "react";
import Board from "../../components/Board";
import { BaseLayout } from "../../components/Layout";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProductHeader from "../../components/ProductPage/ProductHeader";
import company from "../../assets/header_image/company.jpg";

const Announcement = () => {
  return (
    <div className="main-content">
      <ProductHeader 
        image={company} 
        alt="company"
      />
      <BaseLayout
        breadcrumbs={<Breadcrumbs breadcrumbs={["Home", "고객지원", "공지사항"]} />}
        title="공지사항"
      >
        <Board tableNames={["Board_Announcement", "Board_Download"]} />
      </BaseLayout>
    </div>
  );
};

export default Announcement;
