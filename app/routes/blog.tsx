import { ArrowRight, BookOpen, Calendar, Clock, Search, SquareArrowOutUpRight, Tag } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Nav } from '~/components/nav';
import { Reveal } from '~/components/reveal';
import { Footer } from '~/components/sections/footer';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useI18n } from '~/i18n';
import { getAllPosts, getAllTags, type BlogPost } from '~/lib/blog';
import type { Route } from './+types/blog';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Knowledge Hub & Discoveries — Célio Vieira' },
		{
			name: 'description',
			content:
				'Practical engineering blueprints, architectural decisions, and product experiments on AI, Cloud, Lakehouses, and Mobile Systems.',
		},
		{ property: 'og:title', content: 'Knowledge Hub & Discoveries — Célio Vieira' },
		{
			property: 'og:description',
			content:
				'Practical engineering blueprints, architectural decisions, and product experiments on AI, Cloud, Lakehouses, and Mobile Systems.',
		},
		{ property: 'og:type', content: 'website' },
		{ property: 'og:url', content: 'https://celiovieira.com/blog' },
		{ property: 'og:image', content: 'https://celiovieira.com/me.jpeg' },
	];
}

export default function BlogRoute() {
	const { dict } = useI18n();
	const allPosts = useMemo(() => getAllPosts(), []);
	const allTags = useMemo(() => getAllTags(), []);

	const [search, setSearch] = useState('');
	const [selectedTag, setSelectedTag] = useState<string | null>(null);

	const filteredPosts = useMemo(() => {
		return allPosts.filter((post) => {
			const matchesSearch =
				search.trim() === '' ||
				post.title.toLowerCase().includes(search.toLowerCase()) ||
				post.description.toLowerCase().includes(search.toLowerCase()) ||
				post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

			const matchesTag = !selectedTag || post.tags.includes(selectedTag);

			return matchesSearch && matchesTag;
		});
	}, [allPosts, search, selectedTag]);

	return (
		<div className='min-h-screen flex flex-col pt-20'>
			<Nav />

			<main className='flex-1 container mx-auto px-4 sm:px-6 max-w-6xl py-10' id='main' role='main'>
				{/* Header */}
				<Reveal>
					<div className='text-center max-w-3xl mx-auto mb-12'>
						<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4'>
							<BookOpen size={14} aria-hidden='true' />
							<span>{dict.nav.blog}</span>
						</div>
						<h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 gradient-text'>
							{dict.blog.title}
						</h1>
						<p className='text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8'>
							{dict.blog.subtitle}
						</p>

						{/* Substack Publication Banner */}
						<div className='p-5 sm:p-6 rounded-2xl border border-primary/25 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left shadow-lg'>
							<div className='space-y-1.5 flex-1'>
								<div className='flex items-center gap-2'>
									<svg
										className='w-4 h-4 text-primary fill-current'
										viewBox='0 0 24 24'
										aria-hidden='true'
									>
										<path d='M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z' />
									</svg>
									<span className='text-xs font-bold uppercase tracking-wider text-primary'>
										Substack Publication
									</span>
								</div>
								<h2 className='text-base sm:text-lg font-bold text-gray-900 dark:text-white'>
									{dict.blog.substackBanner}
								</h2>
								<p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
									{dict.blog.substackText}
								</p>
							</div>
							<a
								href='https://substack.com/@celio1878'
								target='_blank'
								rel='noreferrer'
								className='shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm group'
							>
								<span>{dict.blog.substackCta}</span>
								<ArrowRight
									size={14}
									className='group-hover:translate-x-0.5 transition-transform'
									aria-hidden='true'
								/>
							</a>
						</div>
					</div>
				</Reveal>

				{/* Filter & Search Bar */}
				<Reveal delay={100}>
					<div className='space-y-4 mb-10 max-w-3xl mx-auto'>
						{/* Search input */}
						<div className='relative'>
							<Search
								size={18}
								className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
								aria-hidden='true'
							/>
							<input
								type='text'
								placeholder={dict.blog.searchPlaceholder}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								aria-label={dict.blog.searchPlaceholder}
								className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all shadow-sm'
							/>
							{search && (
								<button
									type='button'
									onClick={() => setSearch('')}
									className='absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
								>
									Clear
								</button>
							)}
						</div>

						{/* Tag Pills */}
						<div className='flex flex-wrap items-center gap-2'>
							<button
								type='button'
								onClick={() => setSelectedTag(null)}
								className={`text-xs px-3 py-1.5 rounded-full transition-all font-medium border ${
									selectedTag === null
										? 'bg-primary text-white border-primary shadow-sm'
										: 'bg-white/50 dark:bg-slate-900/50 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/50'
								}`}
							>
								{dict.blog.filterAll}
							</button>
							{allTags.map((tag) => (
								<button
									type='button'
									key={tag}
									onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
									className={`text-xs px-3 py-1.5 rounded-full transition-all font-medium border flex items-center gap-1.5 ${
										selectedTag === tag
											? 'bg-primary text-white border-primary shadow-sm'
											: 'bg-white/50 dark:bg-slate-900/50 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/50'
									}`}
								>
									<Tag size={10} aria-hidden='true' />
									{tag}
								</button>
							))}
						</div>
					</div>
				</Reveal>

				{/* Posts Grid */}
				{filteredPosts.length === 0 ? (
					<Reveal>
						<div className='text-center py-16 px-4 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800'>
							<p className='text-gray-500 dark:text-gray-400 font-medium'>{dict.blog.noPostsFound}</p>
							<button
								type='button'
								onClick={() => {
									setSearch('');
									setSelectedTag(null);
								}}
								className='mt-4 text-sm font-semibold text-primary hover:underline'
							>
								Reset filters
							</button>
						</div>
					</Reveal>
				) : (
					<ul className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{filteredPosts.map((post: BlogPost, idx: number) => (
							<Reveal as='li' key={post.slug} delay={Math.min(idx * 40, 400)}>
								<Card className='card-hover h-full flex flex-col border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg relative group'>
									{post.coverImage && (
										<div className='relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-gray-100 dark:border-gray-800'>
											<img
												src={post.coverImage}
												alt={post.title}
												className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
												loading='lazy'
											/>
										</div>
									)}
									<CardHeader className='pb-3 flex-1'>
										<div className='flex items-center justify-between text-xs text-muted-foreground gap-2 mb-2.5'>
											<span className='flex items-center gap-1 font-mono'>
												<Calendar size={12} aria-hidden='true' />
												<time dateTime={post.date}>{post.date}</time>
											</span>
											<div className='flex items-center gap-2'>
												{post.canonicalUrl && (
													<span className='inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/25 px-1.5 py-0.5 rounded'>
														Substack
													</span>
												)}
												<span className='flex items-center gap-1 font-medium text-primary'>
													<Clock size={12} aria-hidden='true' />
													{post.readTime}
												</span>
											</div>
										</div>
										<Link to={`/blog/${post.slug}`} className='block focus:outline-none'>
											<CardTitle className='text-lg font-bold group-hover:text-primary transition-colors leading-snug'>
												{post.title}
											</CardTitle>
										</Link>
										<CardDescription className='text-sm line-clamp-3 mt-2 text-gray-600 dark:text-gray-300'>
											{post.description}
										</CardDescription>
									</CardHeader>
									<CardContent className='pt-0 mt-auto'>
										<div className='flex flex-wrap gap-1.5 mb-4'>
											{post.tags.slice(0, 3).map((tag) => (
												<Badge
													key={tag}
													variant='outline'
													className='text-[11px] font-normal py-0 px-2 bg-slate-100/50 dark:bg-slate-800/50'
												>
													{tag}
												</Badge>
											))}
										</div>
										<div className='flex items-center justify-between text-xs font-semibold pt-2.5 border-t border-gray-100/80 dark:border-gray-800/80'>
											<Link
												to={`/blog/${post.slug}`}
												className='flex items-center gap-1 text-primary group-hover:translate-x-1 transition-transform'
											>
												<span>{dict.latestInsights.readArticle}</span>
												<ArrowRight size={13} aria-hidden='true' />
											</Link>
											{post.canonicalUrl && (
												<a
													href={post.canonicalUrl}
													target='_blank'
													rel='noopener noreferrer'
													className='flex items-center gap-1 font-mono text-[11px] text-amber-500 hover:text-amber-400 transition-colors'
													title='Open original on Substack'
												>
													<span>Substack</span>
													<SquareArrowOutUpRight size={11} aria-hidden='true' />
												</a>
											)}
										</div>
									</CardContent>
								</Card>
							</Reveal>
						))}
					</ul>
				)}
			</main>

			<Footer />
		</div>
	);
}
