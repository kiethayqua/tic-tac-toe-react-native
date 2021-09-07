import React, { ReactElement, useEffect } from 'react';
import { AppBootstrap } from '@components';
import Navigator from '@configs/navigator';
import { setting } from '@utils';
import { observer } from 'mobx-react-lite';

function App(): ReactElement {
    useEffect(() => {
        setting._retrieveData();
    }, [])

    return (
        <AppBootstrap>
            <Navigator />
        </AppBootstrap>
    );
}

export default observer(App);
