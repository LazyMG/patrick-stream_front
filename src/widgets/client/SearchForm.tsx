import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.form`
  position: relative;
`;

const SearchInput = styled.input`
  width: 400px;
  outline: none;
  padding: 12px 0;
  padding-left: 50px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  color: #fff;

  background-color: rgba(163, 163, 163, 0.402);
  border: 1.5px solid transparent;

  box-sizing: border-box;

  &:focus {
    border: 1.5px solid ${(props) => props.theme.color.pink};
    background-color: #000000;
  }

  &:active {
    outline: none;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  left: 15px;
  bottom: 0;
  top: 0;
  padding: 0;
  background: none;
  border: none;

  cursor: pointer;
  svg {
    color: #fff;
    width: 25px;

    &:focus {
      color: ${(props) => props.theme.color.pink};
    }
  }
`;

const SearchForm = () => {
  const location = useLocation();
  const data = new URLSearchParams(location.search);
  const urlKeyword = data.get("q");

  const [keyword, setKeyword] = useState<string>(urlKeyword ?? "");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
  };

  useEffect(() => {
    if (location.pathname !== "/search") {
      setKeyword("");
    } else {
      setKeyword(urlKeyword ?? "");
    }
  }, [location.pathname, urlKeyword]);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 리프레시 방지

    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <SearchInput
        value={keyword}
        type="text"
        onChange={onChange}
        name="q"
        autoComplete="off"
      />
      <SearchButton>
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
          />
        </svg>
      </SearchButton>
    </Wrapper>
  );
};

export default SearchForm;
