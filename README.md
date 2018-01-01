# Trello Mock
## A mock app of basic trello features using plain javascript

This project is a sample implementation of basic drag-drop features in Trello dashboard. It uses native DOM APIs to manipulate DOM.

## Demo
http://trello.afficiona.com

## How to develop
### Git clone
`git clone git@github.com:afficiona/trello-mock.git`
### Install dependencies
`npm i`

### Locally
`npm run start`
This should open the localhost url in the browser with the page ready.

### Production
`npm run build`
This command will generate the build files and assets, necessary for deployment to production. Two important modules, `copyfiles` and `replace-in-file` are used under the `build` command.

#### copyfiles
Since github-pages work only for index.html in the root directory, the demo page won't be working since the index.html file is located in the `build` directory(not at root level). In order to make the demo page pick up the index.html file, we copy it from build directory to the root directory.

#### replace-in-file
Now, this index.html will be referencing to assets which are still in the build directory but referenced relatively inside it. We need to update all those references too so that they point to the resources w.r.t the root directory. Hence, we use `replace-in-file` module which updates all the references in `index.html` and `*.css` in build directory to correctly locate them w.r.t the new location.

