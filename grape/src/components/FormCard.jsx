/**
 * FormCard 컴포넌트
 * 
 * React Hook Form을 사용하여 문의 폼을 렌더링하는 카드 형태의 컴포넌트입니다.
 * 이름, 이메일, 회사명, 연락처, 문의내용을 입력받는 폼을 제공합니다.
 * forwardRef를 사용하여 외부에서 ref를 전달받을 수 있습니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.title - 폼 제목
 * @param {string} props.subtitle - 폼 부제목
 * @param {Function} props.onSubmit - 폼 제출 시 호출되는 콜백 함수
 * @param {React.Ref} ref - forwardRef를 통해 전달되는 ref
 * 
 * 사용법:
 * <FormCard 
 *   title="문의하기"
 *   subtitle="궁금한 점이 있으시면 언제든 문의해주세요"
 *   onSubmit={(formData) => {
 *     console.log('폼 데이터:', formData);
 *     // API 호출 또는 다른 처리
 *   }}
 * />
 * 
 * 폼 필드:
 * - 이름 (필수)
 * - 이메일 (필수, 이메일 형식 검증)
 * - 소속 회사명 (필수)
 * - 연락처 (필수)
 * - 문의 내용 (필수)
 */
import React, { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import './FormCard.css';

const FormCard = forwardRef((props, ref) => {
  const { title, subtitle, onSubmit } = props;
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: ''
    }
  });

  const onFormSubmit = async (data) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      // 폼 제출 성공 시 폼 초기화
      reset();
    } catch (error) {
      console.error('폼 제출 중 오류 발생:', error);
    }
  };

  return (
    <div ref={ref} className="form-card">
      <div className="application-period-flex">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <form onSubmit={handleSubmit(onFormSubmit)} className="support-form">
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="name">이름 *</label>
              <input
                type="text"
                id="name"
                {...register('name', {
                  required: '이름을 입력해주세요.',
                  minLength: {
                    value: 2,
                    message: '이름은 2자 이상 입력해주세요.'
                  },
                  maxLength: {
                    value: 20,
                    message: '이름은 20자 이하로 입력해주세요.'
                  }
                })}
                className={errors.name ? 'error' : ''}
                placeholder="이름을 입력해주세요"
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일 *</label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '올바른 이메일 형식을 입력해주세요.'
                  }
                })}
                className={errors.email ? 'error' : ''}
                placeholder="example@company.com"
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="company">소속 회사명 *</label>
              <input
                type="text"
                id="company"
                {...register('company', {
                  required: '회사명을 입력해주세요.',
                  minLength: {
                    value: 2,
                    message: '회사명은 2자 이상 입력해주세요.'
                  },
                  maxLength: {
                    value: 50,
                    message: '회사명은 50자 이하로 입력해주세요.'
                  }
                })}
                className={errors.company ? 'error' : ''}
                placeholder="회사명을 입력해주세요"
              />
              {errors.company && (
                <span className="error-message">{errors.company.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">연락처 *</label>
              <input
                type="tel"
                id="phone"
                {...register('phone', {
                  required: '연락처를 입력해주세요.',
                  pattern: {
                    value: /^[0-9-+\s()]+$/,
                    message: '올바른 연락처 형식을 입력해주세요.'
                  },
                  minLength: {
                    value: 10,
                    message: '연락처는 10자 이상 입력해주세요.'
                  }
                })}
                className={errors.phone ? 'error' : ''}
                placeholder="010-1234-5678"
              />
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">문의 내용 *</label>
              <textarea
                id="message"
                {...register('message', {
                  required: '문의 내용을 입력해주세요.',
                  minLength: {
                    value: 10,
                    message: '문의 내용은 10자 이상 입력해주세요.'
                  },
                  maxLength: {
                    value: 1000,
                    message: '문의 내용은 1000자 이하로 입력해주세요.'
                  }
                })}
                className={errors.message ? 'error' : ''}
                placeholder="문의하실 내용을 자세히 입력해주세요"
              />
              {errors.message && (
                <span className="error-message">{errors.message.message}</span>
              )}
            </div>
            <div className="form-group">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? '제출 중...' : '문의하기'}
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
});

FormCard.displayName = 'FormCard';

export default FormCard; 