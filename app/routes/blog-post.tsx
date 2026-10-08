import {
	ArrowLeft,
	ArrowRight,
	BookOpen,
	Calendar,
	Check,
	Clock,
	Copy,
	Share2,
	SquareArrowOutUpRight,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { MarkdownRenderer } from '~/components/markdown-renderer';
import { Nav } from '~/components/nav';
import { Reveal } from '~/components/reveal';
import { Footer } from '~/components/sections/footer';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useI18n } from '~/i18n';
import { getAllPosts, getPostBySlug, type BlogPost } from '~/lib/blog';
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

	// Related posts (excluding current post)
	const relatedPosts = useMemo(() => {
		return allPosts.filter((p) => p.slug !== slug).slice(0, 2);
	}, [allPosts, slug]);

	const [copied, setCopied] = useState(false);

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

						<h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white leading-tight'>
							{post.title}
						</h1>

						<p className='text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>
							{post.description}
						</p>

						<div className='flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
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
								<span className='text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20'>
									Founder, AI & Data Engineer
								</span>
							</div>
							<p className='text-sm text-gray-600 dark:text-gray-400 mt-1.5'>
								Architecting intelligent AI systems, lakehouses, and commercial products under the
								Aldeon ecosystem.
							</p>
						</div>
						<div className='flex items-center gap-2 shrink-0'>
							<a
								href='https://substack.com/@celio1878'
								target='_blank'
								rel='noreferrer'
								className='px-3 py-2 rounded-xl text-xs font-semibold border border-amber-500/40 text-amber-500 hover:bg-amber-500/10 transition-colors'
							>
								Substack
							</a>
							<Link
								to='/about'
								className='px-3.5 py-2 rounded-xl text-xs font-semibold border border-primary/40 text-primary hover:bg-primary/10 transition-colors'
							>
								{dict.nav.about}
							</Link>
						</div>
					</div>
				</Reveal>

				{/* Related Posts */}
				{relatedPosts.length > 0 && (
					<Reveal delay={160}>
						<section className='mt-16 pt-10 border-t border-gray-200/80 dark:border-gray-800/80'>
							<h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>
								{dict.latestInsights.heading}
							</h2>
							<div className='grid gap-6 sm:grid-cols-2'>
								{relatedPosts.map((rel: BlogPost) => (
									<Link
										key={rel.slug}
										to={`/blog/${rel.slug}`}
										className='group block focus:outline-none focus:ring-2 focus:ring-primary rounded-xl'
									>
										<Card className='card-hover h-full flex flex-col border border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm group-hover:border-primary/40'>
											<CardHeader className='pb-2'>
												<div className='flex items-center justify-between text-xs text-muted-foreground gap-2 mb-2'>
													<span>{rel.date}</span>
													<span className='text-primary font-medium'>{rel.readTime}</span>
												</div>
												<CardTitle className='text-base font-bold group-hover:text-primary transition-colors'>
													{rel.title}
												</CardTitle>
												<CardDescription className='text-xs line-clamp-2 mt-1'>
													{rel.description}
												</CardDescription>
											</CardHeader>
											<CardContent className='pt-0 mt-auto flex items-center gap-1 text-xs font-semibold text-primary'>
												<span>{dict.latestInsights.readArticle}</span>
												<ArrowRight
													size={12}
													className='group-hover:translate-x-1 transition-transform'
												/>
											</CardContent>
										</Card>
									</Link>
								))}
							</div>
						</section>
					</Reveal>
				)}
			</main>

			<Footer />
		</div>
	);
}
