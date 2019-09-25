// import _ from 'lodash';
 import printMe from './print.js';
 import { cube } from './math.js';
 import './style.css';

 console.log('887700')
 console.log(cube(5))

  function component() {
    var element = document.createElement('div');
   var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

   btn.innerHTML = 'Click me and check the console!';
   btn.onclick = printMe;

   element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('SW registered: ', registration);
        }).catch(function (registrationError) {
        console.log('SW registration failed: ', registrationError);
        });
    });
}

    // function getComponent() {
    //    return import(/* webpackChunkName: "lodash" */ 'lodash').then(function(_) {
    //      var element = document.createElement('div');
    
    //      element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    
    //      return element;
    
    //    }).catch(function(error) { return 'An error occurred while loading the component'});
    // }

    // getComponent().then(function(component) {
    //     document.body.appendChild(component);
    // })

  if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}