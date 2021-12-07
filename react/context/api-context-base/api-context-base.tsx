import React, { ReactNode } from 'react';
import { RequestProvider, useResource, Resource, UseResourceResult, Request } from 'react-request-hook';
import { AxiosInstance } from 'axios';

export type ApiContextBaseProviderProps = {
    children?: ReactNode,
    apiInstance: AxiosInstance
}

export const useApiContext = useResource;
export type ContextConfigFunction<TPropsType, TReturnType> = (props?:TPropsType) => ContextResource<TReturnType>;
export type useApiContextType<TRequest extends Request> = UseResourceResult<TRequest>;
export interface ContextResource<TPayload> extends Resource<TPayload>{};

export const ApiContextBaseProvider = ({ children, apiInstance }: ApiContextBaseProviderProps) => {
    return <RequestProvider value={apiInstance}>{children}</RequestProvider>
}