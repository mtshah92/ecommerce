import { useContext } from "react";
import { ProductContext } from "../../context/productContext";
// import "./filterPane.css";

export const FilterPane = () => {
  const { productState, productdispatch } = useContext(ProductContext);
  console.log(productState.checkbox?.find((item) => item === "fiction"));
  return (
    <div className="filter">
      <div className="filterName">
        <h3 className="filterTitle">Filter</h3>
        <button
          className="clearFilter"
          onClick={() => productdispatch({ type: "clearFilter" })}
        >
          Clear All
        </button>
      </div>
      <div className="priceSort">
        <h3 className="priceName">Sort By Price</h3>
        <div className="priceSortLowToHigh">
          <input
            type="radio"
            id="lowToHigh"
            name="priceSort"
            value="sortLowToHigh"
            checked={productState.sortByPrice === "sortLowToHigh"}
            onChange={(e) => {
              productdispatch({
                type: "sortPrice",
                payload: e.target.value,
              });
            }}
          />
          <label for="lowToHigh">Price: Low to High</label>
        </div>
        <div className="priceSortHighToLow">
          <input
            type="radio"
            id="highToLow"
            name="priceSort"
            value="sortHighToLow"
            checked={productState.sortByPrice === "sortHighToLow"}
            onChange={(e) => {
              productdispatch({
                type: "sortPrice",
                payload: e.target.value,
              });
            }}
          />
          <label for="highToLow">Price: High To Low</label>
        </div>
      </div>

      <div>
        <h3>Price Range</h3>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          onChange={(e) => {
            productdispatch({ type: "value", payload: e.target.value });
          }}
          list="markers"
          value={productState.value}
        />

        <datalist id="markers">
          <option value="100" label="100"></option>
          <option value="500" label="500"></option>
          <option value="1000" label="1000"></option>
        </datalist>
        <p>Price Selected: {`<=${productState.value}`}</p>
      </div>
      <div className="checkbox">
        <h3>Categories</h3>
        <div className="non-fiction-checkbox">
          <input
            type="checkbox"
            id="non-fiction"
            value="non-fiction"
            checked={
              productState.checkbox.find((item) => item === "non-fiction") ==
              undefined
                ? false
                : productState.checkbox.find((item) => item === "non-fiction")
            }
            onChange={(e) => {
              productdispatch({ type: "checkbox", payload: e });
            }}
          />
          <label for="non-fiction">Non-Fiction</label>
        </div>
        <div className="fiction-checkbox">
          <input
            type="checkbox"
            id="fiction"
            value="fiction"
            onChange={(e) => {
              productdispatch({ type: "checkbox", payload: e });
            }}
            checked={
              productState.checkbox?.find((item) => item === "fiction") ==
              undefined
                ? false
                : productState.checkbox?.find((item) => item === "fiction")
            }
          />
          <label for="fiction">Fiction</label>
        </div>
        <div className="horror-checkbox">
          <input
            type="checkbox"
            id="horror"
            value="horror"
            onChange={(e) => {
              productdispatch({ type: "checkbox", payload: e });
            }}
            checked={
              productState.checkbox.find((item) => item === "horror") ==
              undefined
                ? false
                : productState.checkbox.find((item) => item === "horror")
            }
          />
          <label for="horror">Horror</label>
        </div>
      </div>
      <div className="rating">
        <h3>Sort By Rating</h3>
        <div>
          <input
            type="radio"
            id="morethan2"
            value="morethan2"
            name="rating"
            checked={productState.sort === "morethan2"}
            onChange={(e) => {
              productdispatch({ type: "sort", payload: e.target.value });
            }}
          />
          <label for="morethan2"> 2 stars & above</label>
        </div>
        <div>
          <input
            type="radio"
            id="morethan3"
            value="morethan3"
            name="rating"
            checked={productState.sort === "morethan3"}
            onChange={(e) => {
              productdispatch({ type: "sort", payload: e.target.value });
            }}
          />
          <label for="morethan3"> 3 stars & above</label>
        </div>
        <div>
          <input
            type="radio"
            id="morethan4"
            value="morethan4"
            name="rating"
            checked={productState.sort === "morethan4"}
            onChange={(e) => {
              productdispatch({ type: "sort", payload: e.target.value });
            }}
          />
          <label for="morethan4"> 4 stars & above</label>
        </div>
      </div>
    </div>
  );
};
