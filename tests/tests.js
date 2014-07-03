QUnit.test( "method getNextTagFromHtml()", function( assert ) {
	$.tagMatch( { testObjGlobal: 'tagMatchTest' } );
	assert.equal( 'div', tagMatchTest.getNextTagFromHtml( '<div>klsjdklfjsf' )['tag'], "opening tag" );
	assert.equal( 'div', tagMatchTest.getNextTagFromHtml( '      <div>klsjdklfjsf' )['tag'], "space then opening tag" );
	assert.equal( 'div', tagMatchTest.getNextTagFromHtml( '  \t    <div></div>' )['tag'], "tab then opening tag" );
	assert.equal( 'div', tagMatchTest.getNextTagFromHtml( '<div class="abc">klsjdklfjsf' )['tag'], "opening tag with class" );
	assert.equal( '/footer', tagMatchTest.getNextTagFromHtml( '</footer>' )['tag'], "closing tag (footer)" );
	assert.ok( !tagMatchTest.getNextTagFromHtml( 'klsjdklfjsf' ), "text string, no tag" );
	assert.ok( !tagMatchTest.getNextTagFromHtml( '' ), "empty string, no tag" );
	assert.ok( !tagMatchTest.getNextTagFromHtml( '    /header>' ), "almost closing tag \"/header\", no tag" );
});
