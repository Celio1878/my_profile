import {
	BookOpen,
	Cloud,
	ExternalLink,
	Layers,
	PackageCheck,
	Paintbrush,
	Share2,
	SquareArrowOutUpRight,
	Terminal,
} from 'lucide-react';
import { Link } from 'react-router';
import { Reveal } from '~/components/reveal';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useI18n } from '~/i18n';

export function Ventures() {
	const { dict } = useI18n();

	return (
		<section id='ecosystem' className='py-16 container mx-auto px-4 max-w-5xl scroll-mt-20'>
			<div id='projects' className='scroll-mt-24' />

			{/* Section Header */}
			<Reveal>
				<div className='text-center max-w-2xl mx-auto mb-14'>
					<h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3'>
						{dict.ecosystem.heading}
					</h2>
					<p className='text-sm sm:text-base text-slate-600 dark:text-slate-400'>
						{dict.ecosystem.subheading}
					</p>
				</div>
			</Reveal>

			{/* Flagship Umbrella Card: Aldeon */}
			<Reveal delay={100}>
				<div className='mb-12 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-white/95 to-slate-50/80 dark:from-[#0d131d]/95 dark:to-[#090d14]/80 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-emerald-500/5 relative overflow-hidden'>
					{/* Subtle decorative circuit watermark */}
					<div
						aria-hidden='true'
						className='pointer-events-none absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-500/5 blur-2xl'
					/>

					<div className='flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-[#212836]'>
						<div>
							<div className='flex items-center gap-2 mb-2'>
								<Badge
									variant='outline'
									className='bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-mono font-bold'
								>
									Platform
								</Badge>
								<span className='text-xs font-mono text-muted-foreground'>aldeon.app</span>
							</div>
							<h3 className='text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white'>
								{dict.ecosystem.aldeonTitle}
							</h3>
							<p className='text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1'>
								{dict.ecosystem.aldeonTagline}
							</p>
						</div>

						<a
							href='https://aldeon.app'
							target='_blank'
							rel='noreferrer'
							className='inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all hover:scale-105 shadow-sm shrink-0 self-start md:self-auto'
						>
							<span>{dict.ecosystem.visitAldeon}</span>
							<SquareArrowOutUpRight size={13} aria-hidden='true' />
						</a>
					</div>

					<p className='text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-5 max-w-3xl'>
						{dict.ecosystem.aldeonDescription}
					</p>

					<div className='flex flex-wrap gap-2 mt-5 font-mono text-xs'>
						{[
							'Multi-Product Ecosystem',
							'React Router SSR',
							'Vercel Edge',
							'AWS sa-east-1',
							'Terraform IaC',
							'RevenueCat',
						].map((chip) => (
							<span
								key={chip}
								className='px-2.5 py-1 rounded-md border border-slate-200 dark:border-[#212836] bg-slate-100/50 dark:bg-[#161e2b]/50 text-slate-700 dark:text-slate-300 text-[11px]'
							>
								{chip}
							</span>
						))}
					</div>
				</div>
			</Reveal>

			{/* Child Ventures Grid */}
			<div className='mb-6'>
				<h3 className='text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-2'>
					<Layers size={14} className='text-emerald-500' />
					<span>{dict.ecosystem.productsHeading}</span>
				</h3>
			</div>

			<div className='grid md:grid-cols-2 gap-6 mb-12'>
				{/* Child Venture 1: Be Your Stories (BYS) */}
				<Reveal delay={120}>
					<Card className='card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md'>
						<CardHeader className='pb-3 flex-1'>
							<div className='flex items-center justify-between gap-2 mb-2'>
								<Badge
									variant='outline'
									className='bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20 text-xs font-mono'
								>
									Live Consumer App
								</Badge>
								<span className='text-[11px] font-mono text-emerald-500 font-bold'>
									iOS • Android • Web
								</span>
							</div>
							<CardTitle className='text-xl font-bold flex items-center gap-2'>
								<BookOpen size={18} className='text-sky-500' />
								<span>{dict.ecosystem.bysTitle}</span>
							</CardTitle>
							<p className='text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5'>
								{dict.ecosystem.bysTagline}
							</p>
							<CardDescription className='text-xs sm:text-sm mt-2 text-slate-600 dark:text-slate-300 leading-relaxed'>
								{dict.ecosystem.bysDescription}
							</CardDescription>
						</CardHeader>
						<CardContent className='pt-0'>
							<div className='flex flex-wrap gap-1.5 mb-5 font-mono'>
								{['React Native', 'Offline-First', 'Supabase', 'Meilisearch', 'Polly Audio'].map(
									(tag) => (
										<Badge
											key={tag}
											variant='outline'
											className='text-[11px] bg-slate-100/50 dark:bg-[#161e2b]/50'
										>
											{tag}
										</Badge>
									)
								)}
							</div>
							<div className='flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#212836]'>
								<a
									href='https://beyourstories.com'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-primary text-white hover:bg-emerald-600 transition-colors'
								>
									<span>{dict.ecosystem.webApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<a
									href='https://apps.apple.com/app/be-your-stories/id6748356526'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors'
								>
									<span>{dict.ecosystem.iosApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<a
									href='https://play.google.com/store/apps/details?id=com.celio1878.beyourstories'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors'
								>
									<span>{dict.ecosystem.androidApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<Link
									to='/blog/building-be-your-stories'
									className='text-xs font-mono text-emerald-500 hover:underline inline-flex items-center gap-1 ml-auto'
								>
									<span>Deep-Dive</span>
								</Link>
							</div>
						</CardContent>
					</Card>
				</Reveal>

				{/* Child Venture 2: Pack */}
				<Reveal delay={160}>
					<Card className='card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md'>
						<CardHeader className='pb-3 flex-1'>
							<div className='flex items-center justify-between gap-2 mb-2'>
								<Badge
									variant='outline'
									className='bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-xs font-mono'
								>
									Logistics & Automation
								</Badge>
								<span className='text-[11px] font-mono text-muted-foreground'>Mobile • Cloud</span>
							</div>
							<CardTitle className='text-xl font-bold flex items-center gap-2'>
								<PackageCheck size={18} className='text-amber-500' />
								<span>{dict.ecosystem.packTitle}</span>
							</CardTitle>
							<p className='text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5'>
								{dict.ecosystem.packTagline}
							</p>
							<CardDescription className='text-xs sm:text-sm mt-2 text-slate-600 dark:text-slate-300 leading-relaxed'>
								{dict.ecosystem.packDescription}
							</CardDescription>
						</CardHeader>
						<CardContent className='pt-0'>
							<div className='flex flex-wrap gap-1.5 mb-5 font-mono'>
								{[
									'Gemini OCR',
									'Expo Mobile',
									'Python 3.12',
									'DynamoDB',
									'EventBridge',
									'Terraform',
								].map((tag) => (
									<Badge
										key={tag}
										variant='outline'
										className='text-[11px] bg-slate-100/50 dark:bg-[#161e2b]/50'
									>
										{tag}
									</Badge>
								))}
							</div>
							<div className='pt-2 border-t border-slate-100 dark:border-[#212836] flex items-center justify-between text-xs font-mono text-muted-foreground'>
								<span>Domain: Condominium Mailroom Control</span>
								<span className='text-emerald-500'>Live Active Project</span>
							</div>
						</CardContent>
					</Card>
				</Reveal>

				{/* Child Venture 3: TATU Design (T3O2) */}
				<Reveal delay={200}>
					<Card className='card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md'>
						<CardHeader className='pb-3 flex-1'>
							<div className='flex items-center justify-between gap-2 mb-2'>
								<Badge
									variant='outline'
									className='bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 text-xs font-mono'
								>
									Applied AI & AR
								</Badge>
								<span className='text-[11px] font-mono text-muted-foreground'>
									Mobile • AI Studio
								</span>
							</div>
							<CardTitle className='text-xl font-bold flex items-center gap-2'>
								<Paintbrush size={18} className='text-purple-500' />
								<span>{dict.ecosystem.tatuTitle}</span>
							</CardTitle>
							<p className='text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5'>
								{dict.ecosystem.tatuTagline}
							</p>
							<CardDescription className='text-xs sm:text-sm mt-2 text-slate-600 dark:text-slate-300 leading-relaxed'>
								{dict.ecosystem.tatuDescription}
							</CardDescription>
						</CardHeader>
						<CardContent className='pt-0'>
							<div className='flex flex-wrap gap-1.5 mb-5 font-mono'>
								{['Firebase AI', 'Gemini API', 'AR Skin Preview', 'Expo Router', 'Cloud Storage'].map(
									(tag) => (
										<Badge
											key={tag}
											variant='outline'
											className='text-[11px] bg-slate-100/50 dark:bg-[#161e2b]/50'
										>
											{tag}
										</Badge>
									)
								)}
							</div>
							<div className='pt-2 border-t border-slate-100 dark:border-[#212836] flex items-center justify-between text-xs font-mono text-muted-foreground'>
								<span>Domain: Tattoo Stencil AI & AR Studio</span>
								<span className='text-emerald-500'>Live Active Project</span>
							</div>
						</CardContent>
					</Card>
				</Reveal>

				{/* Child Venture 4: PostHub */}
				<Reveal delay={240}>
					<Card className='card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md'>
						<CardHeader className='pb-3 flex-1'>
							<div className='flex items-center justify-between gap-2 mb-2'>
								<Badge
									variant='outline'
									className='bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs font-mono'
								>
									Autonomous Distribution
								</Badge>
								<span className='text-[11px] font-mono text-muted-foreground'>AWS Microservices</span>
							</div>
							<CardTitle className='text-xl font-bold flex items-center gap-2'>
								<Share2 size={18} className='text-emerald-500' />
								<span>{dict.ecosystem.postsTitle}</span>
							</CardTitle>
							<p className='text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5'>
								{dict.ecosystem.postsTagline}
							</p>
							<CardDescription className='text-xs sm:text-sm mt-2 text-slate-600 dark:text-slate-300 leading-relaxed'>
								{dict.ecosystem.postsDescription}
							</CardDescription>
						</CardHeader>
						<CardContent className='pt-0'>
							<div className='flex flex-wrap gap-1.5 mb-5 font-mono'>
								{[
									'AWS Step Functions',
									'EventBridge',
									'Python Lambdas',
									'Substack API',
									'LinkedIn / X',
								].map((tag) => (
									<Badge
										key={tag}
										variant='outline'
										className='text-[11px] bg-slate-100/50 dark:bg-[#161e2b]/50'
									>
										{tag}
									</Badge>
								))}
							</div>
							<div className='pt-2 border-t border-slate-100 dark:border-[#212836] flex items-center justify-between text-xs font-mono text-muted-foreground'>
								<span>Domain: Multi-Channel Autonomous Syndication</span>
								<span className='text-emerald-500'>Live Active Project</span>
							</div>
						</CardContent>
					</Card>
				</Reveal>
			</div>

			{/* Developer Tooling Grid */}
			<div className='grid md:grid-cols-2 gap-6'>
				<Reveal delay={280}>
					<Card className='card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md'>
						<CardHeader className='pb-3 flex-1'>
							<div className='flex items-center justify-between gap-2 mb-2'>
								<Badge
									variant='outline'
									className='bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 text-xs font-mono'
								>
									Open-Source Tool
								</Badge>
								<span className='text-xs font-mono text-muted-foreground'>npm package</span>
							</div>
							<CardTitle className='text-lg font-bold flex items-center gap-2'>
								<Terminal size={17} className='text-emerald-500' />
								<span>{dict.ecosystem.appBuilderTitle}</span>
							</CardTitle>
							<p className='text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5'>
								{dict.ecosystem.appBuilderTagline}
							</p>
							<CardDescription className='text-xs mt-2 text-slate-600 dark:text-slate-300 leading-relaxed'>
								{dict.ecosystem.appBuilderDescription}
							</CardDescription>
						</CardHeader>
						<CardContent className='pt-0'>
							<div className='flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-[#212836]'>
								<a
									href='https://www.npmjs.com/package/@celio1878/express-app-builder'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 text-xs font-mono font-bold text-primary hover:underline'
								>
									<span>{dict.ecosystem.viewNpm}</span>
									<ExternalLink size={12} aria-hidden='true' />
								</a>
								<a
									href='https://github.com/Celio1878/express-app-builder'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-primary transition-colors'
								>
									<span>{dict.ecosystem.viewRepo}</span>
									<SquareArrowOutUpRight size={11} aria-hidden='true' />
								</a>
							</div>
						</CardContent>
					</Card>
				</Reveal>

				<Reveal delay={320}>
					<Card className='card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md'>
						<CardHeader className='pb-3 flex-1'>
							<div className='flex items-center justify-between gap-2 mb-2'>
								<Badge
									variant='outline'
									className='bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 text-xs font-mono'
								>
									Cloud Infrastructure
								</Badge>
								<span className='text-xs font-mono text-muted-foreground'>npm package</span>
							</div>
							<CardTitle className='text-lg font-bold flex items-center gap-2'>
								<Cloud size={17} className='text-emerald-500' />
								<span>{dict.ecosystem.cdkFactoryTitle}</span>
							</CardTitle>
							<p className='text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5'>
								{dict.ecosystem.cdkFactoryTagline}
							</p>
							<CardDescription className='text-xs mt-2 text-slate-600 dark:text-slate-300 leading-relaxed'>
								{dict.ecosystem.cdkFactoryDescription}
							</CardDescription>
						</CardHeader>
						<CardContent className='pt-0'>
							<div className='flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-[#212836]'>
								<a
									href='https://www.npmjs.com/package/@celio1878/cdk-factory'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 text-xs font-mono font-bold text-primary hover:underline'
								>
									<span>{dict.ecosystem.viewNpm}</span>
									<ExternalLink size={12} aria-hidden='true' />
								</a>
								<a
									href='https://github.com/Celio1878/cdk-factory'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-primary transition-colors'
								>
									<span>{dict.ecosystem.viewRepo}</span>
									<SquareArrowOutUpRight size={11} aria-hidden='true' />
								</a>
							</div>
						</CardContent>
					</Card>
				</Reveal>
			</div>
		</section>
	);
}
