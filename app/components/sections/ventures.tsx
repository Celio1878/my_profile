import {
	ArrowRight,
	BookOpen,
	Cloud,
	ExternalLink,
	Layers,
	PackageCheck,
	Paintbrush,
	Share2,
	Sparkles,
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
				<div className='mb-12 rounded-2xl border border-emerald-500/30 bg-linear-to-b from-white/95 to-slate-50/80 dark:from-[#0d131d]/95 dark:to-[#090d14]/80 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-emerald-500/5 relative overflow-hidden'>
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

						<div className='flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto'>
							<a
								href='https://aldeon.app'
								target='_blank'
								rel='noreferrer'
								className='inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all hover:scale-105 shadow-sm'
							>
								<span>{dict.ecosystem.visitAldeon}</span>
								<SquareArrowOutUpRight size={13} aria-hidden='true' />
							</a>
							<Link
								to='/blog/aldeon-unified-edge-ssr-multi-cloud-ecosystem'
								className='inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold border border-slate-200 dark:border-[#212836] bg-white/70 dark:bg-[#161e2b]/70 text-slate-800 dark:text-slate-200 hover:border-emerald-500 transition-all'
							>
								<span>{dict.ecosystem.architectureDeepDive}</span>
								<ArrowRight size={13} aria-hidden='true' />
							</Link>
						</div>
					</div>

					<p className='text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-5 max-w-3xl'>
						{dict.ecosystem.aldeonDescription}
					</p>

					<div className='flex flex-wrap gap-2 mt-5 font-mono text-xs'>
						{[
							'5 Active Products',
							'Vercel Edge SSR (gru1)',
							'Zero-Backend Isolation',
							'AWS • GCP • Supabase',
							'Terraform IaC',
							'RevenueCat & Stripe',
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
								{['React Native Expo', 'Offline-First', 'Supabase', 'Meilisearch (<15ms)', 'AWS Polly Audio'].map(
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
									href='https://aldeon.app/bys'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-primary text-white hover:bg-emerald-600 transition-colors'
								>
									<span>{dict.ecosystem.webApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<a
									href='https://apps.apple.com/app/be-your-stories/id6812739940'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors'
								>
									<span>{dict.ecosystem.iosApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<a
									href='https://play.google.com/apps/testing/com.aldeon.bys'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors'
								>
									<span>{dict.ecosystem.androidBetaApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<Link
									to='/blog/building-be-your-stories'
									className='text-xs font-mono text-emerald-500 hover:underline inline-flex items-center gap-1 ml-auto'
								>
									<span>{dict.ecosystem.deepDive}</span>
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
									Logistics & PropTech
								</Badge>
								<span className='text-[11px] font-mono text-emerald-500 font-bold'>
									Android Beta • Web • Cloud
								</span>
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
									'Gemini 2.5 OCR (<1.2s)',
									'Legend-State v3',
									'Expo SDK 57',
									'DynamoDB + Firestore',
									'EventBridge 48h',
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
							<div className='flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#212836]'>
								<a
									href='https://aldeon.app/pack'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-600 text-white hover:bg-amber-500 transition-colors'
								>
									<span>{dict.ecosystem.webApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<a
									href='https://play.google.com/apps/testing/com.aldeon.pack'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-amber-500 transition-colors'
								>
									<span>{dict.ecosystem.androidBetaApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<Link
									to='/blog/architecting-pack-multimodal-ocr-logistics'
									className='text-xs font-mono text-amber-500 hover:underline inline-flex items-center gap-1 ml-auto'
								>
									<span>{dict.ecosystem.deepDive}</span>
								</Link>
							</div>
						</CardContent>
					</Card>
				</Reveal>

				{/* Child Venture 3: TATU Design */}
				<Reveal delay={200}>
					<Card className='card-hover h-full flex flex-col border border-slate-200/90 dark:border-[#212836] bg-white/70 dark:bg-[#0f141c]/70 backdrop-blur-md'>
						<CardHeader className='pb-3 flex-1'>
							<div className='flex items-center justify-between gap-2 mb-2'>
								<Badge
									variant='outline'
									className='bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 text-xs font-mono'
								>
									Creative AI & AR Studio
								</Badge>
								<span className='text-[11px] font-mono text-emerald-500 font-bold'>
									iOS • Android Beta • Web
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
								{['60 FPS AR Skin-Lock', 'Sobel/Bayer Stencils', 'Firebase AI', 'Expo SDK 57', '4K Thermal Export'].map(
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
									href='https://aldeon.app/tatu'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-purple-600 text-white hover:bg-purple-500 transition-colors'
								>
									<span>{dict.ecosystem.webApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<a
									href='https://apps.apple.com/app/tatu-design/id6812737660'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-purple-500 transition-colors'
								>
									<span>{dict.ecosystem.iosApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<a
									href='https://play.google.com/apps/testing/com.aldeon.tatu'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-purple-500 transition-colors'
								>
									<span>{dict.ecosystem.androidBetaApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<Link
									to='/blog/building-tatu-design-ai-stencil-ar-studio'
									className='text-xs font-mono text-purple-500 hover:underline inline-flex items-center gap-1 ml-auto'
								>
									<span>{dict.ecosystem.deepDive}</span>
								</Link>
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
									Marketing Automation & AI
								</Badge>
								<span className='text-[11px] font-mono text-emerald-500 font-bold'>
									Android Beta • Web • Cloud
								</span>
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
									'5 Social Networks',
									'1-Click Approval',
									'DynamoDB WebSockets',
									'Gemini Imagen',
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
							<div className='flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#212836]'>
								<a
									href='https://aldeon.app/postshub'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-primary text-white hover:bg-emerald-600 transition-colors'
								>
									<span>{dict.ecosystem.webApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<a
									href='https://play.google.com/apps/testing/com.aldeon.posthub'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-[#212836] text-slate-700 dark:text-slate-300 hover:border-emerald-500 transition-colors'
								>
									<span>{dict.ecosystem.androidBetaApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<Link
									to='/blog/autonomous-publishing-posthub-step-functions'
									className='text-xs font-mono text-emerald-500 hover:underline inline-flex items-center gap-1 ml-auto'
								>
									<span>{dict.ecosystem.deepDive}</span>
								</Link>
							</div>
						</CardContent>
					</Card>
				</Reveal>

				{/* Child Venture 5: HandSpeak (Featured Full-Width Card) */}
				<Reveal delay={260} className='md:col-span-2'>
					<Card className='card-hover h-full flex flex-col border border-cyan-500/30 bg-gradient-to-br from-white/80 via-slate-50/70 to-cyan-500/5 dark:from-[#0d1520]/80 dark:via-[#0a0f18]/70 dark:to-cyan-950/10 backdrop-blur-md relative overflow-hidden shadow-sm'>
						<CardHeader className='pb-3 flex-1'>
							<div className='flex items-center justify-between gap-2 mb-2'>
								<Badge
									variant='outline'
									className='bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 text-xs font-mono font-semibold'
								>
									Accessibility & 3D Vision AI
								</Badge>
								<span className='text-[11px] font-mono text-cyan-400 font-bold'>
									Web 3D Studio • GCP Cloud Run
								</span>
							</div>
							<CardTitle className='text-xl sm:text-2xl font-bold flex items-center gap-2'>
								<Sparkles size={20} className='text-cyan-400' />
								<span>{dict.ecosystem.handspeakTitle}</span>
							</CardTitle>
							<p className='text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5'>
								{dict.ecosystem.handspeakTagline}
							</p>
							<CardDescription className='text-xs sm:text-sm mt-2 text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl'>
								{dict.ecosystem.handspeakDescription}
							</CardDescription>
						</CardHeader>
						<CardContent className='pt-0'>
							<div className='flex flex-wrap gap-1.5 mb-5 font-mono'>
								{[
									'60 FPS 3D Hand Tracking',
									'Three.js WebGL Rig',
									'PeerJS WebRTC P2P',
									'Phonetic Levenshtein AI',
									'Multimodal Safety Guard',
									'GCP Cloud Run',
								].map((tag) => (
									<Badge
										key={tag}
										variant='outline'
										className='text-[11px] bg-cyan-500/5 border-cyan-500/20 text-cyan-700 dark:text-cyan-300'
									>
										{tag}
									</Badge>
								))}
							</div>
							<div className='flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#212836]'>
								<a
									href='https://aldeon.app/handspeak'
									target='_blank'
									rel='noreferrer'
									className='inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shadow-sm'
								>
									<span>{dict.ecosystem.webApp}</span>
									<SquareArrowOutUpRight size={11} />
								</a>
								<Link
									to='/blog/engineering-handspeak-3d-libras-ai'
									className='text-xs font-mono text-cyan-500 hover:underline inline-flex items-center gap-1 ml-auto font-semibold'
								>
									<span>{dict.ecosystem.deepDive}</span>
									<ArrowRight size={12} />
								</Link>
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
