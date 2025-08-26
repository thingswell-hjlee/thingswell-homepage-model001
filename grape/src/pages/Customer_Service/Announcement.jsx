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
          breadcrumbs={<Breadcrumbs breadcrumbs={["Home", "회사소개", "공지사항"]} />}
          title="공지사항"
        />
    <BaseLayout>
        <Board tableNames={["Board_Announcement", "Board_Download"]} />

    </BaseLayout>
    </div>
  );
};

export default Announcement;
