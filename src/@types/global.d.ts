declare type PodStatus =
  | "Pending"
  | "Running"
  | "Succeeded"
  | "Failed"
  | "Unknown";

// k8s api types (partial, only data needed)
declare type ApiPod = {
  metadata: {
    uid: string;
    name: string;
    creationTimestamp: string;
    namespace: string;
    labels: Record<string, string>;
  };
  status: {
    phase: PodStatus;
  };
};

declare type ApiPodList = {
  items: ApiPod[];
};

declare type PodLabel = {
  name: string;
  value: string;
};

declare type Base = {
  uid: string;
};

// app types (used by the app, there will be indirection layer/mapping in the service layer)
declare type Pod = {
  name: string;
  namespace: string;
  createdAt: Date;
  labels: PodLabel[];
  status: PodStatus;
} & Base;

declare type Sort<T> = {
  key: keyof T; // sort only for keys on the generic type T
  dir: "asc" | "desc";
};

declare type Filter<T> = {
  key: keyof T; // filter only for keys on the generic type T
  values: Set<string>; // can have multiple values, in which case OR is used to apply the filter across all values
};
