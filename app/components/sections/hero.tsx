import { ArrowRight, Brain, Cloud, Cpu, Layers, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { useI18n } from '~/i18n';
import { HighlightChip } from '../highlight-chip';

export function Hero() {
	const { dict } = useI18n();

	return (
		<header className='relative overflow-hidden pt-28 pb-16 container mx-auto px-4 max-w-5xl'>
			{/* Background terminal ambient glow */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 flex items-center justify-center -z-10'
			>
				<div className='w-[520px] h-[280px] rounded-full bg-emerald-500/10 blur-[110px] dark:bg-emerald-500/15' />
			</div>

			<div className='relative mx-auto text-center'>
				{/* Tagline */}
				<div className='animate-fade-in-up delay-200 mt-3 max-w-3xl mx-auto'>
					<p className='text-base sm:text-4xl font-semibold text-slate-800 dark:text-slate-200 leading-snug'>
						{dict.hero.tagline}
					</p>
				</div>

				{/* Bio */}
				<div className='animate-fade-in-up delay-300 mt-3 max-w-2xl mx-auto'>
					<p className='text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed'>
						{dict.hero.bio}
					</p>
				</div>

				{/* Technical highlight chips */}
				<div className='animate-fade-in-up delay-400 mt-6 flex flex-wrap items-center justify-center gap-2 font-mono text-xs'>
					<HighlightChip>
						<Brain size={12} className='text-emerald-500' aria-hidden='true' /> Applied AI & RAG
					</HighlightChip>
					<HighlightChip>
						<Cloud size={12} className='text-emerald-500' aria-hidden='true' /> Lakehouses & Spark
					</HighlightChip>
					<HighlightChip>
						<Cpu size={12} className='text-emerald-500' aria-hidden='true' /> System Architecture
					</HighlightChip>
					<HighlightChip>
						<Layers size={12} className='text-emerald-500' aria-hidden='true' /> FullStack Systems
					</HighlightChip>
				</div>

				{/* Commercial CTA buttons */}
				<div className='animate-fade-in-up delay-500 mt-8 flex flex-wrap items-center justify-center gap-3'>
					<a
						href='#ecosystem'
						className='inline-flex items-center gap-2 rounded-xl bg-primary text-white hover:bg-emerald-600 px-6 py-2.5 text-xs font-bold font-mono transition-all hover:scale-105 shadow-md shadow-emerald-500/20'
					>
						<span>{dict.hero.ctaEcosystem}</span>
						<ArrowRight size={14} aria-hidden='true' />
					</a>

					<Link
						to='/blog'
						className='inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-[#212836] bg-white/70 dark:bg-[#111620]/70 hover:border-emerald-500/50 text-slate-800 dark:text-slate-200 px-5 py-2.5 text-xs font-semibold font-mono transition-all hover:scale-105'
					>
						<span>{dict.hero.ctaBlog}</span>
					</Link>

					<a
						href='#contact'
						className='inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-[#212836] bg-white/50 dark:bg-[#111620]/50 hover:text-primary px-5 py-2.5 text-xs font-medium font-mono transition-all'
					>
						<Mail size={14} aria-hidden='true' />
						<span>{dict.hero.ctaContact}</span>
					</a>
				</div>
			</div>
		</header>
	);
}
