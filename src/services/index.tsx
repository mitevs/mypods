import { KubeService } from "./kube.service";

// DI container can be used when multiple services with dependencies between each other
export const services = {
  kubeService: new KubeService(),
};
