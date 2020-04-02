import { IStyle, IStyleFunctionOrObject } from "@fluentui/react";
import { ITheme } from "@fluentui/react";
export interface IPageProps {
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IPageStyleProps, IPageStyles>;
}

export interface IPageStyles {
  root: IStyle;
}

export interface IPageStyleProps {
  theme: ITheme;
}
