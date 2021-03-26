import React from 'react';

const Progress = (props) => {
  // tmp
  const progress = Math.floor(Math.random() * 100);

  let progressColor;
  if (progress <= 15) progressColor = '#dc3545';
  else if (progress > 15 && progress <= 50) progressColor = '#fd7e14';
  else if (progress > 50 && progress <= 75) progressColor = '#ffc107';
  else if (progress > 75) progressColor = '#20c997';
  else if (progress === 100) progressColor = '#198754';
  else progressColor = '#6c757d';

  return (
    <div className='progress' style={{height: '5px'}}>
      <div className='progress-bar' style={{width: `${progress}%`,background: progressColor}}></div>
    </div>
  )
};

export default Progress;