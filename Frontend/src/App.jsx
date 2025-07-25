import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import Login from './components/Login';
import AppContextProvider from './context/AppContext';
import './styles/main.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for authentication status (could be from local storage or API)
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AppContextProvider>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        {isAuthenticated ? <ProductList /> : <Login setIsAuthenticated={setIsAuthenticated} />}
                    </Route>
                    {/* Additional routes can be added here */}
                </Switch>
            </Router>
        </AppContextProvider>
    );
};

export default App;