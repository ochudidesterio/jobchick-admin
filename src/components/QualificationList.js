import React from 'react';
import { useTranslation } from 'react-i18next';


const QualificationList = ({ qualifications }) => {
  const {t} = useTranslation()
  if (qualifications.length === 0) {
    return <div>No qualifications available.</div>;
  }

  return (
    <div>
      <h4>{t('qualifications')}</h4>
      <ol>
        {qualifications.map((q) => (
          <li key={q.id}>{q.qualification}</li>
        ))}
      </ol>
    </div>
  );
};

export default QualificationList;

