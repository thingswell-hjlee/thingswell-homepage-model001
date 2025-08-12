import React from 'react';
import './ImageWithCaption.css';

/**
 * ImageWithCaption
 * - 이미지 위에 캡션(텍스트)을 일관된 스타일로 오버레이합니다.
 * - 부모에서 전달되는 className으로 컨테이너 레이아웃을 제어하세요
 *   (예: position, border, min-height 등은 기존 클래스 사용).
 */
const ImageWithCaption = ({
  src,
  alt = '',
  caption,
  className,
  imgClassName,
  captionClassName,
  position = 'top-left', // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  visibleOnHover = false,
  ...rest
}) => {
  const positionClassMap = {
    'top-left': 'iwc-pos-top-left',
    'top-right': 'iwc-pos-top-right',
    'bottom-left': 'iwc-pos-bottom-left',
    'bottom-right': 'iwc-pos-bottom-right',
    center: 'iwc-pos-center',
  };

  const containerClasses = [
    'image-with-caption',
    className || '',
    visibleOnHover ? 'iwc-hover' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const imgClasses = ['iwc-image', imgClassName || ''].filter(Boolean).join(' ');
  const captionClasses = [
    'iwc-caption',
    positionClassMap[position] || positionClassMap['top-left'],
    captionClassName || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} {...rest}>
      <img className={imgClasses} src={src} alt={alt} />
      {caption ? <div className={captionClasses}>{caption}</div> : null}
    </div>
  );
};

export default ImageWithCaption;


