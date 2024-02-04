import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const ArchiveCard = ({ title, count, to }) => {
  return (
    <Card style={{borderRadius:'15px'}} className='card'>
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardContent>
          <Typography variant='h6' component='div'>
            {title}
          </Typography>
          <Typography color='text.secondary'>{count}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ArchiveCard;
