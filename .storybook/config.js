import { addDecorator, addParameters } from '@storybook/react';
import { withFetch } from 'storybook-fetch-addon';

addDecorator(withFetch);

addParameters({
  fetch: {
    // Required:
    fetch: param => fetch(`./api/recipe?id=${param}`),

    // Optional:
    map: data => {
      // transform data from api
      const props = {}; // Transform your data here
      return props; // Return the transformed props
    },
    valid: value => {
      // Validate value
      const valid = true; // Replace with your validation logic
      return valid;
    },
    defaultProps: {
      // Provide default props here
      // For example:
      someProp: 'defaultValue',
    },
  },
});
