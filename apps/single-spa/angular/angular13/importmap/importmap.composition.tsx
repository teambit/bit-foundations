import React from 'react';
import importmap from './importmap.json';

export function ReturnsCorrectValue() {

  const map = importmap;

  return (
    <>
    <div>Angular 13 single-spa (systemJs) imports:</div>
    {Object.entries(map.imports).map(([key, value]) => {
      return <div>{key}: {value} </div>
  })}
    </>
  );
}

