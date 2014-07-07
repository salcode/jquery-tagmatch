# jQuery TagMatch

### An Offline Basic HTML Validation Plugin

Basic validation checks for matching opening and closing tags.  Self-contained, does not use an outside service.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.tagmatch.min.js"></script>
	```

3. Call the plugin:

	```javascript
	$.tagMatch();
	```

## Structure

The basic structure of the project is given in the following way:

```
├── demo/
│   └── index.html
├── dist/
│   ├── jquery.tagmatch.js
│   └── jquery.tagmatch.min.js
├── src/
│   └── jquery.tagmatch.js
├── .editorconfig
├── .gitignore
├── .jshintrc
├── .travis.yml
├── tagmatch.jquery.json
├── Gruntfile.js
└── package.json
```

## Built With
[jQuery Boilerplate](https://github.com/jquery-boilerplate/jquery-boilerplate/)

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
