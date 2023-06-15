import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';


export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345,  }} elevation={3}> 
      <CardActionArea>
        <CardMedia
            sx={{ height: 10, backgroundColor: 'green'}}
            title="Job 1"
        />
        <CardContent>
            <Typography sx={{ float:'right', color:'red'}}>
                <SpeedIcon />
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
            SDE-1
            </Typography>
            <Typography variant="body2" color="text.secondary">
            'about sde-1'
            </Typography>
            <Typography sx={{ float:'right', padding:'10px' }}>
                View Details
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}