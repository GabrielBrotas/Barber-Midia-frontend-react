import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 500,
    margin: theme.spacing(2),
    backgroundColor: theme.backgroundColorSecondary,
  },
  media: {
    height: 190,
  },
}));

function Media(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        title={
        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
    <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="100%" />
          </React.Fragment>
      </CardContent>

    <Skeleton animation="wave" variant="rect" className={classes.media} />

    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function PostSkeleton() {
  return (
    <div>
      <Media />
    </div>
  );
}
