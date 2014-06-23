console.log( 'tests.js' );

QUnit.test( "", function( assert ) {
	$.tagMatch( { testObjGlobal: 'tagMatchTest' } );
	assert.equal( 7, tagMatchTest.alwaysSeven(), "method alwaysSeven() is true to its word returning 7" );
});
