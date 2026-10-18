import {
	ArrowLeft,
	ArrowRight,
	BookOpen,
	Calendar,
	Check,
	Clock,
	Compass,
	Copy,
	FileText,
	Share2,
	Sparkles,
	SquareArrowOutUpRight,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { MarkdownRenderer } from '~/components/markdown-renderer';
import { Nav } from '~/components/nav';
import { Reveal } from '~/components/reveal';
import { Footer } from '~/components/sections/footer';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useI18n } from '~/i18n';
import { getAllPosts, getPostBySlug } from '~/lib/blog';
import type { Route } from './+types/blog-post';

export function meta({ params }: Route.MetaArgs) {
	const post = params.slug ? getPostBySlug(params.slug) : undefined;
	if (!post) {
		return [{ title: 'Article Not Found — Célio Vieira' }];
	}

	return [
		{ title: `${post.title} — Célio Vieira` },
		{ name: 'description', content: post.description },
		{ property: 'og:title', content: post.title },
		{ property: 'og:description', content: post.description },
		{ property: 'og:type', content: 'article' },
		{ property: 'article:published_time', content: post.date },
		{ property: 'article:author', content: post.author },
		{ property: 'og:url', content: `https://celiovieira.com/blog/${post.slug}` },
		{
			property: 'og:image',
			content: post.coverImage
				? `https://celiovieira.com${post.coverImage}`
				: 'https://celiovieira.com/me.jpeg',
		},
		{
			tagName: 'link',
			rel: 'canonical',
			href: post.canonicalUrl || `https://celiovieira.com/blog/${post.slug}`,
		},
	];
}

export default function BlogPostRoute() {
	const params = useParams();
	const slug = params.slug || '';
	const { dict } = useI18n();

	const post = useMemo(() => getPostBySlug(slug), [slug]);
	const allPosts = useMemo(() => getAllPosts(), []);

	// Related posts scored by overlapping tags
	const relatedPosts = useMemo(() => {
		const otherPosts = allPosts.filter((p) => p.slug !== slug);
		const currentTags = new Set(post?.tags || []);
		return otherPosts
			.map((p) => ({
				post: p,
				sharedCount: p.tags.filter((t) => currentTags.has(t)).length,
			}))
			.sort((a, b) => b.sharedCount - a.sharedCount)
			.slice(0, 2)
			.map((item) => item.post);
	}, [allPosts, post, slug]);

	const [copied, setCopied] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);

	// Reading progress tracking
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const handleScroll = () => {
			const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
			if (totalHeight <= 0) {
				setScrollProgress(0);
				return;
			}
			const current = (window.scrollY / totalHeight) * 100;
			setScrollProgress(Math.min(100, Math.max(0, current)));
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleCopyLink = () => {
		if (typeof window !== 'undefined') {
			navigator.clipboard.writeText(window.location.href).then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			});
		}
	};

	const shareUrl =
		typeof window !== 'undefined' ? window.location.href : `https://celiovieira.com/blog/${slug}`;
	const shareTitle = post?.title || '';

	if (!post) {
		return (
			<div className='min-h-screen flex flex-col pt-20'>
				<Nav />
				<main className='flex-1 container mx-auto px-4 max-w-4xl py-24 text-center'>
					<h1 className='text-3xl font-bold mb-4'>Article Not Found</h1>
					<p className='text-gray-600 dark:text-gray-400 mb-8'>
						The article you are looking for does not exist or has been moved.
					</p>
					<Link
						to='/blog'
						className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-medium hover:opacity-90 transition-opacity'
					>
						<ArrowLeft size={16} />
						{dict.blog.backToBlog}
					</Link>
				</main>
				<Footer />
			</div>
		);
	}

	return (
		<div className='min-h-screen flex flex-col pt-20'>
			<Nav />

			{/* Top Scroll Reading Progress Bar */}
			<div
				className='fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50 pointer-events-none'
				role='progressbar'
				aria-valuenow={Math.round(scrollProgress)}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label={dict.blog.readingProgress}
			>
				<div
					className='h-full bg-primary transition-all duration-75 ease-out shadow-xs shadow-primary/50'
					style={{ width: `${scrollProgress}%` }}
				/>
			</div>

			<main className='flex-1 container mx-auto px-4 sm:px-6 max-w-4xl py-10' id='main' role='main'>
				{/* Breadcrumb & Back */}
				<Reveal>
					<div className='flex items-center justify-between gap-4 mb-8'>
						<Link
							to='/blog'
							className='inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors'
						>
							<ArrowLeft size={16} aria-hidden='true' />
							<span>{dict.blog.backToBlog}</span>
						</Link>

						{/* Share Buttons */}
						<div className='flex items-center gap-2'>
							<button
								type='button'
								onClick={handleCopyLink}
								className='inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-slate-900/70 hover:border-primary/50 transition-colors'
								title={dict.blog.copyLink}
							>
								{copied ? (
									<>
										<Check size={13} className='text-emerald-500' />
										<span className='text-emerald-500'>{dict.ui.copied}</span>
									</>
								) : (
									<>
										<Copy size={13} />
										<span>{dict.blog.copyLink}</span>
									</>
								)}
							</button>

							<a
								href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
									shareTitle
								)}&url=${encodeURIComponent(shareUrl)}`}
								target='_blank'
								rel='noreferrer'
								className='inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-slate-900/70 hover:text-primary hover:border-primary/50 transition-colors'
								title={dict.blog.shareOnX}
							>
								<Share2 size={13} />
								<span>Share</span>
							</a>
						</div>
					</div>
				</Reveal>

				{/* Article Header */}
				<Reveal delay={60}>
					<header className='mb-10 pb-8 border-b border-gray-200/80 dark:border-gray-800/80'>
						<div className='flex flex-wrap items-center gap-2 mb-4'>
							{post.source === 'native' ? (
								<Badge className='text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/25 flex items-center gap-1 font-mono font-bold'>
									<Sparkles size={11} aria-hidden='true' />
									<span>Engineering Blueprint</span>
								</Badge>
							) : (
								<Badge className='text-xs bg-amber-500/10 text-amber-500 border-amber-500/25 flex items-center gap-1 font-mono font-bold'>
									<FileText size={11} aria-hidden='true' />
									<span>Substack Dispatch</span>
								</Badge>
							)}

							{post.tags.map((tag) => (
								<Badge
									key={tag}
									variant='outline'
									className='text-xs bg-primary/5 text-primary border-primary/20'
								>
									{tag}
								</Badge>
							))}
						</div>

						<h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white leading-tight text-balance'>
							{post.title}
						</h1>

						<p className='text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-pretty'>
							{post.description}
						</p>

						<div className='flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-mono'>
							<span className='flex items-center gap-1.5'>
								<BookOpen size={15} className='text-primary' />
								<span className='font-medium text-gray-700 dark:text-gray-300'>{post.author}</span>
							</span>
							<span>•</span>
							<span className='flex items-center gap-1.5'>
								<Calendar size={15} />
								<time dateTime={post.date}>{post.date}</time>
							</span>
							<span>•</span>
							<span className='text-gray-400 dark:text-gray-500'>
								{post.wordCount.toLocaleString()} {dict.blog.words}
							</span>
							<span>•</span>
							<span className='flex items-center gap-1.5 text-primary font-medium'>
								<Clock size={15} />
								<span>{post.readTime}</span>
							</span>
						</div>

						{post.canonicalUrl && (
							<div className='mt-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
								<div className='flex items-center gap-2.5'>
									<svg
										className='w-4 h-4 text-amber-500 fill-current shrink-0'
										viewBox='0 0 24 24'
										aria-hidden='true'
									>
										<path d='M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z' />
									</svg>
									<span className='text-xs font-mono font-semibold text-amber-600 dark:text-amber-400'>
										Originally published on Substack Publication
									</span>
								</div>
								<a
									href={post.canonicalUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors shrink-0'
								>
									<span>Read on Substack</span>
									<SquareArrowOutUpRight size={12} aria-hidden='true' />
								</a>
							</div>
						)}
					</header>
				</Reveal>

				{/* Interactive Table of Contents */}
				{post.headings.length > 1 && (
					<Reveal delay={80}>
						<div className='mb-10 p-5 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xs'>
							<div className='flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider font-bold text-muted-foreground'>
								<Compass size={14} className='text-primary' aria-hidden='true' />
								<span>{dict.blog.tableOfContents}</span>
							</div>
							<nav aria-label={dict.blog.tableOfContents}>
								<ul className='space-y-1.5 text-xs sm:text-sm font-medium'>
									{post.headings.map((h) => (
										<li key={h.id} className={h.level === 3 ? 'pl-4' : 'pl-0'}>
											<a
												href={`#${h.id}`}
												className='text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex items-center gap-1.5 py-0.5 group'
											>
												<span className='text-gray-400 dark:text-gray-600 group-hover:text-primary font-mono text-[10px]'>
													{h.level === 3 ? '↳' : '§'}
												</span>
												<span className='group-hover:underline text-pretty'>{h.text}</span>
											</a>
										</li>
									))}
								</ul>
							</nav>
						</div>
					</Reveal>
				)}

				{/* Cover Image */}
				{post.coverImage && (
					<Reveal delay={100}>
						<div className='mb-10 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md'>
							<img src={post.coverImage} alt={post.title} className='w-full max-h-96 object-cover' />
						</div>
					</Reveal>
				)}

				{/* Article Content */}
				<Reveal delay={120}>
					<article className='prose prose-slate dark:prose-invert max-w-none'>
						<MarkdownRenderer content={post.content} />
					</article>
				</Reveal>

				{/* Author Bio Box */}
				<Reveal delay={140}>
					<div className='mt-14 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md flex flex-col sm:flex-row items-center gap-5'>
						<img
							src='/me.jpeg'
							alt='Célio Vieira'
							className='w-16 h-16 rounded-full object-cover border-2 border-primary/50 shadow-sm shrink-0'
						/>
						<div className='text-center sm:text-left flex-1'>
							<div className='flex flex-wrap items-center justify-center sm:justify-start gap-2'>
								<h3 className='text-base font-bold text-gray-900 dark:text-white'>Célio Vieira</h3>
								<span className='text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium font-mono'>
									Founder & Architect
								</span>
							</div>
							<p className='text-sm text-gray-600 dark:text-gray-300 mt-1.5 leading-relaxed text-pretty'>
								Engineering applied AI systems, distributed cloud platforms, and the Aldeon umbrella
								venture ecosystem.
							</p>
						</div>
						<div className='flex items-center gap-2 shrink-0'>
							<a
								href='https://substack.com/@celio1878'
								target='_blank'
								rel='noreferrer'
								className='px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition-colors shadow-xs'
							>
								Substack
							</a>
							<Link
								to='/about'
								className='px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-semibold hover:border-primary hover:text-primary transition-colors'
							>
								About
							</Link>
						</div>
					</div>
				</Reveal>

				{/* Related Articles */}
				{relatedPosts.length > 0 && (
					<section className='mt-16 pt-10 border-t border-gray-200/80 dark:border-gray-800/80'>
						<div className='flex items-center justify-between gap-4 mb-6'>
							<h2 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
								Related Technical Dispatches
							</h2>
							<Link
								to='/blog'
								className='text-xs font-semibold text-primary hover:underline flex items-center gap-1'
							>
								<span>View all {allPosts.length}</span>
								<ArrowRight size={12} aria-hidden='true' />
							</Link>
						</div>
						<div className='grid gap-4 sm:grid-cols-2'>
							{relatedPosts.map((related) => (
								<Link
									key={related.slug}
									to={`/blog/${related.slug}`}
									className='group block focus:outline-none focus:ring-2 focus:ring-primary rounded-xl'
								>
									<Card className='card-hover h-full flex flex-col border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md group-hover:border-primary/40 transition-all p-5'>
										<CardHeader className='p-0 pb-2 space-y-1.5'>
											<div className='flex items-center justify-between text-xs text-muted-foreground font-mono'>
												<span className='text-[10px]'>{related.date}</span>
												<span className='text-primary font-medium text-[10px]'>
													{related.readTime}
												</span>
											</div>
											<CardTitle className='text-base font-bold group-hover:text-primary transition-colors leading-snug line-clamp-2 text-balance'>
												{related.title}
											</CardTitle>
											<CardDescription className='text-xs line-clamp-2 text-gray-600 dark:text-gray-300 text-pretty'>
												{related.description}
											</CardDescription>
										</CardHeader>
										<CardContent className='p-0 pt-2 mt-auto flex items-center justify-between text-xs font-semibold text-primary'>
											<div className='flex gap-1'>
												{related.tags.slice(0, 2).map((t) => (
													<Badge key={t} variant='outline' className='text-[10px] py-0 px-1.5'>
														{t}
													</Badge>
												))}
											</div>
											<span className='flex items-center gap-1 group-hover:translate-x-1 transition-transform'>
												Read <ArrowRight size={11} aria-hidden='true' />
											</span>
										</CardContent>
									</Card>
								</Link>
							))}
						</div>
					</section>
				)}
			</main>

			<Footer />
		</div>
	);
}
