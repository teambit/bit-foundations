import React, { useState } from 'react';
import axios from 'axios';
import { Text } from '@teambit/design.ui.input.text';
import { Button } from '@teambit/design.ui.buttons.button';
import { useApiContext, ContextResource, ApiContextBaseProvider } from './api-context-base';
import { MovieResponse, Movie, MovieFromApi } from '@learn-bit-react/movies.models.movie';
import './api-context-base.compositions.scss';

const ConsumerComponent = () => {
    const [apiDataResult, getApiData] = useApiContext((searchStr: string): ContextResource<MovieResponse> => ({
        params: {
          s: searchStr
        }
      })
    )
    const [inputValue, setInput] = useState("");

      function getData(){
          getApiData(inputValue);
      }

    return (
        <>
            <div className="comp-search">
                <Text 
                    onInput={e => setInput(e.currentTarget.value)} 
                    value={inputValue} 
                    className="comp-input"
                    placeholder="Search for movies"
                    />
                <Button onClick={getData}>Get Movies via API Context</Button>
            </div>
            <br />
            {apiDataResult?.data ? (
                <>
                    Data From Api: <br />
                    {JSON.stringify(apiDataResult.data.Search)}
                </>
            ) : "Nothing to display"}
        </>
    )
}

const defaultBaseUrl = 'https://www.omdbapi.com';
const defaultApiKey = '35fdde3e';

function ApiContextProviderMovies({ children}){
    const axiosInstance = axios.create({
        baseURL: 'https://www.omdbapi.com',
        params: {
        apikey: '35fdde3e'
        }
    });
    return <ApiContextBaseProvider apiInstance={axiosInstance}>{children}</ApiContextBaseProvider>
}

export function MoviesApiContextExample(){
    return (

        <ApiContextProviderMovies>
            <ConsumerComponent />
        </ ApiContextProviderMovies>
    )

}