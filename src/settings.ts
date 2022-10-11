/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockSettings } from '@frontify/guideline-blocks-settings';

export const ASSET_SETTINGS_ID = 'font';

export const settings: BlockSettings = {
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'custom_block',
            size: DropdownSize.Large,
            disabled: true,
            choices: [
                {
                    value: 'custom_block',
                    icon: 'Snippet' as IconEnum,
                    label: 'Custom Block',
                },
            ],
        },
    ],
    basics: [
        {
            id: 'font',
            type: 'assetInput',
            extensions: ['ttf', 'otf'],
            label: 'Font',
        },
    ],
    layout: [],
    style: [],
    security: [],
};
