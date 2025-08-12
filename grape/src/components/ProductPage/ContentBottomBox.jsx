import React from 'react';
import './ContentBottomBox.css';
import ImageWithCaption from '../Common/ImageWithCaption';

const ContentBottomBox = ({
  title,
  description,
  photo,
  photos,
  photoCaption,
  photoCaptions,
  children,
}) => {
  const photoList = Array.isArray(photos) ? photos.filter(Boolean) : [];
  const captionsList = Array.isArray(photoCaptions) ? photoCaptions : [];
  const hasTwoOrMore = photoList.length >= 2;
  const hasSingle = !hasTwoOrMore && (photoList.length === 1 || !!photo);

  return (
    <div className="content-bottom-box">
      <div className="bottom-box-content">
        {title ? <p>{title}</p> : null}
        {description ? <p>{description}</p> : null}

        {hasTwoOrMore ? (
          <div className="bottom-box-images">
            <ImageWithCaption
              className="bottom-box-image"
              src={photoList[0]}
              alt="bottom-box-photo-1"
              caption={captionsList[0]}
              position="top-left"
            />
            <ImageWithCaption
              className="bottom-box-image"
              src={photoList[1]}
              alt="bottom-box-photo-2"
              caption={captionsList[1]}
              position="top-left"
            />
          </div>
        ) : hasSingle ? (
          <ImageWithCaption
            className="bottom-box-image"
            src={photoList[0] || photo}
            alt="bottom-box-photo"
            caption={photoCaption}
            position="top-left"
          />
        ) : null}

        {children}
      </div>
    </div>
  );
};

export default ContentBottomBox;


