import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme.color['primary-500']};
    }

    body {
        background-color: ${(props) => props.theme.color['gray-900']};
        color: ${(props) => props.theme.color['gray-300']};
    }

    body, input, text-area, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`
