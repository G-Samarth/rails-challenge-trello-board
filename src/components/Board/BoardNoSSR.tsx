import dynamic from "next/dynamic";

const BoardNoSSR = dynamic(() => import("./Board"), {
  ssr: false,
});

export default BoardNoSSR;
