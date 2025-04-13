(new Reveal(document.querySelector('.deck1'), { embedded: true })).initialize( { 
	plugins: [ RevealMarkdown, RevealMath.KaTeX ],
	transition: 'fade',
	transitionSpeed: 'fast',
	progress: false
} );