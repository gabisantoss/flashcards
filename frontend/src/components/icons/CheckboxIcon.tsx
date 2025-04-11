import { SVGProps } from "react";

const CheckboxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 2C6.489 2 2 6.489 2 12s4.489 10 10 10 10-4.489 10-10S17.511 2 12 2zm0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8zm4.293 4.293L10 14.586l-2.293-2.293-1.414 1.414L10 17.414l7.707-7.707-1.414-1.414z" />
  </svg>
);
export default CheckboxIcon;
