import type { DomainData } from '../domains-page.types';

export default function filterDomainsIrrelevantToCluster(
  clusterName: string,
  domains: DomainData[]
) {
  return (domains || []).filter(({ clusters }) =>
    clusters.some(({ clusterName: c }) => clusterName === c)
  );
}
