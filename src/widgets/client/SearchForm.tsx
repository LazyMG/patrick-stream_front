import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.form`
  position: relative;
  width: 100%;

  @media (max-width: 1706px) {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 940px) {
    display: flex;
    justify-content: end;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 80%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 48px;
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

  @media (max-width: 940px) {
    display: none;
  }
`;

// const SearchInput = styled.input`
//   max-width: 400px;
//   width: 80%;
//   outline: none;
//   padding: 12px 0;
//   padding-left: 50px;
//   font-size: 16px;
//   border: none;
//   border-radius: 10px;
//   color: #fff;

//   background-color: rgba(163, 163, 163, 0.402);
//   border: 1.5px solid transparent;

//   box-sizing: border-box;

//   &:focus {
//     border: 1.5px solid ${(props) => props.theme.color.pink};
//     background-color: #000000;
//   }

//   &:active {
//     outline: none;
//   }

//   @media (max-width: 940px) {
//     display: none;
//   }
// `;

const SearchButton = styled.button`
  position: absolute;
  left: 15px;
  bottom: 0;
  top: 0;
  padding: 0;
  background: none;
  border: none;

  width: fit-content;
  /* height: fit-content; */

  cursor: pointer;
  svg {
    color: #fff;
    width: 25px;

    &:focus {
      color: ${(props) => props.theme.color.pink};
    }
  }

  @media (max-width: 940px) {
    display: none;
  }
`;

const ResponseSearchButton = styled.div`
  display: none;

  cursor: pointer;
  svg {
    color: #fff;
    width: 25px;

    &:focus {
      color: ${(props) => props.theme.color.pink};
    }
  }

  @media (max-width: 940px) {
    display: block;
    padding: 8px;
    border-radius: 50%;

    &:hover {
      background-color: rgba(100, 100, 100, 0.8);
    }
  }
`;

const ResponseSearchFormContainer = styled.div`
  display: none;

  @media (max-width: 940px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    margin: 16px auto;
    display: flex;
    justify-content: center;
    pointer-events: none;
    z-index: 11;
  }
`;

const ResponseSearchForm = styled.form`
  display: none;

  @media (max-width: 940px) {
    display: block;
    width: 480px;
    max-width: 100%;
    height: 50px;
    margin: 0 24px;
    pointer-events: visible;
    position: relative;
  }
`;

const ResponseSearchInput = styled.input`
  display: none;

  @media (max-width: 940px) {
    display: block;
    width: 100%;
    outline: none;
    padding: 12px 0;
    padding-left: 50px;
    padding-right: 10px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    color: #fff;

    background-color: rgba(0, 0, 0);
    border: 1px solid gray;

    box-sizing: border-box;

    &:focus {
      border: 1.5px solid ${(props) => props.theme.color.pink};
      background-color: #000000;
    }

    &:active {
      outline: none;
    }
  }
`;

const ResponseSearchFormIcon = styled.div`
  display: none;

  @media (max-width: 940px) {
    display: block;
    position: absolute;
    top: 12px;
    left: 14px;
    svg {
      width: 20px;
      color: #fff;
      cursor: pointer;
    }
  }
`;

const SearchForm = () => {
  const location = useLocation();
  const data = new URLSearchParams(location.search);
  const urlKeyword = data.get("q");

  const [keyword, setKeyword] = useState<string>(urlKeyword ?? "");
  const [isSearchFormShow, setIsSearchFormShow] = useState<boolean>(false);

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
    e.preventDefault();

    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  const showResponsiveSearchForm = () => {
    setIsSearchFormShow(true);
  };

  return (
    <>
      <Wrapper onSubmit={handleSubmit}>
        <InputWrapper>
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
        </InputWrapper>
      </Wrapper>
      {!isSearchFormShow && (
        <ResponseSearchButton onClick={showResponsiveSearchForm}>
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
        </ResponseSearchButton>
      )}
      {isSearchFormShow && (
        <ResponseSearchFormContainer>
          <ResponseSearchForm onSubmit={handleSubmit}>
            <ResponseSearchFormIcon>
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                onClick={() => setIsSearchFormShow(false)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                ></path>
              </svg>
            </ResponseSearchFormIcon>
            <ResponseSearchInput
              value={keyword}
              type="text"
              onChange={onChange}
              name="q"
              autoComplete="off"
              placeholder="입력"
            />
          </ResponseSearchForm>
        </ResponseSearchFormContainer>
      )}
    </>
  );
};

export default SearchForm;
