import { trigger, state, style, animate, transition, stagger, query} from '@angular/animations';

export const ENTER_LEAVE_ANIMATION = [
    trigger('in-out', [
        state('in', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('void => *', [
            style({
                transform: 'translateX(-100%)',
                opacity: 1
            }),
            animate('0.4s ease-in')

        ]),
        transition('* => void', [
            style({
                transform: 'translateX(100%)',
                opacity: 0
            }),
            animate('0.2s 0.5s ease-out')
        ])
    ])
];
