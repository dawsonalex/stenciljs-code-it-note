import { Component, Prop, h } from '@stencil/core';
import '@ionic/core';

@Component({
  tag: 'code-it-title',
  styleUrl: 'code-it-title.css',
  shadow: true
})
export class CodeItTitle {

	@Prop() iconName: string;

	@Prop() text: string;

  render() {
    return(
			<h1>{this.getIcon()}&nbsp;{this.text}</h1>
		)
	}

	/**
	 * Get a font-awesome icon element
	 *
	 * @returns
	 * @memberof CodeItTitle
	 */
	getIcon() {
		if (this.iconName) {
			return (<ion-icon name={'ios-' + this.iconName}></ion-icon>)
		}
	}
}
