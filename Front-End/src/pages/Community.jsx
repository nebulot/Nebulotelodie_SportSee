import ComingSoon from '../components/ComingSoon'

/**
 * Render Community page
 *
 * @category Pages
 * @component
 * @returns { React.Component } A React component
 */
function Community() {
	document.title = 'Communauté - SportSee'

	return (
		<section className="community">
			<ComingSoon />
		</section>
	)
}

export default Community