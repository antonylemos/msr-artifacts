import React, { useRef, useEffect } from 'react';
import { mount as mountDashboardApp } from 'dashboard/DashboardApp';

const DashboardApp = () => {
    const ref = useRef(null);

    useEffect(() => {
        mountDashboardApp(ref.current);
    }, []);

    return <div ref={ref} />;
}

export default DashboardApp;
