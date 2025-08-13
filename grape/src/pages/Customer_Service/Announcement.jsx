import React from "react";
import Board from "../../components/Board";
import { BaseLayout } from "../../components/Layout";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProductHeader from "../../components/ProductPage/ProductHeader";

const Announcement = () => {
  return (
    <BaseLayout
      header={ProductHeader}
      breadcrumbs={<Breadcrumbs breadcrumbs={["Home", "회사소개", "게시판"]} />}
      title="게시판"
      // subtitle="게시판을 확인하세요"
    >
      <Board tableNames={["Board_Announcement", "Board_Download"]} />
    </BaseLayout>
  );
};

export default Announcement;
