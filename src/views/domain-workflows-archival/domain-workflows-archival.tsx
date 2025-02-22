import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import request from '@/utils/request';
import { type DomainPageTabContentProps } from '@/views/domain-page/domain-page-content/domain-page-content.types';

import { type DomainInfo } from '../domain-page/domain-page.types';

import DomainWorkflowsArchivalDisabledPanel from './domain-workflows-archival-disabled-panel/domain-workflows-archival-disabled-panel';
import DomainWorkflowsArchivalHeader from './domain-workflows-archival-header/domain-workflows-archival-header';
import DomainWorkflowsArchivalTable from './domain-workflows-archival-table/domain-workflows-archival-table';

export default function DomainWorkflowsArchival(
  props: DomainPageTabContentProps
) {
  const {
    data: { historyArchivalStatus, visibilityArchivalStatus },
  } = useSuspenseQuery<DomainInfo>({
    queryKey: ['describeDomain', props],
    queryFn: () =>
      request(`/api/domains/${props.domain}/${props.cluster}`).then((res) =>
        res.json()
      ),
  });

  if (
    historyArchivalStatus !== 'ARCHIVAL_STATUS_ENABLED' ||
    visibilityArchivalStatus !== 'ARCHIVAL_STATUS_ENABLED'
  ) {
    return <DomainWorkflowsArchivalDisabledPanel />;
  }

  return (
    <>
      <DomainWorkflowsArchivalHeader
        domain={props.domain}
        cluster={props.cluster}
      />
      <DomainWorkflowsArchivalTable
        domain={props.domain}
        cluster={props.cluster}
      />
    </>
  );
}
