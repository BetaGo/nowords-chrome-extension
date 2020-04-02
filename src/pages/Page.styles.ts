import { IPageStyles, IPageStyleProps } from "./Page.types";

export const styles = (props: IPageStyleProps): IPageStyles => {
  const { theme } = props;
  return {
    root: {
      color: theme.palette.black,
      backgroundColor: theme.palette.white,
      width: "100%",
      height: "100%"
    }
  };
};
