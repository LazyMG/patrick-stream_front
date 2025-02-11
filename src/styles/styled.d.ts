import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      pink: string;
      sub_pink: string;
      green: string;
      purple: string;
      black: string;
      gray: string;
      white: string;
    };
    text: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    border: {
      purple: string;
      white: string;
      black: string;
    };
  }
}
