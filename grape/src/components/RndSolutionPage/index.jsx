import React from 'react';
import ProductHeader from '../ProductPage/ProductHeader';
import ProductInfo from '../ProductPage/ProductInfo';
import ApplicationCardsSection from '../ApplicationCardsSection';
import FeatureDescription from '../FeatureDescription';
import rnd from '../../assets/header_image/rnd.jpg';

const RndSolutionPage = ({ 
  breadcrumbs, 
  solutionData, 
  blocks 
}) => {
  return (
    <>
      <ProductHeader image={rnd} alt="연구개발" />
      <div className="product-page-content">
        <div className="container">
          <ProductInfo
            productName={solutionData.title}
            productTitle={solutionData.title}
            description={solutionData.description}
            breadcrumbs={breadcrumbs}
          />
          {blocks && blocks.map((block, index) => {
            switch (block.type) {
              case 'applicationCards':
                return (
                  <ApplicationCardsSection
                    key={index}
                    boxName={block.props.boxName}
                    applicationCardsData={block.data}
                    columnsPerRow={block.props.columnsPerRow}
                  />
                );
              case 'features':
                return (
                  <div key={index}>
                    {block.data.map((feature, featureIndex) => (
                      <FeatureDescription
                        key={featureIndex}
                        image={feature.image}
                        title={feature.title}
                        description={feature.description}
                        largeImage={feature.largeImage}
                      />
                    ))}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default RndSolutionPage;
