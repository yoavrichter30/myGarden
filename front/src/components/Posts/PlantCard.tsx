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
    <Card sx={{ display: 'flex'}} style={{ borderColor: theme.palette.garden.main, borderWidth: '3px', borderStyle: 'solid' }}>
      <CardMedia
        component="img"
        alt="Image"
        sx={{ width: 151 }}
        image={post.imageUrl}
        style={{ padding: '16px' }}
      />
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" align="left" >          
          {post.plantName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
          {post.description}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" align="left" >          
          Comments
          </Typography>
          {(post.comments).map((comment, index) => (
            <Typography variant="subtitle1" color="text.secondary" component="div" align="left" key={index}>
            {comment.text}
            </Typography>
          ))}
          <TextField id="standard-basic" label="New comment" variant="standard"/>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PlantCard;
