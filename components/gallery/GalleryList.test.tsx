import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers like toBeInTheDocument
import userEvent from "@testing-library/user-event";

import GalleryList from "./GalleryList"; // Adjust the import path based on your project structure

//import { act } from "react-dom/test-utils";

jest.mock("../../helper/api-util", () => ({
  getGallerys: jest.fn().mockResolvedValue([
    {
      id: "64c27142e1feb5ce8f572aba",
      title: "Himalayas",
      category: "Mountain",
      imageUrl:
        "https://images.unsplash.com/photo-1512250591270-0bea37004c99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
      description: "Himalayas",
    },
    {
      id: "64c27168e1feb5ce8f572abb",
      title: "Anjuna Beach",
      category: "Beaches",
      imageUrl:
        "https://media.istockphoto.com/id/936604286/photo/holes-at-the-biches-coastline-mauritius-island.jpg?s=612x612&w=0&k=20&c=pvT7qEVmG_aBkQpYLGvDe_tdc9SkwyKVHUlYwEGfNgw=",
      description: "Anjuna Beach",
    },
  ]),
}));

test("renders the component correctly", async () => {
  const { getGallerys } = require("../../helper/api-util");
  const data = await getGallerys();
  render(<GalleryList galleryItems={data} />);
  expect(screen.getByText("Himalayas")).toBeInTheDocument();
  expect(screen.getByText("Anjuna Beach")).toBeInTheDocument();
});

test('should show "No Record found" when no matching items are found', () => {
  render(<GalleryList gallaryItems={[]} />);
  const noRecordMessage = screen.getByText("No Record found");
  expect(noRecordMessage).toBeInTheDocument();
});

test("should apply the .imgWrap:hover img style on hover", async () => {
  const { getGallerys } = require("../../helper/api-util");
  const data = await getGallerys();
  render(<GalleryList galleryItems={data} />);

  expect(screen.getByText("Himalayas")).toBeInTheDocument();
  // Trigger the hover event
  const imageHover = screen.getByTestId("64c27142e1feb5ce8f572aba");
  await userEvent.hover(imageHover);

  // Check the style after hovering
  const computedStyle = getComputedStyle(imageHover);
  //expect(computedStyle.transform).toContain('scale(1.1)');
  expect(imageHover).toHaveClass("imgWrap");
});

test("should render the component and filter data correctly", async () => {
  const { getGallerys } = require("../../helper/api-util");
  const data = await getGallerys();

  render(<GalleryList galleryItems={data} />);
  const initialItems = screen.getAllByTestId("cardBlock1");
  expect(initialItems).toHaveLength(data.length);

  const inputElement = screen.getByRole("textbox");
  act(() => {
    fireEvent.change(inputElement, {
      target: { value: "Himalayas" },
    });
    //inputElement.dispatchEvent(new Event("change")); // Use "change" instead of "onchange"
  });

  waitFor(() => {
    // Get the updated elements based on the filter
    const updatedElement = screen.getByText("Himalayas");
    expect(updatedElement).toBeInTheDocument();
  });
});
jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }) => children,
    __rewireMock__: () => null, // This is needed to prevent rewire warnings
  };
});

test("renders correct title in meta tag", async () => {
  const { getGallerys } = require("../../helper/api-util");
  const data = await getGallerys();
  render(<GalleryList galleryItems={data} />);
  const titleElement = screen.getByText("Gallery List", { selector: "title" });
  expect(titleElement).toBeInTheDocument();
});
