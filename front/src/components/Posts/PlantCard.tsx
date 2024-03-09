import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import theme from '../../theme';
import { useLocation } from "react-router-dom";
import { Post } from './postType';
import { Add } from '@mui/icons-material';

// const PlantCard = ({ title, description, imageUrl }: {title: string, description: string, imageUrl:string}) => {
const PlantCard = ({ post }: {post: Post}) => {
    return (
    <Card sx={{ display: 'flex'}} style={{ width: '100%', borderColor: theme.palette.garden.main, borderWidth: '3px', borderStyle: 'solid' }}>
      <CardMedia
        component="img"
        alt="Image"
        sx={{ width: 151 }}
        image={post.imageUrl}
        style={{ padding: '16px' }}
      />
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography component="div" variant="h5" align="left" >          
            {post.plantName}
            </Typography>
            <Typography style={{ paddingLeft: '10px' , paddingTop: '10px' }} variant="subtitle2" color="text.secondary" component="div" align="right">
            by {post.username}
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
          {post.description}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div" align="left">
          {post.comments.length} Comments
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PlantCard;
