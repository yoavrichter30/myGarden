import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Rating } from '@mui/material';
import theme from '../theme';
import StarRateIcon from '@mui/icons-material/StarRate';

const PlantReview = ({ firstname, stars, review }: {firstname: string, stars: string,review : string}) => {
  return (
    <Card sx={{ display: 'flex'}} style={{ borderColor: theme.palette.garden.main, borderWidth: '3px', borderStyle: 'solid' }}>
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            bgcolor: 'background.paper',
          }}>
              <Typography component="div" variant="h5" >
                {firstname}'s Review
              </Typography> 
              <Rating name="disabled" value={stars} precision={0.5} disabled  style={{ fontSize: 30 }} sx={{ ml: 2 }}/>
          </Box>
          <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
            {review}
          </Typography>
          {/* <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
            <Rating name="disabled" value={3} disabled  style={{ fontSize: 30 }} align="left"/>
          </Typography> */}
        </CardContent>
      </Box>
    </Card>
  );
};

export default PlantReview;
