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
      active_white: string;
      deactive_white: string;
    };
    textSize: {
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
      gray: string;
    };
    bgColor: {
      black: string;
      gray: string;
    };
    textColor: {
      black: string;
      white: string;
    };
  }
}
