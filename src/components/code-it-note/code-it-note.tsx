import { Component, Prop, h, Element, Build } from '@stencil/core';

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

	/**
	 * A MutationObserver to listen for changes to slots 
	 * and update the height accordingly.
	 *
	 * @type {MutationObserver}
	 * @memberof CodeItNote
	 */
	slotObserver: MutationObserver;

	/**
	 * Update card height and set the slot mutation
	 * observer after first render because otherwise 
	 * we won't have a height to work with.
	 *
	 * @memberof CodeItNote
	 */
	componentDidLoad() {
		// Don't do this if we aren't in browser.
		// The prerenderer won't like it.
		if (!Build.isBrowser) {
			return;
		}
		/*
		* Update card height and set the slot mutation
		* observer after first render because otherwise 
		* we won't have a height to work with.
		*/
		this.updateCardHeight();
		this.attachSlotObserver();
	}

	/**
	 * Cleanup the component.
	 *
	 * @memberof CodeItNote
	 */
	disconnectedCallback() {
		this.slotObserver.disconnect();
	}

	render() {
		return( 
			<div id="card">
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

				<svg id="icon-svg" xmlns="http://www.w3.org/2000/svg">
					<symbol id="arrow-icon" viewBox="0 0 33 33">
						<path stroke="#000" stroke-width="3" x="0" y="0" d="M8.192 0C4.638 6.439 4.039 16.259 18 15.932V8l12 12-12 12v-7.762C1.282 24.674-.58 9.481 8.192 0z"/>
					</symbol>
				</svg>
			</div>
		)
	}

	/**
	 * Because we are displaying each face of the card as position:absolute, 
	 * setting their heights to 100% won't size them correctly. This function
	 * updates the card container, and front and back faces height to match the
	 * largest face.
	 *
	 * @memberof CodeItNote
	 */
	updateCardHeight(): void {
		const card: HTMLElement = this.host.shadowRoot.querySelector('#card');
		const frontSide: HTMLElement = this.host.shadowRoot.querySelector('#front');
		const backSide: HTMLElement = this.host.shadowRoot.querySelector('#back');

		const frontSideHeight = frontSide.scrollHeight;
		const backSideHeight = backSide.scrollHeight;
		console.log('front: ', frontSideHeight);
		console.log('back: ', backSideHeight);

		card.style.height = 'auto';

		// Set the shortest face height equal to the tallest.
		if (frontSideHeight > backSideHeight) {
			frontSide.style.height = frontSideHeight.toString() + 'px';
			backSide.style.height = frontSideHeight.toString() + 'px';
			card.style.height = frontSideHeight.toString()+ 'px';
		} else if (backSideHeight > frontSideHeight) {
			backSide.style.height = backSideHeight.toString() + 'px';
			frontSide.style.height = backSideHeight.toString()+ 'px';
			card.style.height = backSideHeight.toString()+ 'px';
		} else {
			console.log('else');
		}
	}

	/**
	 * Attach a Mutation observer to the host element that updates the 
	 * card height in case slot children change.
	 *
	 * @memberof CodeItNote
	 */
	attachSlotObserver(): void {
		const config: MutationObserverInit = {childList: true, subtree: true, characterData: true};
		this.slotObserver = new MutationObserver(this.updateCardHeight.bind(this));
		this.slotObserver.observe(this.host, config);
	}

	/**
	 * Get the banner for a card face if the category-banner attribute is set.
	 *
	 * @returns
	 * @memberof CodeItNote
	 */
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
