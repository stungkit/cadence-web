'use client';
import React, { useMemo, useState } from 'react';

import CopyTextButton from '@/components/copy-text-button/copy-text-button';
import Link from '@/components/link/link';
import PrettyJson from '@/components/pretty-json/pretty-json';
import { type PrettyJsonValue } from '@/components/pretty-json/pretty-json.types';
import PrettyJsonSkeleton from '@/components/pretty-json-skeleton/pretty-json-skeleton';
import SegmentedControlRounded from '@/components/segmented-control-rounded/segmented-control-rounded';
import useStyletronClasses from '@/hooks/use-styletron-classes';
import losslessJsonStringify from '@/utils/lossless-json-stringify';

import { jsonViewTabsOptions } from './workflow-summary-tab-json-view.constants';
import { cssStyles, overrides } from './workflow-summary-tab-json-view.styles';
import type { Props } from './workflow-summary-tab-json-view.types';

export default function WorkflowSummaryTabJsonView({
  inputJson,
  resultJson,
  isWorkflowRunning,
  isArchived,
  domain,
  cluster,
  runId,
  workflowId,
}: Props) {
  const { cls } = useStyletronClasses(cssStyles);
  const jsonMap: Record<string, PrettyJsonValue> = useMemo(
    () => ({
      input: inputJson,
      result: resultJson,
    }),
    [inputJson, resultJson]
  );
  const [activeTab, setActiveTab] = useState<string>(
    jsonViewTabsOptions[0].key
  );

  const textToCopy = useMemo(() => {
    return losslessJsonStringify(jsonMap[activeTab], null, '\t');
  }, [jsonMap, activeTab]);

  return (
    <div className={cls.jsonViewContainer}>
      <div className={cls.jsonViewHeader}>
        <SegmentedControlRounded
          activeKey={activeTab}
          options={jsonViewTabsOptions}
          onChange={({ activeKey }) => setActiveTab(activeKey.toString())}
        />
        <CopyTextButton
          textToCopy={textToCopy}
          overrides={overrides.copyButton}
        />
      </div>
      {activeTab === 'input' && <PrettyJson json={jsonMap[activeTab]} />}
      {activeTab === 'result' && isArchived && (
        <div className={cls.archivedResult}>
          Workflow is archived, result is only available in{' '}
          <Link
            href={`/domains/${domain}/${cluster}/workflows/${workflowId}/${runId}/history`}
          >
            history
          </Link>
        </div>
      )}
      {activeTab === 'result' && !isArchived && (
        <>
          {isWorkflowRunning && <PrettyJsonSkeleton width="200px" />}
          {!isWorkflowRunning && <PrettyJson json={jsonMap[activeTab]} />}
        </>
      )}
    </div>
  );
}
