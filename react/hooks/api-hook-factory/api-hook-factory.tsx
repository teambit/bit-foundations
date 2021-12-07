import {useState, useEffect} from 'react';
import { useApiContext, ContextConfigFunction } from '@bit-foundations/react.context.api-context-base';

/**
 * This is a factory for producing apiWithContext hooks. These hooks assume there is a ApiContextProvider provider 
 * from the api-context-base component being injected into the consuming app
 * 
 * @param apiCallConfig
 * should take the format of a function, of return type ContextResource<ApiDataObjectType>, which accepts parameters which are to be configured in the url, 
 * and which returns an axios url object which is to be appended to the context value injected somewhere above in the app
 * For example:
 * (searchStr: string): ContextResource<MovieResponse> => ({
      params: {
        s: searchStr
      }
    });
 * @param processData function which takes as a parameter the data object from the axios api call and processes it. Output will be in the format that
 * the the api hook will return in the apiData variable
 * @param overrideUseContext useContext function, which mut be a compositions of the useApiContext, which will override the base useApiContext as a more specific implementation e.g. 
 * with a more specific return type for type safety
 */
export const ApiHookFactory = <TParamsType, TApiReturnType, TResultType> (
  apiCallConfig: ContextConfigFunction<TParamsType, TApiReturnType>,
  processData: (data) => TResultType[],
  overrideUseContext?: any // should only be used if you know you want to override the useContext instance. 
): [
  (props: TParamsType) => Promise<void>,
  TResultType[],
  boolean,
  string,
] => {
  const [apiData, setApiData] = useState<TResultType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const useContextFunction = overrideUseContext || useApiContext;

  const [apiDataResult, getApiData] = useContextFunction(apiCallConfig);

  useEffect(() => handleDataReturn(), [apiDataResult])

  const handleDataReturn = () => {
    if (apiDataResult.isLoading) {
      setIsLoading(true);
      return;
    }
    if (apiDataResult.error) {
      setError(apiDataResult.error.message)
    }
    else if (apiDataResult.data){
      const { data }  = apiDataResult;
      const list = processData(data);
      setApiData(list);
    }
    setIsLoading(false);
  }

  const apiCall = async (props: TParamsType) => {
    if (!props) return;

    setIsLoading(true);
    try {
      getApiData(props);
    } catch (err) {
      setError(err.toString());
      setIsLoading(false);
    }
  };

  return [apiCall, apiData, isLoading, error];
};
