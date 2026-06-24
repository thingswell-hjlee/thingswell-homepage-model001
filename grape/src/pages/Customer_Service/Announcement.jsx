import React from "react";
import Board from "../../components/Board";
import { BaseLayout } from "../../components/Layout";
import ProductHeader from "../../components/ProductPage/ProductHeader";
import useTranslation from "../../hooks/useTranslation";
import company from "../../assets/header_image/company.jpg";

const Announcement = () => {
  const { t } = useTranslation();
  return (
    <div className="main-content">
      <ProductHeader 
        image={company} 
        alt="company"
      />
      <BaseLayout
        breadcrumbs={[t('announcement.breadcrumbs.0'), t('announcement.breadcrumbs.1')]}
        title={t('announcement.title')}
      >
        <Board tableNames={["Board_Announcement", "Board_Download"]} />
      </BaseLayout>
    </div>
  );
};

export default Announcement;
