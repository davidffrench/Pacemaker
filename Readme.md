# Pacemaker

Description: Assignment for MSc in Computing W.I.T.
- - -
## Project Setup

How do I, as a developer, start working on the project? 

Installation:

1. Copy folder to local web server and start server
2. Install node (http://nodejs.org/)
3. open command line and locate backend(node) root.
4. Run 'npm install'
5. Run 'npm start'
6. open http://localhost/Pacemaker/Desktop(ExtJS)  ( client )
7. open http://localhost/Pacemaker/SwaggerUI  ( api documentation )
8. Enjoy!

#####Bonus!
Backend published as npm module.  
use 'npm install pacemaker'  
https://www.npmjs.org/package/pacemaker

#### Build(Front End)
2 options(pick 1):

* (Sencha Cmd build
* Grunt build

Both are run through the command line from Desktop(ExtJS) root.

#####Sencha Cmd
```
Run 'sencha app build'  
```  
Requires Sencha Cmd version 4.0.x (http://www.sencha.com/products/sencha-cmd/download)

#####Grunt
```
Run 'grunt --force'  
```  
For JSDuck documentation generation, ruby and JSDuck need to be installed. Refer to this installation guide (https://github.com/senchalabs/jsduck/wiki/Installation)

#### Tests(Back end)
Open command line and locate backend(node) root  
Run 'npm start'  
Run 'istanbul cover node_modules/mocha/bin/_mocha -- -R spec'  
Coverage report generated under /coverage/lcov-report


###Deployed  
http://pacemaker.davidffrench.com  ( client )  
http://api.pacemaker.davidffrench.com  ( api documentation )

- - -
## License
The MIT License

Copyright (C) 2014 David Ffrench

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.