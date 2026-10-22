import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { mount as mountMarketingApp } from 'marketing/MarketingApp';

const MarketingApp = () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mountMarketingApp(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathname }) => {
                if (history.location.pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            }
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />;
}

export default MarketingApp;
