import { createElement } from 'react';

import { omit } from 'lodash';

import DateFilter from '@/components/date-filter/date-filter';
import ListFilterMulti from '@/components/list-filter-multi/list-filter-multi';
import { type PageFilterConfig } from '@/components/page-filters/page-filters.types';
import type domainPageQueryParamsConfig from '@/views/domain-page/config/domain-page-query-params.config';
import { WORKFLOW_STATUS_NAMES } from '@/views/shared/workflow-status-tag/workflow-status-tag.constants';

import { type WorkflowStatusClosed } from '../domain-workflows-archival-header/domain-workflows-archival-header.types';

const domainWorkflowsArchivalFiltersConfig: [
  PageFilterConfig<
    typeof domainPageQueryParamsConfig,
    { statusesArchival: Array<WorkflowStatusClosed> | undefined }
  >,
  PageFilterConfig<
    typeof domainPageQueryParamsConfig,
    {
      timeRangeStartArchival: Date | undefined;
      timeRangeEndArchival: Date | undefined;
    }
  >,
] = [
  {
    id: 'statuses',
    getValue: (v) => v,
    formatValue: (v) => v,
    component: ({ value, setValue }) =>
      createElement(ListFilterMulti<WorkflowStatusClosed>, {
        label: 'Status',
        placeholder: 'Show all statuses',
        values: value.statusesArchival,
        onChangeValues: (v) => setValue({ statusesArchival: v }),
        labelMap: omit(
          WORKFLOW_STATUS_NAMES,
          'WORKFLOW_EXECUTION_CLOSE_STATUS_INVALID'
        ),
      }),
  },
  {
    id: 'dates',
    getValue: (v) => v,
    formatValue: (v) => ({
      timeRangeStartArchival: v.timeRangeStartArchival?.toISOString(),
      timeRangeEndArchival: v.timeRangeEndArchival?.toISOString(),
    }),
    component: ({ value, setValue }) =>
      createElement(DateFilter, {
        label: 'Dates',
        placeholder: 'Select time range',
        dates: {
          start: value.timeRangeStartArchival,
          end: value.timeRangeEndArchival,
        },
        onChangeDates: ({ start, end }) =>
          setValue({
            timeRangeStartArchival: start,
            timeRangeEndArchival: end,
          }),
        clearable: false,
      }),
  },
] as const;

export default domainWorkflowsArchivalFiltersConfig;
