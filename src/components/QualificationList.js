import React from 'react';

const QualificationList = ({ qualifications }) => {
  if (qualifications.length === 0) {
    return <div>No qualifications available.</div>;
  }

  return (
    <div>
      <h4>Qualifications:</h4>
      <ol>
        {qualifications.map((q) => (
          <li key={q.id}>{q.qualification}</li>
        ))}
      </ol>
    </div>
  );
};

export default QualificationList;

