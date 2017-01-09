import React, { Component } from 'react';

class EditBookEntryInline extends Component {
	render(){
		if(this.props.editMode){
			return (
				<div>
					<textarea onChange={(e) => this.props.editEntry(e, this.props.index)} defaultValue={this.props.data.text} name="" id="" cols="30" rows="10"></textarea>
				</div>
			)
		}

		return null;
	}
}

export default EditBookEntryInline;