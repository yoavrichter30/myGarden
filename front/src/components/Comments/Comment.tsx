import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import theme from '../../theme';
import { useLocation } from "react-router-dom";
import { Comment } from './commentType.ts';

const CommentBox = ({ comments }: {comments: Comment[]}) => {
  return (
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component="div" variant="h5" align="left" >          
          {comments[0].text}
          </Typography>
      </Box>
  );
};

export default CommentBox;
