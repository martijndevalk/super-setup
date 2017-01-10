# Installation instructions - Aegon #


## Front-end installation ##
 
1. **Install Bower**

	Bower can be installed using [npm](https://nodejs.org/en/), the Node package manager. If you don’t already have npm installed, head over to the [Node.js website](https://nodejs.org/en/) and download the relevant copy of Node.js for your system. The npm program is included with the install of Node.js.

	Once you have npm installed, open up Terminal (or Command Prompt) and enter the following command:

    `npm install -g bower`
2. **Install Bower packages**

	Install packages with `bower install` from within the project `/Static` folder. Bower installs packages to `libs/`.
	
	`bower install`

3. **Install NPM packages**


	From within the project `/Static` folder install the NPM packages.

	`npm install`

4. **Install Grunt-cli**
	
> The Grunt command line interface.
		
Install this globally and you'll have access to the grunt command anywhere on your system.	

	`npm install -g grunt-cli`

5. **Run project**

	`grunt develop`

## Credits ##

- Wessel Terpstra - [wessel.terpstra@valtech.nl](wessel.terpstra@valtech.nl)
- Martijn de Valk - [martijn.de.valk@valtech.nl](martijn.de.valk@valtech.nl)