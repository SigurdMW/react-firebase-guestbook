import React, { Component } from 'react';
import EditBookEntryInline from './EditBookEntryInline';

class BookEntry extends Component {
	constructor(){
		super();

		this.toggleEditMode = this.toggleEditMode.bind(this);

		this.state = {
			editMode: false
		};
	}

	toggleEditMode(){
		this.setState({
			editMode: !this.state.editMode
		});
	}

	render(){
		const btnText = this.state.editMode ? "Lukk" : "Endre";
		return (
			<div className="book-entry">
				<p>{this.props.data.text}</p>
				<p>Skrevet av: {this.props.data.name}</p>
				<button onClick={(e)=>this.props.deleteEntry(this.props.index)}>&times;</button>
				<button onClick={this.toggleEditMode}>{btnText}</button>
				<EditBookEntryInline editMode={this.state.editMode} data={this.props.data} index={this.props.index} editEntry={this.props.editEntry} />
			</div>
		)
	}
}

export default BookEntry;