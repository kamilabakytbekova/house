import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { NavLink} from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import {useDispatch} from "react-redux";
import {fetchDataAC} from "../../redux/dataReducer";




function getModalStyle() {

    return {
        top: `0`,
        left: `0`,
        width: '450px',
        backgroundColor: '#c4c4c4'
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
       
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    links: {
        color: '#FFFFFF',
        textDecoration: 'none'
    },
    active: {
        color: '#ffde00',
        textDecoration: 'underline'
    }
}));

const  Header = (props) => {
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const classes = useStyles();
    const handleOpen = () => {
        setOpen(true);
    };
    const logout = () => {
        localStorage.removeItem('user')
        props.setIsAuth(false)
    }
    const handleClose = () => {
        setOpen(false);
    };
    const submit = (e) => {
        e.preventDefault()
        if(email === 'admin' && password === 'admin'){
            localStorage.setItem('user', 'true')
            handleClose()
            props.setIsAuth(true)
        }else{
            alert('Wrong password!')
        }
    }
    const submitSearch = (e) => {
        e.preventDefault()
        dispatch(fetchDataAC(search))
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                       
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <NavLink exact  activeClassName={classes.active} className={classes.links} to="/"> House KG </NavLink>
                    </Typography>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <NavLink exact  activeClassName={classes.active} className={classes.links} to="/map"> На карте </NavLink>
                    </Typography>

                    {
                        props.isAuth
                            ? <>
                                <Typography className={classes.title} variant="h6" noWrap>
                                    <NavLink exact  activeClassName={classes.active} className={classes.links} to="/dashboard"> Кабинет </NavLink>
                                </Typography>
                                <Typography onClick={logout} className={classes.title} variant="h6" noWrap>
                                     Выход
                                </Typography>
                            </>
                            : <Typography onClick={handleOpen} className={classes.title} variant="h6" noWrap>
                                Вход
                            </Typography>}
                    <form onSubmit={submitSearch} className={classes.search}>
                        <div className={classes.searchIcon}>
                          
                        </div>
                        <InputBase
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </form>
                </Toolbar>
            </AppBar>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <form onSubmit={submit} style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">Authorization</h2>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} type="text" placeholder={'Email'}/> <br/>
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder={'password'}/> <br/>
                    <button type="submit">Логин</button>
                </form>
            </Modal>
        </div>
    );
}
export default Header