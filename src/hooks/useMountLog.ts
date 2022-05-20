import { useEffect } from "react";

export const useMountLog = (id: string | number) => {
  useEffect(() => {
    console.log("mount", id);
    return () => {
      console.log("unmount", id);
    };
  }, []);
};
export default useMountLog;
