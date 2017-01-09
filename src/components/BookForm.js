import React, { Component } from 'react';

class BookForm extends Component {
	captureInput(e){
		e.preventDefault();
		const entry = {
			text: this.text.value,
			name: this.name.value
		};
		
		this.props.handleBookFormSubmits(entry);
		this.entryForm.reset();
	}

	render(){
		return (
			<form action="" className="guestbook-form__container" ref={(input) => this.entryForm = input} onSubmit={(e) => {this.captureInput(e)}}>
				<fieldset>
					<legend>New guestbook entry</legend>
					<label htmlFor="text">Text</label>
					<textarea name=""  ref={(input) => this.text = input} cols="30" rows="10">
					</textarea>
					<label htmlFor="name">Name</label>
					<input type="text" ref={(input) => this.name = input} />
					<button className="submit" type="submit">Send</button>
				</fieldset>
			</form>
		)
	}
}

export default BookForm;