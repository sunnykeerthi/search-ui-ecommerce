import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { provideHeadless, SandboxEndpoints } from "@yext/search-headless-react";
import logo from "../assets/logo.png";
import { FaBars } from "react-icons/fa";
import {
  DropdownItem,
  SearchBar,
  VisualAutocompleteConfig,
} from "@yext/search-ui-react";
import { answersHeadlessConfig } from "../config/answersHeadlessConfig";
import { useEffect, useState } from "react";
import CartIcon from "./CartComponents/CartIcon";

const Navigation = ({ links }: any) => {
  const [vertKey, setVertKey] = useState("");

  const visualAutocompleteConfig: VisualAutocompleteConfig = {
    entityPreviewSearcher: provideHeadless({
      ...answersHeadlessConfig,
      endpoints: SandboxEndpoints,
      headlessId: "visual-autocomplete",
    }),
    includedVerticals: ["products"],
    renderEntityPreviews: (isLoading, verticalKeyToResults) => {
      if (!verticalKeyToResults.products) {
        return null;
      }

      const { results } = verticalKeyToResults.products;

      return (
        <div className="SB_parent">
          {results.map((r: any, index: number) => (
            <DropdownItem
              key={index + "-" + r.name}
              value={r.name ? r.name : ""}
            >
              <Link to={`/product/${r.id}`}>
                <div className="SB_container2">
                  <div>
                    <img
                      src={r.rawData?.primaryPhoto?.image?.url}
                      className="SB_iconDetails"
                      alt={r.rawData.name}
                    />
                  </div>
                  <div style={{ marginLeft: "5em" }}>
                    <h4>{r.name}</h4>
                    <div>{r.rawData?.c_price}</div>
                  </div>
                </div>
              </Link>
            </DropdownItem>
          ))}
        </div>
      );
    },
  };
  useEffect(() => {
    setVertKey(window.location.pathname);
  }, [window.location.href]);

  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <NavLink to="/" className="logoClass">
            <img src={logo} alt="logo" />
          </NavLink>
          <button type="button" className="nav-toggle">
            <FaBars />
          </button>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink end to="/">
              Home
            </NavLink>
          </li>
          {links.map((item: any, idx: any) => {
            const { to, label } = item;
            return (
              <li key={to} className={to}>
                <NavLink end to={`/${to}`}>
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {vertKey !== "/products" ? (
          vertKey !== "/" ? (
            <SearchBar
              placeholder="search"
              customCssClasses={{
                searchBarContainer: "overrideContainer",
              }}
            />
          ) : (
            ""
          )
        ) : (
          <SearchBar
            visualAutocompleteConfig={visualAutocompleteConfig}
            hideRecentSearches={true}
            customCssClasses={{
              searchBarContainer: "overrideContainer",
              recentSearchesOption: "hidden",
              icon: "none",
            }}
          />
        )}
        <CartIcon />
      </div>
    </NavContainer>
  );
};
const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 150%;
    }
  }
  .logoClass {
    height: 100px;
    width: 130px;
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  a.active {
    border-bottom: 2px solid var(--clr-primary-7);
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto auto;
      align-items: center;
      gap: 1.5em;
      max-width: 95%;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;

        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
        a:active {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
  .overrideContainer {
    margin-bottom: unset;
    width: 450px;
  }
`;
export default Navigation;
