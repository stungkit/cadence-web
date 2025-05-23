'use client';
import React from 'react';

import { Tag, VARIANT } from 'baseui/tag';

import WorkflowStatusTagIcon from './workflow-status-tag-icon/workflow-status-tag-icon';
import { WORKFLOW_STATUS_NAMES } from './workflow-status-tag.constants';
import { overrides } from './workflow-status-tag.styles';
import type { Props } from './workflow-status-tag.types';

export default function WorkflowStatusTag(props: Props) {
  return (
    <Tag
      variant={VARIANT.solid}
      closeable={false}
      overrides={
        overrides({
          status: props.status,
          link: props.link,
          isArchived: props.isArchived,
        }).tag
      }
      // To render hover & focus effects for the tag, we need to pass an onClick hander
      // However, since we are already passing a link through overrides, we pass a no-op here
      {...(props.link && {
        onClick: () => {},
      })}
    >
      <WorkflowStatusTagIcon
        kind="start"
        status={props.status}
        link={props.link}
        isArchived={props.isArchived}
      />
      {props.isArchived ? 'Archived' : WORKFLOW_STATUS_NAMES[props.status]}
      <WorkflowStatusTagIcon
        kind="end"
        status={props.status}
        link={props.link}
        isArchived={props.isArchived}
      />
    </Tag>
  );
}
