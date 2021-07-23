import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import BubblePage from './BubblePage';
import fetchColorService from '../services/fetchColorService'
jest.mock('../services/fetchColorService')

const testColors = [
    {
      color: "aliceblue",
      code: {
        hex: "#f0f8ff",
      },
      id: 1,
    },
    {
      color: "limegreen",
      code: {
        hex: "#99ddbc",
      },
      id: 2,
    }
]

test("Renders without errors", ()=> {
    fetchColorService.mockResolvedValue(testColors)
    render(<BubblePage/>)
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    //Keep in mind that our service is called on mount for this component.
    // const colors = await screen.findAllByTestId()
    fetchColorService.mockResolvedValue(testColors);
    render(<BubblePage />);
    const colors =  screen.findAllByTestId(/color/i)
    expect(colors).toHaveLength(2)
});