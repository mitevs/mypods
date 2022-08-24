// k8s api types (partial, only data needed)
declare type ApiPod = {
  metadata: {
    uid: string;
    name: string;
    creationTimestamp: string;
    namespace: string;
    labels: { [key: string]: string };
  };
  status: {
    phase: "Pending" | "Running" | "Succeeded" | "Failed" | "Unknown";
  };
};

declare type ApiPodList = {
  items: ApiPod[];
};

// app types (used by the app, there will be indirection layer/mapping in the service layer)
declare type Pod = {
  uid: string;
  name: string;
  namespace: string;
  createdAt: Date;
  labels: { [key: string]: string };
  status: "Pending" | "Running" | "Succeeded" | "Failed" | "Unknown";
};

declare type Sort<T> = {
  key: keyof T;
  dir: "asc" | "desc";
};
