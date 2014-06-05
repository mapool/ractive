import types from 'config/types';
import warn from 'utils/warn';
import createModel from 'virtualdom/items/Component/initialise/createModel/_createModel';
import createInstance from 'virtualdom/items/Component/initialise/createInstance';
import createBindings from 'virtualdom/items/Component/initialise/createBindings';
import propagateEvents from 'virtualdom/items/Component/initialise/propagateEvents';
import updateLiveQueries from 'virtualdom/items/Component/initialise/updateLiveQueries';
import config from 'config/config';

export default function Component$init ( options ) {
	var parentFragment,
		root,
		Component,
		data,
		toBind;

	parentFragment = this.parentFragment = options.parentFragment;
	root = parentFragment.root;

	this.root = root;
	this.type = types.COMPONENT;
	this.name = options.template.e;
	this.index = options.index;
	this.indexRefBindings = {};
	this.bindings = [];

	// get the component constructor
	Component = config.find( root, 'components', options.template.e );

	if ( !Component ) {
		throw new Error( 'Component "' + options.template.e + '" not found' );
	}

	// First, we need to create a model for the component - e.g. if we
	// encounter <widget foo='bar'/> then we need to create a widget
	// with `data: { foo: 'bar' }`.
	//
	// This may involve setting up some bindings, but we can't do it
	// yet so we take some notes instead
	toBind = [];
	data = createModel( this, Component.defaults.data || {}, options.template.a, toBind );

	createInstance( this, Component, data, options.template.f );
	createBindings( this, toBind );
	propagateEvents( this, options.template.v );

	// intro, outro and decorator directives have no effect
	if ( options.template.t1 || options.template.t2 || options.template.o ) {
		warn( 'The "intro", "outro" and "decorator" directives have no effect on components' );
	}

	updateLiveQueries( this );
}
