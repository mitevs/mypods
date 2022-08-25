import { config } from "../config/env";
import { sortArray } from "../utils/arrays";

export class KubeService {
  async getPods(filters?: Filter<Pod>[], sort?: Sort<Pod>): Promise<Pod[]> {
    const res = await fetch(`${config.kubeApi}/pods`);
    const payload: ApiPodList = await res.json();

    let pods = payload.items.map<Pod>((item) => ({
      uid: item.metadata.uid,
      name: item.metadata.name,
      namespace: item.metadata.namespace,
      createdAt: new Date(item.metadata.creationTimestamp), // might be necessary to handle the parsing with a specific format here
      labels: Object.entries(item.metadata.labels).map(([key, value]) => ({
        name: key,
        value: value,
      })),
      status: item.status.phase,
    }));

    // apply filters => should be done on the api side in case paging exists
    if (Array.isArray(filters)) {
      pods = pods.filter((pod: Pod) => {
        let includePod = true;

        for (let filter of filters) {
          if (
            filter.type === "includes" &&
            !pod[filter.key].toString().includes(filter.value)
          ) {
            includePod = false;
            break;
          } else if (
            filter.type === "match" &&
            pod[filter.key] !== filter.value
          ) {
            includePod = false;
            break;
          }
        }

        return includePod;
      });
    }

    // apply sort => should be done on the api side in case paging exists
    if (sort?.key && sort?.dir) {
      return sortArray(pods, sort.key, sort.dir);
    }

    return pods;
  }
}
