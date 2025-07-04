import {
  scheduleActivityTaskEvent,
  cancelActivityTaskEvent,
  completeActivityTaskEvent,
  failedActivityTaskEvent,
  startActivityTaskEvent,
  timeoutActivityTaskEvent,
} from './workflow-history-activity-events';
import {
  startChildWorkflowEvent,
  cancelChildWorkflowEvent,
  failChildWorkflowEvent,
  initiateChildWorkflowEvent,
  terminateChildWorkflowEvent,
  timeoutChildWorkflowEvent,
  completeChildWorkflowEvent,
  initiateFailureChildWorkflowEvent,
} from './workflow-history-child-workflow-events';
import {
  scheduleDecisionTaskEvent,
  completeDecisionTaskEvent,
  failedDecisionTaskEvent,
  startDecisionTaskEvent,
  timeoutDecisionTaskEvent,
} from './workflow-history-decision-events';
import {
  pendingDecisionTaskStartEvent,
  pendingActivityTaskStartEvent,
} from './workflow-history-pending-events';
import {
  initiateRequestCancelExternalWorkflowEvent,
  requestCancelExternalWorkflowEvent,
  failRequestCancelExternalWorkflowEvent,
} from './workflow-history-request-cancel-external-workflow-events';
import {
  signalExternalWorkflowEvent,
  failSignalExternalWorkflowEvent,
  initiateSignalExternalWorkflowEvent,
} from './workflow-history-signal-external-workflow-events';
import {
  startWorkflowExecutionEvent,
  cancelRequestActivityTaskEvent,
  cancelWorkflowExecutionEvent,
  completeWorkflowExecutionEvent,
  continueAsNewWorkflowExecutionEvent,
  failCancelRequestActivityTaskEvent,
  failCancelTimerEvent,
  failWorkflowExecutionEvent,
  recordMarkerExecutionEvent,
  requestCancelWorkflowExecutionEvent,
  signalWorkflowExecutionEvent,
  terminateWorkflowExecutionEvent,
  timeoutWorkflowExecutionEvent,
  upsertWorkflowSearchAttributesEvent,
} from './workflow-history-single-events';
import {
  startTimerTaskEvent,
  cancelTimerTaskEvent,
  fireTimerTaskEvent,
} from './workflow-history-timer-events';

export const allWorkflowEvents = [
  scheduleActivityTaskEvent,
  cancelActivityTaskEvent,
  completeActivityTaskEvent,
  failedActivityTaskEvent,
  startActivityTaskEvent,
  timeoutActivityTaskEvent,
  scheduleDecisionTaskEvent,
  completeDecisionTaskEvent,
  failedDecisionTaskEvent,
  startDecisionTaskEvent,
  timeoutDecisionTaskEvent,
  startTimerTaskEvent,
  cancelTimerTaskEvent,
  fireTimerTaskEvent,
  startChildWorkflowEvent,
  cancelChildWorkflowEvent,
  failChildWorkflowEvent,
  initiateChildWorkflowEvent,
  terminateChildWorkflowEvent,
  timeoutChildWorkflowEvent,
  completeChildWorkflowEvent,
  initiateFailureChildWorkflowEvent,
  signalExternalWorkflowEvent,
  failSignalExternalWorkflowEvent,
  initiateSignalExternalWorkflowEvent,
  initiateRequestCancelExternalWorkflowEvent,
  requestCancelExternalWorkflowEvent,
  failRequestCancelExternalWorkflowEvent,
  startWorkflowExecutionEvent,
  cancelRequestActivityTaskEvent,
  cancelWorkflowExecutionEvent,
  completeWorkflowExecutionEvent,
  continueAsNewWorkflowExecutionEvent,
  failCancelRequestActivityTaskEvent,
  failCancelTimerEvent,
  failWorkflowExecutionEvent,
  recordMarkerExecutionEvent,
  requestCancelWorkflowExecutionEvent,
  signalWorkflowExecutionEvent,
  terminateWorkflowExecutionEvent,
  timeoutWorkflowExecutionEvent,
  upsertWorkflowSearchAttributesEvent,
];

export const allWorkflowEventsExtended = [
  ...allWorkflowEvents,
  pendingDecisionTaskStartEvent,
  pendingActivityTaskStartEvent,
];
