import React from 'react';
import SolutionDetailPage from '../../pages/rnd/SolutionDetailPage';
import ProductHeader from '../ProductPage/ProductHeader';
import ProductInfo from '../ProductPage/ProductInfo';
import useTranslation from '../../hooks/useTranslation';
import rnd from '../../assets/header_image/rnd.jpg';

const RndSolutionPage = ({
  breadcrumbs,
  solutionData,
  blocks
}) => {
  const { t } = useTranslation();
  return (
    <>
      <ProductHeader image={rnd} alt={t('ui3.rndSolution.headerAlt')} />
      <div className="product-page-content">
        <div className="container">
          <ProductInfo
            productName={solutionData.title}
            productTitle={solutionData.title}
            description={solutionData.description}
            breadcrumbs={breadcrumbs}
          />
          <SolutionDetailPage
            solutionVariant="default"
            blocks={blocks}
          />
        </div>
      </div>
    </>
  );
};

export default RndSolutionPage;
