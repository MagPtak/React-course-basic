import {
  Button,
  CssBaseline,
  IconButton,
  Icon,
  Container,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  CardMedia,
} from "@mui/material";

function App() {
  return (
    <div className="App">
      <CssBaseline>
        <Container>
          <Card>
            <CardHeader
              avatar={<Avatar>JD</Avatar>}
              title="Jane Doe"
              subheader="Joined 2022-01-27"
            />
            <CardMedia image="https://i.picsum.photos/id/1006/3000/2000.jpg?hmac=x83pQQ7LW1UTo8HxBcIWuRIVeN_uCg0cG6keXvNvM8g" />
            <CardContent>
              <Typography variant="h6">Clickbait title!</Typography>
              <Typography variant="body2">Really interesting ...</Typography>
            </CardContent>
            <CardActions>
              <IconButton>
                <Icon color="success">favorite</Icon>
              </IconButton>
              <IconButton>
                <Icon color="success">share</Icon>
              </IconButton>
              <Button variant="outlined" color="success">
                Read more
              </Button>
            </CardActions>
          </Card>
        </Container>
      </CssBaseline>
    </div>
  );
}

export default App;
