// global.d.ts
import 'react';

declare global {
    namespace React {
        interface CSSProperties {
            '--fa-primary-color'?: string;
            '--fa-secondary-color'?: string;
        }
    }
}
