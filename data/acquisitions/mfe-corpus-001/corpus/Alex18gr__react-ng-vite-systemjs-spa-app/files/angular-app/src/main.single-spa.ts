import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router, NavigationStart } from '@angular/router';

import {
  singleSpaAngular,
  getSingleSpaExtraProviders,
} from 'single-spa-angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import 'zone.js/dist/zone';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(
      AppModule
    );
  },
  template: '<app-root />',
  Router,
  NavigationStart,
  NgZone,
});

function setEnabledStyleTagByAttribute(
  attributeName: any,
  attributeValue: any,
  enableValue: boolean
) {
  const styleTags = document.head.querySelectorAll('style');
  console.log('Enabling or disabling Style Tags', styleTags);

  styleTags.forEach((styleTag) => {
    if (styleTag.getAttribute(attributeName) === attributeValue) {
      (styleTag as any).disabled = enableValue;
      console.log('Style Tag enabled or disabled', styleTag);
    }
  });
}

function enableStyleTabByAttribute(attributeName: any, attributeValue: any) {
  setEnabledStyleTagByAttribute(attributeName, attributeValue, false);
  console.log(setEnabledStyleTagByAttribute);
  console.log('Styles enabled!');
}

function disableStyleTabByAttribute(attributeName: any, attributeValue: any) {
  setEnabledStyleTagByAttribute(attributeName, attributeValue, true);
  console.log(setEnabledStyleTagByAttribute);
  console.log('Styles disabled!');
}

const unmountStyles = (props: any) => {
  return Promise.resolve().then(() => {
    function removeStyleTagByAttribute(
      attributeName: any,
      attributeValue: any
    ) {
      const styleTags = document.head.querySelectorAll('style');

      styleTags.forEach((styleTag) => {
        if (styleTag.getAttribute(attributeName) === attributeValue) {
          styleTag.remove();
        }
      });
    }

    function disableStyleTagByAttribute(
      attributeName: any,
      attributeValue: any
    ) {
      const styleTags = document.head.querySelectorAll('style');

      styleTags.forEach((styleTag: HTMLStyleElement) => {
        if (styleTag.getAttribute(attributeName) === attributeValue) {
          // (styleTag as any).disabled = true;
          (styleTag as any).disabled = true;
        }
      });
    }

    // Example usage: Remove a <style> tag with data-custom="remove-me"
    // removeStyleTagByAttribute('paokOle', '12345678');
    disableStyleTabByAttribute('paokOle', '12345678');

    // Do framework UI unrendering here

    console.log('unmounted!');
  });
};

const mountStyles = (props: any) => {
  return Promise.resolve().then(() => {
    // Example usage: Enable a <style> tag with data-custom="remove-me"
    // removeStyleTagByAttribute('paokOle', '12345678');
    enableStyleTabByAttribute('paokOle', '12345678');

    // Do framework UI unrendering here

    console.log('mounted!');
  });
};

export const bootstrap = lifecycles.bootstrap;
export const mount = [mountStyles, lifecycles.mount];
export const unmount = [unmountStyles, lifecycles.unmount];
