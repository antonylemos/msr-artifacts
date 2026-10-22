import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App'; 

@customElement('my-counter-lit-app')
export class SimpleGreeting extends LitElement {

  @property()
  theme = 'dark';

  @property()
  maxCount = 5;

  render() {
    return html`<div id="my-counter"></div>`;
  }

  firstUpdated() {
    const container = this.shadowRoot.getElementById('my-counter');
    const ReactComponent = createComponent(React, ReactDOM, App);
    ReactDOM.render(React.createElement(ReactComponent, { theme: this.theme, maxCount: this.maxCount }), container);
  }

}