import { SVGProps } from "react";

const InvisibleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={15}
    viewBox="0 0 166 132"
    {...props}
  >
    <g fill="#231F20">
      <path d="m132.658-.18-24.321 24.321c-7.915-2.71-16.342-4.392-25.087-4.392-45.84 0-83 46-83 46s14.1 17.44 35.635 30.844L12.32 120.158l12.021 12.021L144.68 11.841 132.658-.18zM52.033 80.445A34.335 34.335 0 0 1 48.75 65.75c0-19.054 15.446-34.5 34.5-34.5a34.318 34.318 0 0 1 14.695 3.284L52.033 80.445zM134.865 37.656l-18.482 18.482a34.493 34.493 0 0 1 1.367 9.612c0 19.055-15.446 34.5-34.5 34.5a34.48 34.48 0 0 1-9.611-1.367l-10.124 10.124c6.326 1.725 12.934 2.743 19.735 2.743 45.84 0 83-46 83-46s-12.263-15.175-31.385-28.094z" />
    </g>
  </svg>
);
export default InvisibleIcon;
