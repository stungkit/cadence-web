import type React from 'react';

import type {
  SegmentProps,
  SegmentedControlProps,
} from 'baseui/segmented-control';

export type SegmentControlRoundedOption = Omit<SegmentProps, 'key'> & {
  key: React.Key; // make key required
};
export type Props = Pick<
  SegmentedControlProps,
  'activeKey' | 'disabled' | 'onChange'
> & {
  options: Array<SegmentControlRoundedOption>;
};
