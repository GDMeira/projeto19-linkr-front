import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-style: normal;
        font-weight: 400;
        box-sizing: border-box;
    }

    button {
        cursor: pointer;
    }

    a {
        color: inherit;
        text-decoration: inherit;
    }
`

export default GlobalStyle