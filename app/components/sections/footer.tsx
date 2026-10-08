import { Mail, Newspaper } from 'lucide-react';
import { Link } from 'react-router';
import { useI18n } from '~/i18n';
import { currentYear } from '~/utils/dates';

export function Footer() {
	const { dict } = useI18n();
	const copyright = `© ${currentYear} Célio Vieira. All rights reserved.`;

	return (
		<footer className='relative mt-20 overflow-hidden border-t border-slate-200/80 dark:border-[#212836] bg-gradient-to-b from-transparent via-emerald-500/5 to-emerald-500/10 dark:via-emerald-500/5 dark:to-emerald-500/15'>
			{/* Decorative top border glow */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent'
			/>

			<div className='container mx-auto px-4 sm:px-6 py-12 max-w-6xl'>
				<div className='flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/60 dark:border-[#212836]/60'>
					{/* Brand info with me.jpeg */}
					<div className='text-center md:text-left flex items-center gap-3'>
						<img
							src='/me.jpeg'
							alt='Célio Vieira'
							className='w-10 h-10 rounded-full object-cover border border-emerald-500/40 shadow-sm'
						/>
						<div>
							<Link
								to='/'
								className='font-extrabold text-base tracking-tight text-slate-900 dark:text-white hover:text-primary transition-colors'
							>
								Célio Vieira
							</Link>
							<p className='text-xs font-mono text-muted-foreground'>{dict.hero.role}</p>
						</div>
					</div>

					{/* Quick Route Links */}
					<div className='flex flex-wrap items-center justify-center gap-6 font-mono text-xs font-semibold text-slate-600 dark:text-slate-300'>
						<Link to='/' className='hover:text-primary transition-colors'>
							{dict.nav.home}
						</Link>
						<a href='/#ecosystem' className='hover:text-primary transition-colors'>
							{dict.nav.ecosystem}
						</a>
						<a href='/#capabilities' className='hover:text-primary transition-colors'>
							{dict.nav.capabilities}
						</a>
						<Link to='/blog' className='hover:text-primary transition-colors'>
							{dict.nav.blog}
						</Link>
						<Link to='/about' className='hover:text-primary transition-colors'>
							{dict.nav.about}
						</Link>
					</div>

					{/* Socials: Email, X, Substack, LinkedIn, GitHub, YouTube */}
					<div className='flex items-center gap-2'>
						<a
							href='mailto:contact@celiovieira.com'
							aria-label='Email'
							className='w-8 h-8 rounded-lg border border-slate-200 dark:border-[#212836] bg-white/60 dark:bg-[#111620]/60 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500/60 transition-colors'
						>
							<Mail size={14} />
						</a>

						<a
							href='https://x.com/celio1878'
							target='_blank'
							rel='noreferrer'
							aria-label='X (Twitter)'
							className='w-8 h-8 rounded-lg border border-slate-200 dark:border-[#212836] bg-white/60 dark:bg-[#111620]/60 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500/60 transition-colors'
						>
							<svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor'>
								<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
							</svg>
						</a>

						<a
							href='https://substack.com/@celio1878'
							target='_blank'
							rel='noreferrer'
							aria-label='Substack'
							className='w-8 h-8 rounded-lg border border-slate-200 dark:border-[#212836] bg-white/60 dark:bg-[#111620]/60 flex items-center justify-center text-amber-500 hover:text-amber-400 hover:border-amber-500/60 transition-colors'
						>
							<Newspaper size={14} />
						</a>

						<a
							href='https://www.linkedin.com/in/celio-vieira'
							target='_blank'
							rel='noreferrer'
							aria-label='LinkedIn'
							className='w-8 h-8 rounded-lg border border-slate-200 dark:border-[#212836] bg-white/60 dark:bg-[#111620]/60 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-sky-500 hover:border-sky-500/60 transition-colors'
						>
							<svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor'>
								<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
							</svg>
						</a>

						<a
							href='https://github.com/Celio1878'
							target='_blank'
							rel='noreferrer'
							aria-label='GitHub'
							className='w-8 h-8 rounded-lg border border-slate-200 dark:border-[#212836] bg-white/60 dark:bg-[#111620]/60 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500/60 transition-colors'
						>
							<svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor'>
								<path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
							</svg>
						</a>

						<a
							href='https://www.youtube.com/@celio_vieira'
							target='_blank'
							rel='noreferrer'
							aria-label='YouTube'
							className='w-8 h-8 rounded-lg border border-slate-200 dark:border-[#212836] bg-white/60 dark:bg-[#111620]/60 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-red-500 hover:border-red-500/60 transition-colors'
						>
							<svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor'>
								<path d='M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' />
							</svg>
						</a>
					</div>
				</div>

				<div className='pt-6 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-muted-foreground gap-2'>
					<p>{copyright}</p>
				</div>
			</div>
		</footer>
	);
}
