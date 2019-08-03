import { Component, Prop, h, Element } from '@stencil/core';

@Component({
  tag: 'code-it-note',
  styleUrl: 'code-it-note.css',
  shadow: true
})
export class CodeItNote {
	
	@Element() host: HTMLElement;

	/**
	 * True if the element is face down, otherwise false.
	 * @type {boolean}
	 * @memberof CodeItNote
	 */
	@Prop({
		mutable: true,
		reflect: true
	}) faceDown: boolean;

	/**
	 * The banner text for this card.
	 * Used in the card category banner.
	 * @type {String}
	 * @memberof CodeItNote
	 */
	@Prop() bannerText: string;

	componentDidLoad() {
		this.updateCardHeight();
	}

	componentWillUpdate() {
		this.updateCardHeight();
	}

  render() {
    return( 
			<main id="card">
				<section id="front" class="card-face">
					{this.getBanner()}
					<slot name="front-content"></slot>
					<button class="flip-button" onClick={this.flip.bind(this)}>
						<svg class="flip-button-icon">
							<use xlinkHref="#arrow-icon"/>
						</svg>
					</button>
				</section>

				<section id="back" class="card-face">
					{this.getBanner()}
					<slot name="back-content"></slot>
					<button class="flip-button" onClick={this.flip.bind(this)}>
						<svg class="flip-button-icon">
							<use xlinkHref="#arrow-icon"/>
						</svg>
					</button>
				</section>

				<svg xmlns="http://www.w3.org/2000/svg">
					<symbol id="arrow-icon" viewBox="0 0 33 33">
						<path stroke="#000" stroke-width="3" x="0" y="0" d="M8.192 0C4.638 6.439 4.039 16.259 18 15.932V8l12 12-12 12v-7.762C1.282 24.674-.58 9.481 8.192 0z"/>
					</symbol>
				</svg>
			</main>
		)
	}

	updateCardHeight(): void {

		const card: HTMLElement = this.host.shadowRoot.querySelector('#card');
		const frontSide: HTMLElement = this.host.shadowRoot.querySelector('#front');
		const backSide: HTMLElement = this.host.shadowRoot.querySelector('#back');
		
		const frontSideHeight = frontSide.clientHeight;
		const backSideHeight = backSide.clientHeight;

		// Set the shortest side height equal to the tallest.
		if (frontSideHeight > backSideHeight) {
			backSide.style.height = frontSideHeight.toString() + 'px';
			card.style.height = frontSideHeight.toString()+ 'px';
		} else {
			frontSide.style.height = backSideHeight.toString()+ 'px';
			card.style.height = backSideHeight.toString()+ 'px';
		}
	}

	getBanner() {
		if (this.bannerText) {
			return (<header class="category-banner">{this.bannerText}</header>)
		}
	}
	
	/**
	 * Flip the card by setting the faceDown prop to 
	 * the falsey value of itself.
	 * @memberof CodeItNote
	 */
	flip() {
		this.faceDown = !this.faceDown;
	}
}
