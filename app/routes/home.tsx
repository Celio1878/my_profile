import { Nav } from '~/components/nav';
import { Capabilities } from '~/components/sections/capabilities';
import { ContactSection } from '~/components/sections/contact-section';
import { Footer } from '~/components/sections/footer';
import { Hero } from '~/components/sections/hero';
import { LatestInsights } from '~/components/sections/latest-insights';
import { Ventures } from '~/components/sections/ventures';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Célio Vieira — Founder, AI & Data Engineer' },
		{
			name: 'description',
			content:
				'Célio Vieira — Founder, AI & Data Engineer. Architecting intelligent AI systems, lakehouses, and commercial products under the Aldeon ecosystem.',
		},
		{
			name: 'keywords',
			content:
				'Célio Vieira, aldeon, founder, ai engineer, data engineer, lakehouse, apache iceberg, spark, rag, react, react native, node.js, aws, systems architecture',
		},
		{ name: 'author', content: 'Célio Vieira' },
		{
			property: 'og:title',
			content: 'Célio Vieira — Founder, AI & Data Engineer',
		},
		{
			property: 'og:description',
			content: 'Architecting intelligent AI systems, lakehouses, and the Aldeon venture ecosystem.',
		},
		{ property: 'og:url', content: 'https://celiovieira.com/' },
		{ property: 'og:type', content: 'website' },
		{ property: 'og:image', content: 'https://celiovieira.com/me.jpeg' },
		{ property: 'og:site_name', content: 'Célio Vieira' },
		{ name: 'twitter:card', content: 'summary_large_image' },
		{
			name: 'twitter:title',
			content: 'Célio Vieira — Founder, AI & Data Engineer',
		},
		{
			name: 'twitter:description',
			content: 'Architecting intelligent AI systems, lakehouses, and the Aldeon venture ecosystem.',
		},
		{ name: 'twitter:image', content: 'https://celiovieira.com/me.jpeg' },
	];
}

export const links: Route.LinksFunction = () => [{ rel: 'canonical', href: 'https://celiovieira.com/' }];

export default function Home() {
	return (
		<div className='min-h-screen flex flex-col'>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Person',
						name: 'Célio Vieira',
						url: 'https://celiovieira.com/',
						image: 'https://celiovieira.com/me.jpeg',
						jobTitle: 'Founder, AI & Data Engineer',
						sameAs: [
							'https://x.com/celio1878',
							'https://substack.com/@celio1878',
							'https://www.linkedin.com/in/celio-vieira',
							'https://github.com/Celio1878',
							'https://www.youtube.com/@celio_vieira',
						],
						description:
							'Célio Vieira is a Founder, AI & Data Engineer architecting intelligent AI systems, lakehouses, and the Aldeon venture ecosystem.',
					}),
				}}
			/>
			<Nav />
			<main id='main' role='main' aria-label='Main content' className='flex-1'>
				<Hero />
				<Ventures />
				<Capabilities />
				<LatestInsights />
				<ContactSection />
			</main>
			<Footer />
		</div>
	);
}
