import React from 'react';

export function DifficultyBadge({ value }) {
  const cls =
    value === 'Fácil' ? 'badge-success' :
    value === 'Médio' ? 'badge-warning' :
    'badge-danger';
  return <span className={`badge ${cls}`}>{value}</span>;
}
