import { ReactElement } from "react";
export interface LogoType {
  to?: string;
  title: string;
  icon: ReactElement;
  className?: string;
  onClick?: () => void;
}
