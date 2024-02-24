import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import theme from '../theme';
import { useNavigate, Link, useLocation } from "react-router-dom";

// const navigate = useNavigate(); 
// const routeChange = () =>{ 
//   const path = `plantPage?plantName=monstera-deliciosa`; 
//   navigate(path);
// }
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const PlantCard = ({ title, description, imageUrl }: {title: string, description: string, imageUrl:string}) => {
  return (
    // <div>hello</div>
    <Card sx={{ display: 'flex'}} style={{ borderColor: theme.palette.garden.main, borderWidth: '3px', borderStyle: 'solid' }}>
      <CardMedia
        component="img"
        alt="Image"
        sx={{ width: 151 }}
        image={imageUrl}
        style={{ padding: '16px' }}

      />
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
        {/* <Link to="/account?name=modus-create">Modus Create</Link> */}
          <Typography component="div" variant="h5" align="left" >
          
          {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" align="left">
            {description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PlantCard;
