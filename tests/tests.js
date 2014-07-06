$.tagMatch( { testObjGlobal: 'tagMatchTest' } );

QUnit.test( "method getNextTagFromHtml( html )", function( assert ) {
	assert.equal( 'div', tagMatchTest.getNextTagFromHtml( '<div>klsjdklfjsf' )['tag'], "opening tag" );
	assert.equal( 'div', tagMatchTest.getNextTagFromHtml( '      <div>klsjdklfjsf' )['tag'], "space then opening tag" );
	assert.equal( 'div', tagMatchTest.getNextTagFromHtml( '  \t    <div></div>' )['tag'], "tab then opening tag" );
	assert.equal( 'div', tagMatchTest.getNextTagFromHtml( '<div class="abc">klsjdklfjsf' )['tag'], "opening tag with class" );
	assert.equal( '/footer', tagMatchTest.getNextTagFromHtml( '</footer>' )['tag'], "closing tag (footer)" );
	assert.equal( '<comment>', tagMatchTest.getNextTagFromHtml( '<!-- comment -->' )['tag'], "comment" );
	assert.equal( '<comment>', tagMatchTest.getNextTagFromHtml( '<!-- this is a comment -->' )['tag'], "multiword comment" );
	assert.equal( '<comment>', tagMatchTest.getNextTagFromHtml( '<!-- this <span> wonk wonk wonk </span> is a comment -->' )['tag'], "comment tags with markup tags inside" );
	assert.equal( '<comment>', tagMatchTest.getNextTagFromHtml( '<!-- this <span> wonk\nwonk\nwonk </span> is a comment -->' )['tag'], "comment tags with markup tags inside w/ line breaks" );
	assert.ok( !tagMatchTest.getNextTagFromHtml( '<!-- incomplete comment --' ), "incomplete comment" );
	assert.ok( !tagMatchTest.getNextTagFromHtml( 'klsjdklfjsf' ), "text string, no tag" );
	assert.ok( !tagMatchTest.getNextTagFromHtml( '' ), "empty string, no tag" );
	assert.ok( !tagMatchTest.getNextTagFromHtml( '    /header>' ), "almost closing tag \"/header\", no tag" );

	assert.equal( 'klsjdklfjsf', tagMatchTest.getNextTagFromHtml( '<div>klsjdklfjsf' )['html'], "remaining html text" );
	assert.equal( 'klsjdklfjsf', tagMatchTest.getNextTagFromHtml( '      <div>klsjdklfjsf' )['html'], "remaining html space then opening tag" );
	assert.equal( '</div>', tagMatchTest.getNextTagFromHtml( '  \t    <div></div>' )['html'], "remaining html tab then opening tag" );
	assert.equal( 'klsjdklfjsf', tagMatchTest.getNextTagFromHtml( '<div class="abc">klsjdklfjsf' )['html'], "remaining html opening tag with class" );
	assert.equal( '', tagMatchTest.getNextTagFromHtml( '</footer>' )['html'], "remaining html closing tag (footer)" );
	assert.equal( 'abc', tagMatchTest.getNextTagFromHtml( '<!-- comment -->abc' )['html'], "remaining text after comment" );

});

QUnit.test( "method populateTagStack( html )", function( assert ) {
	assert.deepEqual( ['div'], tagMatchTest.populateTagStack( '<div>' ), "opening tag" );
	assert.deepEqual( ['header'], tagMatchTest.populateTagStack( '<header>' ), "opening tag" );
	assert.deepEqual( ['header', 'div'], tagMatchTest.populateTagStack( '<header><div>' ), "two tags" );
	assert.deepEqual( ['header', 'div', '/header'], tagMatchTest.populateTagStack( '<header><div></header>' ), "two open one closed tags" );
	assert.deepEqual( ['footer', 'div', 'span', '/span', '/header'], tagMatchTest.populateTagStack( '<footer> sdf \t sdf\n <div> <span> zyx </span></header>' ), "two open one closed tags" );
});


QUnit.test( "method isLoneTag( tag )", function( assert ) {
	assert.equal( true, tagMatchTest.isLoneTag( 'img' ), 'img' );
	assert.equal( false, tagMatchTest.isLoneTag( 'div' ), 'div' );
	assert.equal( true, tagMatchTest.isLoneTag( 'link' ), 'link' );
	assert.equal( true, tagMatchTest.isLoneTag( 'meta' ), 'meta' );
	assert.equal( false, tagMatchTest.isLoneTag( 'script' ), 'script' );

});
QUnit.test( "method validateTagStack( tagStack )", function( assert ) {
	assert.equal( true, tagMatchTest.validateTagStack( ['div', '/div'] ), 'two tags valid' );
	assert.equal( false, tagMatchTest.validateTagStack( ['/div', 'div'] ), 'two tags not valid' );
	assert.equal( true, tagMatchTest.validateTagStack( ['footer', 'span', '/span', 'a', '/a', '/footer'] ), 'a bunch of valid tags' );
	assert.equal( true, tagMatchTest.validateTagStack( ['footer', 'span', 'img', '/span', 'a', '/a', '/footer'] ), 'a bunch of valid tags with an image' );
});
