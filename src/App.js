import React, {useState} from 'react';
import './App.css';
import Simulation from "./components/Simulation";

import {createMuiTheme} from '@material-ui/core/styles';
import {useMediaQuery} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider} from "@material-ui/styles";

function App() {

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: 'dark',
                },
            }),
        [],
    );

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Simulation/>
            </ThemeProvider>
        </div>
    );
}

export default App;
