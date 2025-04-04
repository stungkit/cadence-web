import { getDomainObj } from '@/views/domains-page/__fixtures__/domains';
import { type DomainData } from '@/views/domains-page/domains-page.types';

import RedirectDomain from '../redirect-domain';

const MOCK_ALL_DOMAINS: Array<DomainData> = [
  getDomainObj({
    name: 'mock-domain-unique',
    id: 'mock-domain-id-unique',
    activeClusterName: 'mock-cluster-1',
    clusters: [
      { clusterName: 'mock-cluster-1' },
      { clusterName: 'mock-cluster-2' },
    ],
  }),
  getDomainObj({
    name: 'mock-domain-shared-name',
    id: 'mock-domain-id-shared-name-1',
    activeClusterName: 'mock-cluster-1',
    clusters: [
      { clusterName: 'mock-cluster-1' },
      { clusterName: 'mock-cluster-2' },
    ],
  }),
  getDomainObj({
    name: 'mock-domain-shared-name',
    id: 'mock-domain-id-shared-name-2',
    activeClusterName: 'mock-cluster-3',
    clusters: [
      { clusterName: 'mock-cluster-3' },
      { clusterName: 'mock-cluster-4' },
    ],
  }),
];

const mockRedirect = jest.fn();
jest.mock('next/navigation', () => ({
  redirect: (url: string) => {
    mockRedirect(url);
    // Server component stops rendering after a redirect is called
    throw new Error('Redirected');
  },
  notFound: () => {
    // Server component stops rendering after notFound is called
    throw new Error('Not found');
  },
}));

jest.mock(
  '@/views/domains-page/helpers/get-all-domains',
  jest.fn(() => ({
    getCachedAllDomains: jest.fn(() => ({
      domains: MOCK_ALL_DOMAINS,
      failedClusters: [],
    })),
  }))
);

describe(RedirectDomain.name, () => {
  const tests: Array<{
    name: string;
    urlParams: Array<string>;
    queryParams?: { [key: string]: string | string[] | undefined };
    assertOnError?: (e: Error) => void;
    expectedRedirect?: string;
  }> = [
    {
      name: 'should redirect to domain page of active cluster',
      urlParams: ['mock-domain-unique'],
      expectedRedirect: '/domains/mock-domain-unique/mock-cluster-1',
    },
    {
      name: 'should redirect to workflow page of active cluster',
      urlParams: ['mock-domain-unique', 'workflows', 'mock-wfid', 'mock-runid'],
      expectedRedirect:
        '/domains/mock-domain-unique/mock-cluster-1/workflows/mock-wfid/mock-runid',
    },
    {
      name: 'should redirect with query params',
      urlParams: [
        'mock-domain-unique',
        'workflows',
        'mock-wfid',
        'mock-runid',
        'history',
      ],
      queryParams: {
        ht: 'ACTIVITY',
        hs: 'COMPLETED',
      },
      expectedRedirect:
        '/domains/mock-domain-unique/mock-cluster-1/workflows/mock-wfid/mock-runid/history?ht=ACTIVITY&hs=COMPLETED',
    },
    {
      name: 'should redirect to All Domains page with search param if multiple domains exist',
      urlParams: ['mock-domain-shared-name'],
      expectedRedirect: '/domains?s=mock-domain-shared-name',
    },
    {
      name: 'should redirect to All Domains page with search param if multiple domains exist, for workflow link',
      urlParams: [
        'mock-domain-shared-name',
        'workflows',
        'mock-wfid',
        'mock-runid',
      ],
      expectedRedirect: '/domains?s=mock-domain-shared-name',
    },
    {
      name: 'should call notFound if no domain exists',
      urlParams: ['mock-domain-nonexistent'],
      assertOnError: (e) => {
        expect(e.message).toEqual('Not found');
      },
    },
    {
      // This never happens in practice because the router simply would not route to this component
      name: 'should throw if domain is invalid',
      urlParams: [],
      assertOnError: (e) =>
        expect(e.message).toEqual('Invalid domain URL param'),
    },
  ];

  tests.forEach((test) =>
    it(test.name, async () => {
      try {
        await RedirectDomain({
          params: { domainParams: test.urlParams },
        });

        expect(mockRedirect).toHaveBeenCalledWith(test.expectedRedirect);
      } catch (e) {
        if (e instanceof Error && e.message !== 'Redirected') {
          expect(test.assertOnError).toBeDefined();
          test.assertOnError?.(e);
        }
      }
    })
  );
});
