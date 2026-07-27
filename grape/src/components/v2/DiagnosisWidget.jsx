// AI 적합도 진단 위젯 (B-2) — 규칙 기반. LLM 연동 지점은 lib/recommend.js 인터페이스로만 존재.
// 기존 components/ import 금지 (CLAUDE.md §4). 스타일은 tw2- 스코프만 사용.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import { axes, siteConditions, pick } from '../../content';
import { recommend } from './lib/recommend';

function DiagnosisWidget() {
  const { t, currentLang } = useTranslation();
  const [step, setStep] = useState(1);
  const [axis, setAxis] = useState(null);
  const [conditions, setConditions] = useState([]);
  const [error, setError] = useState(false);

  const result = step === 3 ? recommend({ axis, conditions }) : null;
  const axisLabel = (a) => pick(a, currentLang);

  const toggleCondition = (code) =>
    setConditions((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );

  const goNext = () => {
    if (step === 1 && !axis) { setError(true); return; }
    setError(false);
    setStep(step + 1);
  };

  const restart = () => { setStep(1); setAxis(null); setConditions([]); setError(false); };

  return (
    <div className="tw2-diag" id="tw2-diagnosis">
      <h2 className="tw2-h2">{t('v2.diagnosis.heading')}</h2>
      <p className="tw2-sub">{t('v2.diagnosis.sub')}</p>

      {step === 1 && (
        <>
          <p className="tw2-diag-step-label">{t('v2.diagnosis.step1Label')}</p>
          {error && <p className="tw2-diag-error">{t('v2.diagnosis.noSelection')}</p>}
          <div className="tw2-chip-row">
            {axes.map((a) => (
              <button
                key={a.code}
                type="button"
                className={`tw2-chip${axis === a.code ? ' tw2-chip-active' : ''}`}
                onClick={() => { setAxis(a.code); setError(false); }}
              >
                {axisLabel(a)}
              </button>
            ))}
          </div>
          <div className="tw2-diag-nav">
            <button type="button" className="tw2-btn tw2-btn-primary" onClick={goNext}>
              {t('v2.diagnosis.next')}
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <p className="tw2-diag-step-label">{t('v2.diagnosis.step2Label')}</p>
          <div className="tw2-chip-row">
            {siteConditions.map((c) => (
              <button
                key={c.code}
                type="button"
                className={`tw2-chip${conditions.includes(c.code) ? ' tw2-chip-active' : ''}`}
                onClick={() => toggleCondition(c.code)}
              >
                {pick(c, currentLang)}
              </button>
            ))}
          </div>
          <div className="tw2-diag-nav">
            <button type="button" className="tw2-btn tw2-btn-ghost" onClick={() => setStep(1)}>
              {t('v2.diagnosis.back')}
            </button>
            <button type="button" className="tw2-btn tw2-btn-primary" onClick={goNext}>
              {t('v2.diagnosis.showResult')}
            </button>
          </div>
        </>
      )}

      {step === 3 && result && (
        <>
          <p className="tw2-diag-step-label">{t('v2.diagnosis.resultLabel')}</p>

          <h3 className="tw2-diag-result-title">{t('v2.diagnosis.resultProducts')}</h3>
          <div className="tw2-diag-tags">
            {result.products.map((p) => (
              <span key={p.id} className="tw2-tag">{pick(p.name, currentLang)}</span>
            ))}
          </div>

          {result.rnd.length > 0 && (
            <>
              <h3 className="tw2-diag-result-title">{t('v2.diagnosis.resultRnd')}</h3>
              <ul className="tw2-proof-list">
                {result.rnd.map((r) => (
                  <li key={r.id} className="tw2-proof-item">
                    <p className="tw2-proof-item-title">{pick(r.title, currentLang)}</p>
                    <p className="tw2-proof-meta">
                      <span>{t('v2.diagnosis.rndRoleLabel')}: {r.role}</span>
                      <span>{t('v2.diagnosis.rndPeriodLabel')}: {r.period}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}

          {result.conditions.length > 0 && (
            <>
              <p className="tw2-diag-note">{t('v2.diagnosis.conditionsNote')}</p>
              <div className="tw2-diag-tags">
                {result.conditions.map((code) => {
                  const c = siteConditions.find((sc) => sc.code === code);
                  return <span key={code} className="tw2-tag">{c ? pick(c, currentLang) : code}</span>;
                })}
              </div>
            </>
          )}

          <p className="tw2-diag-disclaimer">{t('v2.diagnosis.disclaimer')}</p>

          <div className="tw2-diag-nav" style={{ marginTop: 20 }}>
            <Link className="tw2-btn tw2-btn-primary" to={`/${currentLang}/safegai-platform`}>
              {t('v2.diagnosis.ctaContact')}
            </Link>
            <button type="button" className="tw2-btn tw2-btn-ghost" onClick={restart}>
              {t('v2.diagnosis.restart')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DiagnosisWidget;
