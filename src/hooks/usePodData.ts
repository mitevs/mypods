import { useEffect, useState } from "react";
import { services } from "../services";

export const usePodData = (filters?: Filter<Pod>[], sort?: Sort<Pod>) => {
  const [pods, setPods] = useState<Pod[]>([]);

  // set timeout
  useEffect(() => {
    services.kubeService.getPods(filters, sort).then((pods) => {
      setPods(pods);
    });
  }, [filters, sort]);

  return { pods };
};
