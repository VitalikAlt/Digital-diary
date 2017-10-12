// import the required animation functions from the angular animations module
import { trigger, animate, transition, style } from '@angular/animations';

export const FadeInOutAnimation =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('FadeInOutAnimation', [
    transition('void => *', [
      style({transform: 'translateX(10%)', opacity: 0}),
      animate('.4s cubic-bezier(0.550, 0.055, 0.675, 0.190)')
    ])
  ]);
