import { SVGProps } from "react";

const VisibleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={10}
    viewBox="0 0 167 93"
    {...props}
  >
    <path d="M83.25 29.25c-9.649 0-17.5 7.851-17.5 17.5s7.851 17.5 17.5 17.5 17.5-7.851 17.5-17.5-7.851-17.5-17.5-17.5z" />
    <path d="M83.25.75c-45.84 0-83 46-83 46s37.16 46 83 46 83-46 83-46-37.16-46-83-46zm0 80.5c-19.054 0-34.5-15.445-34.5-34.5 0-19.054 15.446-34.5 34.5-34.5s34.5 15.446 34.5 34.5c0 19.055-15.446 34.5-34.5 34.5z" />
  </svg>
);
export default VisibleIcon;
