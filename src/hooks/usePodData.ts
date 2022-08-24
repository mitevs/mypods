import { useEffect, useState } from "react";
import { services } from "../services";

export const usePodData = (sort?: Sort<Pod>) => {
  const [pods, setPods] = useState<Pod[]>([]);

  // set timeout
  useEffect(() => {
    services.kubeService.getPods(sort).then((pods) => {
      setPods(pods);
    });
  }, [sort]);

  return { pods };
};
