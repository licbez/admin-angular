import { BREAKPOINT } from '@angular/flex-layout';

const PRINT_BREAKPOINTS = [{
  alias: 'xs',
  suffix: 'Xs',
  mediaQuery: 'screen and (max-width: 639px)',
  overlapping: false,
  priority: 1001,
}, {
    alias: 'sm',
    suffix: 'Sm',
    mediaQuery: 'screen and (min-width: 640px) and (max-width: 959px)',
    overlapping: false,
    priority: 1001,
  },
];

export const CustomBreakPointsProvider = {
  provide: BREAKPOINT,
  useValue: PRINT_BREAKPOINTS,
  multi: true,
};
