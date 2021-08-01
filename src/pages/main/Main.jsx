import React from 'react';
import ImgMediaCard from "../../components/card/Card";
import { Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 50,
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Main(props) {
    const classes = useStyles()
    const data = useSelector(state => state.data.data )
 
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {
                   data.map((item)=> <Grid key={item.id} item xl={12} xs={6} lg={3} md={4} spacing={6}>
                       <ImgMediaCard data={item} />
                   </Grid> )
                }
            </Grid>
        </div>
    );
}

export default Main;