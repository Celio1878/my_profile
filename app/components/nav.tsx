import { ArrowUpRight, X as CloseIcon, Menu as MenuIcon } from 'lucide-react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useI18n, type SupportedLocale } from '~/i18n';

export const Nav: FC = () => {
	const { dict, locale, setLocale } = useI18n();
	const location = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [progress, setProgress] = useState(0);

	const pathname = location.pathname;
	const isHome = pathname === '/';
	const isBlog = pathname.startsWith('/blog');
	const isAbout = pathname === '/about';

	// Scroll progress bar + scrolled shadow
	useEffect(() => {
		const onScroll = () => {
			const h = document.documentElement;
			const max = h.scrollHeight - h.clientHeight || 1;
			const p = Math.min(1, Math.max(0, h.scrollTop / max));
			setProgress(p);
			setScrolled(h.scrollTop > 8);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	// Close menus on route change or Escape
	useEffect(() => {
		queueMicrotask(() => {
			setMenuOpen(false);
		});
	}, [pathname]);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setMenuOpen(false);
			}
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, []);

	const toggleLanguage = () => {
		const nextLocale: SupportedLocale = locale === 'en' ? 'pt-BR' : 'en';
		setLocale(nextLocale);
	};

	const navLinkClass = (isActive: boolean) =>
		'relative px-2 py-1 transition-colors text-xs font-semibold tracking-wide ' +
		(isActive
			? 'text-primary font-bold'
			: 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary') +
		" after:content-[''] after:absolute after:left-2 after:right-2 after:-bottom-1 " +
		' after:h-[2px] after:rounded-full after:bg-primary ' +
		' after:transition-transform after:duration-200 ' +
		(isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100');

	return (
		<nav
			role='navigation'
			aria-label='Primary'
			className={
				'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' +
				'backdrop-blur-xl border-b ' +
				(scrolled
					? 'bg-white/85 dark:bg-[#090b10]/85 border-slate-200/90 dark:border-[#212836] shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
					: 'bg-white/50 dark:bg-[#090b10]/50 border-transparent')
			}
		>
			{/* Scroll progress bar */}
			<div
				aria-hidden='true'
				className='absolute left-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-[width] duration-150 ease-out'
				style={{ width: `${progress * 100}%` }}
			/>

			<div className='container mx-auto px-4 sm:px-6 py-3 max-w-6xl'>
				<div className='flex items-center justify-between'>
					{/* Desktop Nav Items */}
					<div className='hidden md:flex items-center gap-6'>
						<Link to='/' className={navLinkClass(isHome)}>
							{dict.nav.home}
						</Link>

						<a href={isHome ? '#ecosystem' : '/#ecosystem'} className={navLinkClass(false)}>
							{dict.nav.ecosystem}
						</a>

						<a href={isHome ? '#capabilities' : '/#capabilities'} className={navLinkClass(false)}>
							{dict.nav.capabilities}
						</a>

						<Link to='/blog' className={navLinkClass(isBlog)}>
							{dict.nav.blog}
						</Link>

						<Link to='/about' className={navLinkClass(isAbout)}>
							{dict.nav.about}
						</Link>
					</div>

					{/* Desktop Right Controls: Binary Language Switch & CTA */}
					<div className='hidden md:flex items-center gap-3'>
						{/* Binary Language Toggle: EN / PT */}
						<button
							type='button'
							onClick={toggleLanguage}
							className='flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-[#212836] bg-slate-100/60 dark:bg-[#111620] text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:border-emerald-500/50 transition-colors'
							title='Switch language between English and Portuguese'
							aria-label='Toggle language'
						>
							<span className={locale === 'en' ? 'text-emerald-500' : 'text-muted-foreground'}>
								EN
							</span>
							<span className='text-muted-foreground font-normal'>/</span>
							<span className={locale === 'pt-BR' ? 'text-emerald-500' : 'text-muted-foreground'}>
								PT
							</span>
						</button>

						{/* Let's Talk CTA button */}
						<a
							href={isHome ? '#contact' : '/about'}
							className='inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-emerald-600 transition-all hover:scale-105 shadow-sm shadow-emerald-500/20'
						>
							<span>{dict.nav.contact}</span>
							<ArrowUpRight size={13} aria-hidden='true' />
						</a>
					</div>

					{/* Mobile hamburger & controls */}
					<div className='flex md:hidden items-center gap-2'>
						{/* Binary language button for mobile */}
						<button
							type='button'
							onClick={toggleLanguage}
							className='px-2 py-1 rounded-lg border border-slate-200 dark:border-[#212836] bg-slate-100/60 dark:bg-[#111620] text-xs font-mono font-bold text-slate-700 dark:text-slate-300'
							aria-label='Toggle language'
						>
							<span className={locale === 'en' ? 'text-emerald-500' : 'text-muted-foreground'}>
								EN
							</span>
							<span className='text-muted-foreground font-normal'>/</span>
							<span className={locale === 'pt-BR' ? 'text-emerald-500' : 'text-muted-foreground'}>
								PT
							</span>
						</button>

						<button
							type='button'
							aria-label={menuOpen ? dict.ui.closeMenu : dict.ui.openMenu}
							aria-expanded={menuOpen}
							className='inline-flex items-center justify-center h-9 w-9 rounded-xl border border-slate-200 dark:border-[#212836] bg-white/80 dark:bg-[#111620] text-slate-700 dark:text-slate-300'
							onClick={() => setMenuOpen((v) => !v)}
						>
							{menuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
						</button>
					</div>
				</div>

				{/* Mobile menu drawer */}
				{menuOpen && (
					<div className='md:hidden mt-3 p-4 rounded-2xl border border-slate-200 dark:border-[#212836] bg-white/95 dark:bg-[#0c1017]/95 backdrop-blur-xl shadow-2xl animate-fade-in-up'>
						<div className='flex flex-col gap-2.5 text-sm font-semibold'>
							<Link
								to='/'
								onClick={() => setMenuOpen(false)}
								className={`px-3 py-2 rounded-xl transition-colors ${
									isHome
										? 'bg-primary/10 text-primary'
										: 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#161e2b]'
								}`}
							>
								{dict.nav.home}
							</Link>
							<a
								href={isHome ? '#ecosystem' : '/#ecosystem'}
								onClick={() => setMenuOpen(false)}
								className='px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#161e2b] transition-colors'
							>
								{dict.nav.ecosystem}
							</a>
							<a
								href={isHome ? '#capabilities' : '/#capabilities'}
								onClick={() => setMenuOpen(false)}
								className='px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#161e2b] transition-colors'
							>
								{dict.nav.capabilities}
							</a>
							<Link
								to='/blog'
								onClick={() => setMenuOpen(false)}
								className={`px-3 py-2 rounded-xl transition-colors ${
									isBlog
										? 'bg-primary/10 text-primary'
										: 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#161e2b]'
								}`}
							>
								{dict.nav.blog}
							</Link>
							<Link
								to='/about'
								onClick={() => setMenuOpen(false)}
								className={`px-3 py-2 rounded-xl transition-colors ${
									isAbout
										? 'bg-primary/10 text-primary'
										: 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#161e2b]'
								}`}
							>
								{dict.nav.about}
							</Link>
							<a
								href={isHome ? '#contact' : '/about'}
								onClick={() => setMenuOpen(false)}
								className='mt-2 w-full py-2.5 rounded-xl text-center text-xs font-bold bg-primary text-white shadow-sm'
							>
								{dict.nav.contact}
							</a>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};
