import React, { Component } from 'react';

class BookForm extends Component {
	captureInput(e){
		e.preventDefault();
		const entry = {
			text: this.text.value,
			name: this.name.value
		};
		
		if(this.text.value || this.name.value){
			this.props.handleBookFormSubmits(entry);
			this.entryForm.reset();
		}
	}

	render(){
		return (
			<form action="" className="guestbook-form__container" ref={(input) => this.entryForm = input} onSubmit={(e) => {this.captureInput(e)}}>
				<fieldset>
					<legend>New guestbook entry</legend>
					<label htmlFor="text">Text</label>
					<textarea name="" className="form-control" ref={(input) => this.text = input} cols="30" rows="10">
					</textarea>
					<label htmlFor="name">Name</label>
					<input type="text" className="form-control" ref={(input) => this.name = input} />
					<button className="submit btn btn-success" type="submit">Send</button>
				</fieldset>
			</form>
		)
	}
}

export default BookForm;