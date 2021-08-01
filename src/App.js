import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from "./components/header/Header";
import Main from "./pages/main/Main";
import MapComponent from "./pages/map/Map";
import Detail from "./pages/detail/Detail";
import {useEffect} from "react";
import IsAuth from "./HOC/AuthHoc/isAuth";
import Dashboard from "./components/Dashboard/Dashboard";
import {useDispatch, useSelector} from 'react-redux'
import {fetchAuth} from "./redux/authReducer";
import {fetchDataAC} from "./redux/dataReducer";

export const base_url = 'https://605b21f027f0050017c063b9.mockapi.io/api/v2'

function App() {
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.auth.isAuth)
    useEffect(() => {
        dispatch(fetchAuth(JSON.parse(localStorage.getItem('user'))))
        dispatch(fetchDataAC())
    }, [])
    const setAuth = (status) => {
        dispatch(fetchAuth(status))
    }
    return (
        <div className="App">
            <Router>
                <Header isAuth={isAuth} setIsAuth={setAuth}/>
                <Switch>
                    <Route exact path="/">
                        <Main data={[]}/>
                    </Route>
                    <Route path="/login">
                        Auth page
                    </Route>
                    <Route path="/map">
                        <MapComponent/>
                    </Route>
                    <Route exact path="/detail/:id">
                        <Detail/>
                    </Route>
                    <Route path="/dashboard">
                        <IsAuth isAuth={isAuth} Component={Dashboard}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;