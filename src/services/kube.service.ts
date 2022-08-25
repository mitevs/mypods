import { config } from "../config/env";
import { sortArray } from "../utils/arrays";

// get the pods from the kube api using filters and sorting
// the filters and sorting are applied on the client-side, but ideally the api should support filtering and sorting, or a middlware service can handle this instead
export class KubeService {
  async getPods(filters?: Filter<Pod>[], sort?: Sort<Pod>): Promise<Pod[]> {
    const res = await fetch(`${config.kubeApi}/pods`);
    const payload: ApiPodList = await res.json();

    // map the pod from the k8s api to the app-specific model
    let pods = payload.items.map<Pod>((item, i) => ({
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
    if (filters?.length) {
      pods = pods.filter((pod) => {
        let includePod = true;

        for (const filter of filters) {
          if (
            !Array.from(filter.values).some((value) =>
              pod[filter.key].toString().includes(value)
            )
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
