// import the required animation functions from the angular animations module
import { trigger, animate, transition, style } from '@angular/animations';

export const FadeInOutAnimation =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('FadeInOutAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.4s', style({ opacity: 1 }))
    ]),
  ]);
