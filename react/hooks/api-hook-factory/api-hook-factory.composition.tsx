import React, { useState } from 'react';
import axios from 'axios';
import { Text } from '@teambit/design.ui.input.text';
import { Button } from '@teambit/design.ui.buttons.button';
import { MovieResponse, Movie, MovieFromApi } from '@learn-bit-react/movies.models.movie';
import { ContextResource, useApiContext, ApiContextBaseProvider } from '@bit-foundations/react.context.api-context-base';
import { ApiHookFactory } from './api-hook-factory';
import './api-hook-factory.compositions.scss';

// context provider for our hook example to consume
function ApiContextProviderMovies({ children}){
    const axiosInstance = axios.create({
        baseURL: 'https://www.omdbapi.com',
        params: {
        apikey: '35fdde3e'
        }
    });
    return <ApiContextBaseProvider apiInstance={axiosInstance}>{children}</ApiContextBaseProvider>
}

// hook example created from our factory
const apiHookMovies = () => {
    const apiCallConfig = (searchStr: string): ContextResource<MovieResponse> => ({
        params: {
          s: searchStr
        }
      });
  
      const processData = (data) : Movie[] =>  {
         return data.Search && data.Search.length ? data.Search.map(
        (m: MovieFromApi) => Movie.fromApiObject(m)
      ) : [];
      }
  
    return ApiHookFactory(apiCallConfig, processData, useApiContext);
}

// example usage of our new hook
function GetMovieDataViaFactoryMadeHook(){

    const [getApiData, apiDataResult, loading, error] = apiHookMovies();

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
            {apiDataResult ? (
                <>
                    Data From Api: <br />
                    {JSON.stringify(apiDataResult)}
                </>
            ) : "Nothing to display"}
        </>
    )
}

// All brought together, provider and consumer   
export function ApiHookExampleMovies(){
    return (
        <ApiContextProviderMovies>
            <GetMovieDataViaFactoryMadeHook />
        </ApiContextProviderMovies>
    )
}


