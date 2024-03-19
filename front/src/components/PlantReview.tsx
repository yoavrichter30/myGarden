import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Rating } from '@mui/material';
import theme from '../theme';
import StarRateIcon from '@mui/icons-material/StarRate';
import { IComment } from '../services/posts-service.ts';

const PlantReview = ({ comment }: {comment: IComment}) => {
  return (
    <Card sx={{ display: 'flex'}} style={{ width: '100%', borderColor: theme.palette.garden.main, borderWidth: '3px', borderStyle: 'solid' }}>
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            bgcolor: 'background.paper',
          }}>
              <Typography component="div" variant="h5" >
                {comment.username}'s Review
              </Typography> 
              {/* <Rating name="disabled" value={stars} precision={0.5} disabled  style={{ fontSize: 30 }} sx={{ ml: 2 }}/> */}
          </Box>
          <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
            {comment.text}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PlantReview;
