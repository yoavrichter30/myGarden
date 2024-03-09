import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
// import "./GardenPage.css"
import PlantCard from '../../components/Posts/PlantCard.tsx';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from 'react';

const GardenPageTheme = createTheme({
  ...baseTheme,
});

export default function GardenPage({ username }) {
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    async function fetchPostsByUser() {
      try {
        const response = await fetch(`http://localhost:8080/posts/byUser/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPostsByUser();
  }, [username]);

  // const posts = [
  //   { plantName: 'Monstera Deliciosa', description: 'Monstera deliciosa, the Swiss cheese plant or split-leaf philodendron is a species of flowering plant native to tropical forests of southern Mexico, south to Panama. It has been introduced to many tropical areas, and has become a mildly invasive species in Hawaii, Seychelles, Ascension Island and the Society Islands. It is very widely grown in temperate zones as a houseplant.', imageUrl: 'https://www.houseplant.co.uk/cdn/shop/files/monstera-shoot-pink.jpg?v=1686074374&width=1946' , comments: [{username: "8689440", text: "nice monstera bro!"}]},
  //   { plantName: 'Calathea', description: 'alathea is a genus of neotropical rhizomatous herbaceous perennial plants that are known for the unique leaf movements of patterned foliage (more on that below). Calatheas are also considered pet-friendly plants, making them great plant picks for anyone that shares a space with curious pets.', imageUrl: 'https://media.greg.app/Y2FyZS1wbGFudC1wcm9maWxlL0NhbGF0aGVhX21lZGFsbGlvbi5qcGc=?format=pjpeg&optimize=high&auto=webp&precrop=1000:1000,smart&fit=crop&width=1000&height=1000', comments: [{username: "8689440", text: "nice monstera bro!"}] },
  //   { plantName: 'Golden Photus', description: 'Pothos gets its other common name—Devil’s Ivy—thanks to its vigorous growth and penchant for returning to life even in the worst conditions! It’s the perfect beginner houseplant as it’s not picky about its soil and thrives in both indirect, bright light and low light.', imageUrl: 'https://media.istockphoto.com/id/1320269359/photo/tropical-epipremnum-aureum-marble-queen-pothos-houseplant-in-flower-pot.jpg?s=612x612&w=0&k=20&c=Rc4J3wkUQgd9vN_O7c7wRnbqCy1UUafqRSYLE2KGv_c=', comments: [{username: "8689440", text: "nice monstera bro!"}] },
  //   // Add more card data as needed
  // ];
  return (
    <ThemeProvider theme={GardenPageTheme}>        
      <Grid container alignItems="center" justifyContent="center"  spacing={2} style={{ flexDirection: 'column' }}>
        {posts.map((post, index) => (
          <Grid item xs={10} sm={10} md={10} lg={10} key={index}>
            <PlantCard 
              post={post}
            />
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
    // <Card size="sm">Small card</Card>
    // <div>hello</div>

  );
}