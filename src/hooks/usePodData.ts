import { useCallback, useEffect, useState } from "react";
import { services } from "../services";
import { config } from "../config/env";

export const usePodData = (filters?: Filter<Pod>[], sort?: Sort<Pod>) => {
  const [pods, setPods] = useState<Pod[]>([]);

  const getPods = useCallback(() => {
    services.kubeService.getPods(filters, sort).then((pods) => {
      setPods(pods);
    });
  }, [filters, sort]);

  useEffect(() => {
    getPods();
    const interval = setInterval(getPods, 1000 * config.refreshInterval);
    return () => clearInterval(interval);
  }, [getPods]);

  return { pods };
};
