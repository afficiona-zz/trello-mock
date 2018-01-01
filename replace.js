const replace = require('replace-in-file');
const options = {
  files: [
    'index.html',
    'build/static/css/*.css'
  ],
  from: /\/static\//g,
  to: '/build/static/'
};

replace(options)
  .then(changes => {
    console.log('Modified files:', changes.join(', '));
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });