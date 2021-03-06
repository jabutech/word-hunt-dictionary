import { createTheme, debounce, MenuItem, TextField, ThemeProvider } from '@material-ui/core';
import React from 'react'
import './Header.css';
// Import category from data component
import categories from '../../data/category';
import { useCallback } from 'react';

const Header = ({category, setCategory, word, setWord, lightMode}) => {

    // Set dark theme
    const darkTheme = createTheme({
        palette: {
            primary:{
                main: lightMode ? '#000' : '#fff',
            },
            type:lightMode? 'light' : 'dark',
        },
    });

    // Handle change select
    const handleChange = (language) => {

        // set languange selected to state Category
        setCategory(language);
        // Set word empty after change languange
        setWord('');

    }

    // Handle text after user typing in form and sent to callback deb
    const handleText = debounce((text) => {
        setWord(text);
    }, 1000); // 1000 is delay sent word

    return (
        <div className='header'>
            <span className="title">{word ? word : "Word Hunt"}</span>
            <div className="inputs">
                <ThemeProvider theme={darkTheme}>
                    <TextField 
                    id="standard-basic" 
                    label="Search a Keyword"
                    className="search" 
                    onChange={(e) => handleText(e.target.value)}
                    />

                    <TextField
                        className="select"
                        select
                        value={category}
                        onChange={(e) => handleChange(e.target.value)}
                        label="Language"
                        >
                            {/* Loop category from component category.js */}
                            {
                                categories.map((category) => (
                                    <MenuItem key={category.label} value={category.label}>
                                    {category.value}
                                    </MenuItem> 
                                ))
                            }
                    </TextField>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Header
