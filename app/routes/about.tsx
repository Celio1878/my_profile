import { CheckCircle2, ExternalLink, Mail, Rocket, SquareArrowOutUpRight, Target } from 'lucide-react';
import { Nav } from '~/components/nav';
import { Reveal } from '~/components/reveal';
import { Footer } from '~/components/sections/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useI18n } from '~/i18n';
import type { Route } from './+types/about';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'About Célio Vieira — Founder, AI & Data Engineer' },
		{
			name: 'description',
			content:
				'Célio Vieira is an AI & Data Engineer, founder, and systems architect bridging deep distributed lakehouse engineering with commercial AI products and the Aldeon ecosystem.',
		},
		{ property: 'og:title', content: 'About Célio Vieira — Founder, AI & Data Engineer' },
		{
			property: 'og:description',
			content:
				'Founder, AI & Data Engineer architecting intelligent AI systems, lakehouses, and the Aldeon venture ecosystem.',
		},
		{ property: 'og:type', content: 'profile' },
		{ property: 'og:url', content: 'https://celiovieira.com/about' },
		{ property: 'og:image', content: 'https://celiovieira.com/me.jpeg' },
	];
}

export default function AboutRoute() {
	const { dict } = useI18n();

	return (
		<div className='min-h-screen flex flex-col pt-20'>
			<Nav />

			<main className='flex-1 container mx-auto px-4 sm:px-6 max-w-5xl py-12' id='main' role='main'>
				{/* Header Hero */}
				<Reveal>
					<div className='flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 pb-12 border-b border-gray-200/80 dark:border-gray-800/80'>
						<div className='relative group shrink-0 md:pt-2'>
							<div className='w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-primary/40 shadow-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary'>
								<img src='/me.jpeg' alt='Célio Vieira' className='w-full h-full object-cover' />
							</div>
						</div>

						<div className='text-center md:text-left flex-1'>
							<h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6'>
								{dict.about.heading}
							</h1>
							<div className='space-y-4 max-w-3xl text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed'>
								{dict.about.missionParagraphs.map((paragraph, idx) => (
									<p key={idx}>{paragraph}</p>
								))}
							</div>
						</div>
					</div>
				</Reveal>

				{/* Section 1: What I'm Building Now */}
				<section className='mb-16'>
					<Reveal delay={80}>
						<div className='flex items-center gap-3 mb-6'>
							<div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary'>
								<Rocket size={18} aria-hidden='true' />
							</div>
							<h2 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
								{dict.about.buildingTitle}
							</h2>
						</div>
					</Reveal>

					<div className='grid gap-4 sm:grid-cols-3'>
						{dict.about.buildingList.map((item, idx) => (
							<Reveal key={idx} delay={idx * 80 + 100}>
								<Card className='h-full border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:border-primary/40 transition-colors shadow-sm'>
									<CardHeader className='pb-2'>
										<div className='w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2 font-mono text-xs font-bold'>
											0{idx + 1}
										</div>
									</CardHeader>
									<CardContent>
										<p className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium'>
											{item}
										</p>
									</CardContent>
								</Card>
							</Reveal>
						))}
					</div>
				</section>

				{/* Section 2: Operating Principles */}
				<section className='mb-16'>
					<Reveal delay={120}>
						<div className='flex items-center gap-3 mb-6'>
							<div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary'>
								<Target size={18} aria-hidden='true' />
							</div>
							<h2 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
								{dict.about.principlesTitle}
							</h2>
						</div>
					</Reveal>

					<div className='grid gap-5 sm:grid-cols-2'>
						{dict.about.principles.map((principle, idx) => (
							<Reveal key={idx} delay={idx * 70 + 140}>
								<Card className='h-full border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md hover:border-primary/40 transition-colors shadow-sm'>
									<CardHeader className='pb-2'>
										<CardTitle className='text-base font-bold flex items-center gap-2 text-gray-900 dark:text-white'>
											<CheckCircle2
												size={16}
												className='text-primary shrink-0'
												aria-hidden='true'
											/>
											<span>{principle.title}</span>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
											{principle.desc}
										</CardDescription>
									</CardContent>
								</Card>
							</Reveal>
						))}
					</div>
				</section>

				{/* Section 3: Connect & Social Channels */}
				<section>
					<Reveal delay={160}>
						<div className='p-8 sm:p-10 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gradient-to-br from-white/90 via-slate-50/80 to-primary/5 dark:from-slate-900/90 dark:via-slate-950/80 dark:to-primary/10 backdrop-blur-md shadow-lg'>
							<div className='max-w-2xl mb-8'>
								<h2 className='text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2'>
									{dict.about.socialsTitle}
								</h2>
								<p className='text-sm sm:text-base text-gray-600 dark:text-gray-300'>
									{dict.about.socialsText}
								</p>
							</div>

							<div className='grid gap-3 sm:grid-cols-2 md:grid-cols-3'>
								<a
									href='mailto:contact@celiovieira.com'
									className='flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 hover:border-primary hover:text-primary transition-all text-sm font-semibold shadow-sm group'
								>
									<Mail size={18} className='text-primary shrink-0' aria-hidden='true' />
									<span className='truncate'>contact@celiovieira.com</span>
								</a>

								<a
									href='https://x.com/celio1878'
									target='_blank'
									rel='noreferrer'
									className='flex items-center justify-between p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 hover:border-primary hover:text-primary transition-all text-sm font-semibold shadow-sm group'
								>
									<div className='flex items-center gap-2.5 truncate'>
										<svg
											className='w-4 h-4 fill-current shrink-0 text-gray-500 group-hover:text-primary'
											viewBox='0 0 24 24'
											aria-hidden='true'
										>
											<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
										</svg>
										<span className='truncate'>{dict.contact.xTwitter}</span>
									</div>
									<SquareArrowOutUpRight
										size={14}
										className='shrink-0 text-gray-400 group-hover:text-primary'
									/>
								</a>

								<a
									href='https://substack.com/@celio1878'
									target='_blank'
									rel='noreferrer'
									className='flex items-center justify-between p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 hover:border-amber-500 hover:text-amber-500 transition-all text-sm font-semibold shadow-sm group'
								>
									<div className='flex items-center gap-2.5 truncate'>
										<svg
											className='w-4 h-4 fill-current shrink-0 text-amber-500'
											viewBox='0 0 24 24'
											aria-hidden='true'
										>
											<path d='M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z' />
										</svg>
										<span className='truncate'>{dict.contact.substack}</span>
									</div>
									<SquareArrowOutUpRight
										size={14}
										className='shrink-0 text-gray-400 group-hover:text-amber-500'
									/>
								</a>

								<a
									href='https://www.linkedin.com/in/celio-vieira'
									target='_blank'
									rel='noreferrer'
									className='flex items-center justify-between p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 hover:border-primary hover:text-primary transition-all text-sm font-semibold shadow-sm group'
								>
									<span className='truncate'>{dict.contact.linkedIn}</span>
									<SquareArrowOutUpRight
										size={14}
										className='shrink-0 text-gray-400 group-hover:text-primary'
									/>
								</a>

								<a
									href='https://github.com/Celio1878'
									target='_blank'
									rel='noreferrer'
									className='flex items-center justify-between p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 hover:border-primary hover:text-primary transition-all text-sm font-semibold shadow-sm group'
								>
									<span className='truncate'>{dict.contact.gitHub}</span>
									<SquareArrowOutUpRight
										size={14}
										className='shrink-0 text-gray-400 group-hover:text-primary'
									/>
								</a>

								<a
									href='https://www.youtube.com/@celio_vieira'
									target='_blank'
									rel='noreferrer'
									className='flex items-center justify-between p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 hover:border-primary hover:text-primary transition-all text-sm font-semibold shadow-sm group'
								>
									<span className='truncate'>{dict.contact.youTube}</span>
									<ExternalLink
										size={14}
										className='shrink-0 text-gray-400 group-hover:text-primary'
									/>
								</a>
							</div>
						</div>
					</Reveal>
				</section>
			</main>

			<Footer />
		</div>
	);
}
