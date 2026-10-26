// App.jsx — Host Container Application
//
// Routes:
//   /              → Welcome page
//   /react-mfe-1   → React MFE 1 (Counter)
//   /react-mfe-2   → React MFE 2
//   /vue-mfe       → Vue MFE (Theme Switcher)
//   /angular-mfe   → Angular MFE (Fun Facts)
//   /route-map     → https://route-map-five.vercel.app/ (iframe)
//   /multibank     → https://multibank-1.onrender.com/ (iframe)

import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveRoute } from './store/appSlice';
import { Layout, Menu, Typography, Alert, Spin } from 'antd';
import {
  AppstoreOutlined,
  GlobalOutlined,
  HomeOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title } = Typography;

// ---------------------------------------------------------------
// NAV config
// ---------------------------------------------------------------
const MFE_NAV = [
  { label: 'React MFE 1', key: '/react-mfe-1', loader: () => import('reactMfe1/mount'), icon: <CodeOutlined /> },
  { label: 'React MFE 2', key: '/react-mfe-2', loader: () => import('reactMfe2/mount'), icon: <CodeOutlined /> },
  { label: 'Vue MFE',     key: '/vue-mfe',     loader: () => import('vueMfe/mount'),    icon: <AppstoreOutlined /> },
  { label: 'Angular MFE', key: '/angular-mfe', loader: () => import('angularMfe/mount'), icon: <AppstoreOutlined /> },
];

const IFRAME_NAV = [
  { label: 'Route Map', key: '/route-map', url: 'https://route-map-five.vercel.app/', icon: <GlobalOutlined /> },
  { label: 'Multibank', key: '/multibank', url: 'https://multibank-1.onrender.com/',  icon: <GlobalOutlined /> },
];

const ALL_NAV = [...MFE_NAV, ...IFRAME_NAV];

// ---------------------------------------------------------------
// MfeContainer — dynamically loads and mounts one MFE
// ---------------------------------------------------------------
function MfeContainer({ loader }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [error, setError]   = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    setStatus('loading');
    setError(null);
    container.innerHTML = '';

    loader()
      .then(({ default: mount }) => {
        mount(container);
        setStatus('loaded');
      })
      .catch((err) => {
        console.error('[Host] MFE load error:', err);
        setError('Could not load this microfrontend. Make sure it is running on its port.');
        setStatus('error');
      });
  }, [loader]);

  return (
    <div style={{ width: '100%' }}>
      {status === 'loading' && (
        <div style={spinWrap}>
          <Spin size="large" tip="Loading microfrontend…" />
        </div>
      )}
      {status === 'error' && (
        <Alert
          type="error"
          showIcon
          message="Failed to load microfrontend"
          description={error}
          style={{ margin: 24 }}
        />
      )}
      <div ref={containerRef} style={{ width: '100%' }} />
    </div>
  );
}

// ---------------------------------------------------------------
// IframeView — full-viewport-height iframe (no padding around it)
// ---------------------------------------------------------------
function IframeView({ url }) {
  return (
    <iframe
      src={url}
      title={url}
      style={{ width: '100%', height: 'calc(100vh - 64px)', border: 'none', display: 'block' }}
      allow="fullscreen"
    />
  );
}

// ---------------------------------------------------------------
// AppShell — uses useNavigate / useLocation (must be inside BrowserRouter)
// ---------------------------------------------------------------
function AppShell() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const dispatch  = useDispatch();

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: 'Home' },
    {
      key: 'mfe-group',
      icon: <CodeOutlined />,
      label: 'Microfrontends',
      children: MFE_NAV.map(({ label, key, icon }) => ({ key, icon, label })),
    },
    {
      key: 'ext-group',
      icon: <GlobalOutlined />,
      label: 'External Apps',
      children: IFRAME_NAV.map(({ label, key, icon }) => ({ key, icon, label })),
    },
  ];

  // Determine which group key is open based on current path
  const openKeys = location.pathname.startsWith('/route-map') || location.pathname.startsWith('/multibank')
    ? ['ext-group']
    : MFE_NAV.some(n => location.pathname.startsWith(n.key))
    ? ['mfe-group']
    : [];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ---- Top Header ---- */}
      <Header style={headerStyle}>
        <div style={logoStyle}>
          <Title level={4} style={{ color: '#fff', margin: 0, whiteSpace: 'nowrap' }}>
            MFE Shell
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={openKeys}
          items={menuItems}
          onClick={({ key }) => { navigate(key); dispatch(setActiveRoute(key)); }}
          style={{ flex: 1, minWidth: 0, background: 'transparent', borderBottom: 'none' }}
          overflowedIndicatorPopupClassName="mfe-overflow-menu"
        />
      </Header>

      {/* ---- Content area — full width, no max-width cap ---- */}
      <Content style={{ width: '100%', padding: 0 }}>
        <Routes>
          {/* Welcome */}
          <Route
            path="/"
            element={
              <div style={welcomeStyle}>
                <Title level={2}>Welcome to the Microfrontend Shell</Title>
                <p style={{ color: '#888', fontSize: 16 }}>
                  Select a microfrontend or an external app from the navigation above.
                </p>
                <p style={{ color: '#bbb', fontSize: 13, marginTop: 8 }}>
                  MFEs must be running on their own ports first.
                </p>
              </div>
            }
          />

          {/* MFE routes — full width, no padding */}
          {MFE_NAV.map(({ key, loader }) => (
            <Route
              key={key}
              path={key}
              element={
                <div style={{ width: '100%' }}>
                  <MfeContainer loader={loader} />
                </div>
              }
            />
          ))}

          {/* Iframe routes — zero padding, fills height */}
          {IFRAME_NAV.map(({ key, url }) => (
            <Route
              key={key}
              path={key}
              element={<IframeView url={url} />}
            />
          ))}
        </Routes>
      </Content>
    </Layout>
  );
}

// ---------------------------------------------------------------
// App — wraps AppShell in BrowserRouter
// ---------------------------------------------------------------
export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

// ---- Styles ----
const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 24px',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  width: '100%',
  background: '#001529',
  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
};

const logoStyle = {
  marginRight: 32,
  display: 'flex',
  alignItems: 'center',
};

const welcomeStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 64px)',
  textAlign: 'center',
  padding: 40,
};

const spinWrap = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 200,
};

