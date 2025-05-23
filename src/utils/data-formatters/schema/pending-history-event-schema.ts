import { z } from 'zod';

import { PendingActivityState } from '@/__generated__/proto-ts/uber/cadence/api/v1/PendingActivityState';
import { PendingDecisionState } from '@/__generated__/proto-ts/uber/cadence/api/v1/PendingDecisionState';

const timestampSchema = z.object({
  seconds: z.string(),
  nanos: z.number(),
});

const payloadSchema = z.object({
  data: z.string(),
});

const activityTypeSchema = z.object({
  name: z.string(),
});

const failureSchema = z.object({
  reason: z.string(),
  details: z.string(),
});

export const pendingActivityTaskStartSchema = z.object({
  attributes: z.literal('pendingActivityTaskStartEventAttributes'),
  eventTime: timestampSchema.nullable(),
  eventId: z.null(),
  computedEventId: z.string(),
  pendingActivityTaskStartEventAttributes: z.object({
    activityId: z.string(),
    activityType: activityTypeSchema.nullable(),
    state: z.enum([
      PendingActivityState.PENDING_ACTIVITY_STATE_SCHEDULED,
      PendingActivityState.PENDING_ACTIVITY_STATE_STARTED,
      PendingActivityState.PENDING_ACTIVITY_STATE_CANCEL_REQUESTED,
    ]),
    heartbeatDetails: payloadSchema.nullable(),
    lastHeartbeatTime: timestampSchema.nullable(),
    lastStartedTime: timestampSchema.nullable(),
    scheduledTime: timestampSchema.nullable(),
    expirationTime: timestampSchema.nullable(),
    attempt: z.number(),
    maximumAttempts: z.number(),
    lastFailure: failureSchema.nullable(),
    lastWorkerIdentity: z.string(),
    startedWorkerIdentity: z.string(),
    scheduleId: z.string(),
  }),
});

export const pendingDecisionTaskStartSchema = z.object({
  attributes: z.literal('pendingDecisionTaskStartEventAttributes'),
  eventTime: timestampSchema.nullable(),
  eventId: z.null(),
  computedEventId: z.string(),
  pendingDecisionTaskStartEventAttributes: z.object({
    state: z.enum([
      PendingDecisionState.PENDING_DECISION_STATE_SCHEDULED,
      PendingDecisionState.PENDING_DECISION_STATE_STARTED,
    ]),
    scheduledTime: timestampSchema.nullable(),
    startedTime: timestampSchema.nullable(),
    attempt: z.number(),
    originalScheduledTime: timestampSchema.nullable(),
    scheduleId: z.string(),
  }),
});
