/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, useBlockAssets } from '@frontify/app-bridge';
import { FC, useEffect, useState } from 'react';
import { ASSET_SETTINGS_ID } from './settings';
import { Font } from 'lib-font';

type Props = {
    appBridge: AppBridgeBlock;
};

export const AnExampleBlock: FC<Props> = ({ appBridge }) => {
    const { blockAssets } = useBlockAssets(appBridge);
    const [fontInfo, setFontInfo] = useState('');
    const currentAssets = blockAssets[ASSET_SETTINGS_ID] ?? null;

    useEffect(() => {
        if (currentAssets) {
            const font = new Font(currentAssets[0].fileName, {
                skipStyleSheet: true,
            });

            font.src = currentAssets[0].originUrl;

            font.onload = (evt: { detail: { font: any } }) => {
                const font = evt.detail.font;
                const otTables = font.opentype.tables;
                const fontname = otTables.name.get(1);

                // get variable font axes
                const axes = otTables.fvar.axes;
                const axesInfo = [];

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                for (const [a, axis] of axes.entries()) {
                    const axisName = axis.tag;
                    const min = axis.minValue;
                    const max = axis.maxValue;
                    const defaultValue = axis.defaultValue;

                    axesInfo.push(`name:"${axisName}"; min:${min}; max:${max}; default:${defaultValue};`);
                }

                setFontInfo(`${fontname}<br>${axesInfo.join('<br>')}`);
            };
        }
    }, [currentAssets]);

    return <div dangerouslySetInnerHTML={{ __html: fontInfo }}></div>;
};
