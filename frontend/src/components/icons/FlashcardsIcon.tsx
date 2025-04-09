import { SVGProps } from "react";

const FlashcardsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 30 30"
    {...props}
  >
    <path d="M29 4h-7V1a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v24a1 1 0 0 0 1 1h7v3a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1ZM2 24V2h18v2H9a1 1 0 0 0-1 1v19H2Zm26 4H10V6h18v22Z" />
  </svg>
);
export default FlashcardsIcon;
