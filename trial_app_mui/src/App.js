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
import { makeStyles } from "@mui/styles";
import { Box, spacing } from "@mui/system";

const useStyles = makeStyles({
  media: {
    height: 500,
  },
  readMore: {
    marginLeft: "auto",
  },
  avatar: {
    backgroundColor: "pink",
  },
  content: {
    marginTop: 25,
    marginBottom: 25,
  },
});

function ArticleCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.content}>
      <CardHeader
        avatar={<Avatar className={classes.avatar}>JD</Avatar>}
        title="Jane Doe"
        subheader="Joined 2022-01-27"
      />
      <CardMedia
        className={classes.media}
        image="https://picsum.photos/id/1006/600/400"
      />
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
        <Box sx={{ ml: "auto" }}>
          <Button
            className={classes.readMore}
            variant="outlined"
            color="success"
          >
            Read more
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}

function App() {
  return (
    <div className="App">
      <CssBaseline>
        <Container>
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </Container>
      </CssBaseline>
    </div>
  );
}

export default App;
