import React from 'react';
import Button from './components/Button';
import Card from './components/Card';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Common Simple - Shared Components</h1>
      <p>This app exposes Button and Card components for other micro frontends.</p>
      
      <Card title="Button Component">
        <Button onClick={() => alert('Primary clicked!')}>Primary Button</Button>
        {' '}
        <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
          Secondary Button
        </Button>
      </Card>

      <Card title="Card Component">
        <p>This is a card component with a title and content.</p>
      </Card>
    </div>
  );
};

export default App;
