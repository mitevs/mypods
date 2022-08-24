import { useEffect, useState } from "react";
import { services } from "../services";

// pass some filters and sorting
export const usePodData = (sort?: Sort<Pod>) => {
  const [pods, setPods] = useState<Pod[]>([]);

  // extract as hook, set timeout
  useEffect(() => {
    services.kubeService.getPods(sort).then((pods) => {
      setPods(pods);
    });
  }, [sort]);

  return { pods };
};
