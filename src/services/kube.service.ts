import { config } from "../config/env";
import { sortArray } from "../utils/arrays";

export class KubeService {
  async getPods(sort?: {
    key: keyof Pod;
    dir: "asc" | "desc";
  }): Promise<Pod[]> {
    const res = await fetch(`${config.kubeApi}/pods`);
    const payload: ApiPodList = await res.json();

    const pods = payload.items.map<Pod>((item) => ({
      uid: item.metadata.uid,
      name: item.metadata.name,
      namespace: item.metadata.namespace,
      createdAt: new Date(item.metadata.creationTimestamp), // might be necessary to handle the parsing with a specific format here
      labels: item.metadata.labels,
      status: item.status.phase,
    }));

    // apply filters => should be done on the api side in case paging exists

    // apply sort => should be done on the api side in case paging exists
    if (sort?.key && sort?.dir) {
      return sortArray(pods, sort.key, sort.dir);
    }

    return pods;
  }
}
