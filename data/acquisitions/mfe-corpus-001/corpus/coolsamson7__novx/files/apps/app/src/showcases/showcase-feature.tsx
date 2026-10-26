import React from 'react';

import { Feature } from '@novx/portal';

@Feature({
  id: "showcase",
  path: "showcase",
  parent: "showcases",
  description: "showcase",
  tags: ["showcase"],
  permissions: [],
  features: [],
  visibility: ["private", "public"]
})
class ShowcaseFeature extends React.Component {
  render() {
    return <div  style={{
        fontSize: '32px',
        fontWeight: 'bold',
        margin: '24px',
        textAlign: 'center'
      }}>
      Showcase
    </div>;
  }
}
