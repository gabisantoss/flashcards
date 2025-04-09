import { SVGProps } from "react";

const DashboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <path
      fill="#000"
      d="M13 0H1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1Zm-1 12H2V2h10v10ZM13 16H1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V17a1 1 0 0 0-1-1Zm-1 12H2V18h10v10ZM29 16H17a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V17a1 1 0 0 0-1-1Zm-1 12H18V18h10v10ZM29 0H17a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1Zm-1 12H18V2h10v10Z"
    />
  </svg>
);
export default DashboardIcon;
